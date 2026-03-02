import { z } from 'zod';
import { db } from '@/db';
import { accounts, users, userStatus } from '@/db/schema';
import type { IncomingHttpHeaders } from 'node:http';
import { os } from '@orpc/server';

import { eq, or, and, desc, ne, sql } from 'drizzle-orm';
import { signIn, signOut } from '@/auth';

import * as schema from '@/db/schema';

import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// export const assistanceRouter = router({ getAll: publicProcedure.query(async () => { const records = await db.select().from(assistanceRecords); // Optionally validate with Zod before returning return records.map(r => assistanceRecordSchema.parse(r)); }),

// Auth
// export const authCreateUser = os
//   .$context<{ headers: IncomingHttpHeaders }>()
//   .input(createUserSchema)
//   .handler(async ({ input, context }) => {
//     const existing = await db
//       .select()
//       .from(users)
//       .where(eq(users.email, `${input.email}`));

//     if (existing.length > 0) {
//       return {
//         error: 'User email already Exist | delete it or Choose another email',
//         success: null,
//       };
//     } else {
//       // staffAccounts.map(async (entry) => {
//       const hash = await bcrypt.hash(`${input.password}`, 10);
//       await db.insert(users).values({
//         id: nanoid(),
//         firstname: `${input.firstName}`,
//         lastname: `${input.lastName}`,
//         email: `${input.email}`,
//         role: input.role,
//         password: `${hash}`,
//       });

//       return {
//         error: null,
//         success: `Account with email ${input.email} was added`,
//       };
//     }
//   });

export const authCheckemail = os
  .$context<{ headers: IncomingHttpHeaders }>()
  .input(z.object({ emailAddress: z.string() }))
  .handler(async ({ input, context }) => {
    // Perform delete
    const getdata = await db
      .select()
      .from(users)
      .where(eq(users.email, input.emailAddress));

    return getdata;
  });

export const authIsOnline = os.handler(async () => {
  const getdata = await db
    .select({
      userStatus, // all columns from userStatus
      user: users, // all columns from users, aliased as "user"
    })
    .from(userStatus)
    .innerJoin(users, eq(userStatus.userId, users.id)) // join condition
    .where(eq(userStatus.isOnline, true));

  return getdata;
});

// Reports

// export const createReport = os
//   .$context<{ headers: IncomingHttpHeaders }>()
//   .input(
//     assistanceRecordSchema.omit({
//       disabilityType: true,
//       race: true,
//       gender: true,
//       ageRange: true,
//       needsIdentified: true,
//       assistanceGiven: true,
//       valueRating: true,
//       userResponsible: true,
//       provinceOrState: true,
//     })
//   )
//   .handler(async ({ input, context }) => {
//     // your create code here
//     const cReport = await db
//       .insert(assistanceRecords)
//       .values({
//         institutionName: input.institutionName,
//         institutionType: input.institutionType,
//         contactPerson: input.contactPerson,
//         emailAddress: input.emailAddress,
//         phoneNumber: input.phoneNumber,
//         disability: input.disability,
//         beneficiaryName: input.beneficiaryName,
//         geoType: input.geoType,
//         dateAssisted: new Date(),
//       })
//       .returning();

//     return cReport;
//   });

export const loginOutput = os
  .$context<{ headers: IncomingHttpHeaders }>()
  .input(LoginSchema)
  .handler(async ({ input }) => {
    const { email, password } = input;

    console.log(input);

    // 1. Validate user
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .then(res => res[0]);

    if (!user) throw new Error('Invalid credentials');

    // 2. Check accounts
    const check = await db
      .select()
      .from(accounts)
      .where(eq(accounts.userId, user.id))
      .limit(1);

    if (check.length > 0) {
      await db
        .update(accounts)
        .set({ session_state: 'updatedcredentials' })
        .where(eq(accounts.userId, user.id));
    } else {
      await db.insert(accounts).values({
        userId: user.id,
        type: 'email',
        provider: 'credentials',
        providerAccountId: user.id,
        session_state: 'newcredentials',
      });
    }

    // sign us in
    const checkSignIn = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (checkSignIn) {
      // console.log('Sign in was successfull lets update the last login');

      const checkStatus = await db
        .select()
        .from(userStatus)
        .where(eq(userStatus.userId, user.id))
        .limit(1);

      if (checkStatus.length > 0 && checkStatus[0].isOnline === false) {
        await db
          .update(userStatus)
          .set({ isOnline: true })
          .where(eq(userStatus.userId, user.id));
      } else if (checkStatus.length > 0 && checkStatus[0].isOnline === true) {
        await db
          .update(userStatus)
          .set({ isOnline: true })
          .where(eq(userStatus.userId, user.id));
      } else {
        await db.insert(userStatus).values({
          userId: user.id,
          company_position: user.role,
          loggedInAt: new Date(),
          isOnline: true,
        });
      }
    }
    // 3. Return user object
    return {
      id: user.id,
      name: user.firstname,
      email: user.email,
      role: user.role,
    };
  });

// import { Buffer } from 'node:buffer';
// import fs from 'node:fs';
// import * as XLSX from 'xlsx';

// export const databaseBackup = os.handler(async () => {
//   // const data: Record<string, any> = {};
//   // // Loop through your schema tables
//   // for (const [tableName, tableSchema] of Object.entries(schema)) {
//   //   console.log(`Backing up ${tableName}...`);
//   //   // This assumes your schema export contains the table objects
//   //   const records = await db.select().from(tableSchema as any);
//   //   data[tableName] = records;
//   // }

//   // fs.writeFileSync('./db-backup.json', JSON.stringify(data, null, 2));
//   // console.log('Backup complete! Saved to db-backup.json');

//   const workbook = XLSX.utils.book_new();

//   for (const [tableName, tableSchema] of Object.entries(schema)) {
//     const records = await db.select().from(tableSchema as any);

//     // Convert DB records to a Worksheet
//     const worksheet = XLSX.utils.json_to_sheet(records);

//     // Add the worksheet to the workbook, named after the table
//     XLSX.utils.book_append_sheet(workbook, worksheet, tableName);
//   }

//   // XLSX.writeFile(workbook, './db-backup.xlsx');
//   // console.log('Backup saved to db-backup.xlsx');

//   // 1. Generate the file in memory as a Buffer
//   const fileBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

//   // 2. Return the buffer as a base64 string (oRPC handles strings best)
//   return {
//     filename: 'db-backup.xlsx',
//     data: fileBuffer.toString('base64'),
//   };
// });

export const router = {
  admin: {
    auth: loginOutput,
    signout: os
      .input(z.object({ id: z.string() }))
      .handler(async ({ input }) => {
        await db
          .update(userStatus)
          .set({ isOnline: false })
          .where(eq(userStatus.userId, input.id));
        signOut();

        // redirect('/');
      }),
  },

  // server/auth.ts
};
function getServerSession(authOptions: any) {
  throw new Error('Function not implemented.');
}
