import fs from 'node:fs';
import { db } from '../db';
import * as schema from '../db/schema';

async function restore() {
  const rawData = fs.readFileSync('./db-backup.json', 'utf-8');
  const backupData = JSON.parse(rawData);

  // 1. Disable Foreign Keys (Syntax varies: this is for PostgreSQL/SQLite)
  // For SQLite: await db.run(sql`PRAGMA foreign_keys = OFF`);
  // For Postgres: await db.execute(sql`SET session_replication_role = 'replica';`);

  for (const [tableName, records] of Object.entries(backupData)) {
    const table = (schema as any)[tableName];
    if (!table || records.length === 0) continue;

    console.log(`Restoring ${tableName}...`);

    // 2. Clear existing data
    await db.delete(table);

    // 3. Re-insert data
    await db.insert(table).values(records);
  }

  // 4. Re-enable Foreign Keys
  // For Postgres: await db.execute(sql`SET session_replication_role = 'origin';`);
  console.log('Restore complete!');
}

restore();
