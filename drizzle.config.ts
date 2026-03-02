// import 'dotenv/config';
// import { defineConfig } from 'drizzle-kit';
// import { config } from 'dotenv';

// if (!process.env.DATABASE_URL) {
//   throw new Error('No database url found / no environment string found');
// }

// config({ path: '.env' });

// export default defineConfig({
//   dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
//   schema: './db/schema.ts',
//   out: './migrations',
//   dbCredentials: {
//     url: 'postgres://callmekay:incuveracallmekay@1@localhost:5433/incuvera_db2',
//   },
// });

import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' });

export default defineConfig({
  schema: './db/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
