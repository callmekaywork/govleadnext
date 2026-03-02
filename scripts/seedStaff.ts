import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { users } from '../db/schema';
import bcrypt from 'bcrypt';

import { nanoid } from 'nanoid';
import { config } from 'dotenv';

config({ path: '.env.local' });

const db = drizzle(`${process.env.DATABASE_URL!}`);

export const staffAccounts = [
  {
    firstname: 'Zanele',
    lastname: 'Tyobela',
    email: 'pearltyobela@gmail.com',
    password: 'misszanele',
    role: 'admin',
  },
];

async function seedStaff() {
  // if nothing hash the password
  for (const entry of staffAccounts) {
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, `${entry.email}`));

    if (existing.length > 0) {
      console.log('Staff already exists');
    } else {
      // staffAccounts.map(async (entry) => {
      const hash = await bcrypt.hash(`${entry.password}`, 10);
      await db.insert(users).values({
        id: nanoid(),
        firstname: `${entry.firstname}`,
        lastname: `${entry.lastname}`,
        email: `${entry.email}`,
        role: `admin`,
        password: `${hash}`,
      });
    }
  }

  console.log('Staff seeded');
}

seedStaff().catch(err => {
  console.error('❌ Seeding Staff failed:', err);
  process.exit(1);
});
