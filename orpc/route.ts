import { z } from 'zod';
import { db } from '@/db';
import {
  accounts,
  corporate,
  individual,
  person,
  posts,
  startup,
  users,
} from '@/db/schema';
import type { IncomingHttpHeaders } from 'node:http';
import { os } from '@orpc/server';

import { eq, or, and, desc, ne, sql } from 'drizzle-orm';
import { signIn, signOut } from '@/auth';

import * as schema from '@/db/schema';

import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import {
  personSchema,
  postSchema,
  StartupFormSchema,
  startupSchema,
} from '@/db/validationschemas';

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

// const AuthSchema = z.union([personSchema, startupSchema]);

export const startupapplication = os
  .$context<{ headers: IncomingHttpHeaders }>()
  .input(StartupFormSchema)
  .handler(async ({ input, context }) => {
    // insert data to the database
    // check for person first
    const checkPerson = await db
      .select()
      .from(person)
      .where(eq(person.email, input.email));

    if (checkPerson.length > 0) {
      await db.insert(schema.startup).values({
        personId: checkPerson[0].id,
        startupName: input.startupName,
        industry: input.industry,
        stage: input.stage,
        teamSize: input.teamSize,
        website: input.website,
        status: 'pending',
      });

      return { success: true };
    } else {
      const newPerson = await db
        .insert(person)
        .values({
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          linkedin: input.linkedin,
        })
        .returning();

      await db.insert(schema.startup).values({
        personId: newPerson[0].id,
        startupName: input.startupName,
        industry: input.industry,
        stage: input.stage,
        teamSize: input.teamSize,
        website: input.website,
        status: 'pending',
      });

      return { success: true };
    }

    // console.log(input);

    return { success: false };
  });

export const getActiveApplications = os.handler(async () => {
  const data = await db
    .select()
    .from(person)
    .leftJoin(startup, eq(startup.personId, person.id))
    .leftJoin(corporate, eq(corporate.personId, person.id))
    .leftJoin(individual, eq(individual.personId, person.id));

  return data;
});

export const getAllPosts = os.handler(async () => {
  const data = await db
    .select()
    .from(posts)
    .innerJoin(users, eq(posts.authorId, users.id));

  // console.log(data);

  return data;
});

export const createNewPost = os
  .$context<{ headers: IncomingHttpHeaders }>()
  .input(postSchema)
  .handler(async ({ input, context }) => {
    // insert data to the database

    console.log(input);
    // check for the slug if it exists
    const checkPost = await db
      .select()
      .from(posts)
      .where(eq(posts.slug, input.slug));

    if (checkPost.length == 0) {
      // create a new post
      // if there are no slugs that match
      try {
        await db.insert(posts).values({
          title: input.title,
          authorId: input.authorId,
          slug: input.slug,
          content: input.content,
          published: input.published,
          excerpt: input.excerpt,
          coverImageUrl: input.coverImageUrl,
          publishedAt: input.publishedAt,
          updatedAt: input.updatedAt,
        });

        return { message: 'Post created' };
      } catch (error: any) {
        console.error('Database insert failed:', error);

        // You can return a structured error response
        return {
          message: 'Failed to create post',
          error: error.message ?? 'Unknown error',
          code: error.code, // Postgres error code if available
        };
      }
    } else {
      // what if slug exist
      // const randomNum = Math.floor(1000 + Math.random() * 9000); // 1000–9999

      try {
        await db
          .update(posts)
          .set({
            title: input.title,
            authorId: input.authorId,
            slug: `${input.slug}`,
            content: input.content,
            published: input.published,
            excerpt: input.excerpt,
            coverImageUrl: input.coverImageUrl,
            publishedAt: input.publishedAt,
            updatedAt: input.updatedAt,
          })
          .where(eq(posts.slug, input.slug));

        return { message: `Post with slug: ${input.slug} has been updated` };
      } catch (error: any) {
        console.error('Database Update failed:', error);

        // You can return a structured error response
        return {
          message: 'Failed to update post',
          error: error.message ?? 'Unknown error',
          code: error.code, // Postgres error code if available
        };
      }
    }
  });

export const deletePost = os
  .$context<{ headers: IncomingHttpHeaders }>()
  .input(z.object({ slug: z.string() }))
  .handler(async ({ input, context }) => {
    // insert data to the database

    try {
      await db.delete(posts).where(eq(posts.slug, input.slug));
      return { message: 'Post Deleted' };
    } catch (error: any) {
      console.error('Database delete failed:', error);

      // You can return a structured error response
      return {
        message: 'Failed to delete post',
        error: error.message ?? 'Unknown error',
        code: error.code, // Postgres error code if available
      };
    }
  });

// export const startupapplication = os
//   .$context<{ headers: IncomingHttpHeaders }>()
//   .input(
//     z.object({
//       firstName: z.string().min(2, 'First name is required'),
//       lastName: z.string().min(2, 'Last name is required'),
//       email: z.email('Invalid email address'),
//       role: z.string().min(2, 'Role is required'),
//       linkedin: z.string('Invalid LinkedIn URL').optional(),
//     }),
//   )
//   .handler(async ({ input, context }) => {
//     // insert data to the database
//     console.log('why is it a bad request');
//     console.log(input);
//   });

export const router = {
  admin: {
    auth: loginOutput,
    create: createNewPost,
    delete: deletePost,
    signout: os
      .input(z.object({ id: z.string() }))
      .handler(async ({ input }) => {
        signOut();

        // redirect('/');
      }),
  },
  applications: {
    startup: startupapplication,
  },
  select: {
    posts: getAllPosts,
    response: getActiveApplications,
  },

  // server/auth.ts
};
function getServerSession(authOptions: any) {
  throw new Error('Function not implemented.');
}
