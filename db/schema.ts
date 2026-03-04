import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  numeric,
  primaryKey,
  foreignKey,
  unique,
  check,
  boolean,
  uuid,
  json,
} from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import type { AdapterAccountType } from 'next-auth/adapters';
import { sql } from 'drizzle-orm';

const id = nanoid(50);

export const users = pgTable('users', {
  id: text('uID')
    .primaryKey()
    .$defaultFn(() => id)
    .unique(),
  firstname: text('firstname'),
  lastname: text('lastname'),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role')
    .$type<'admin' | 'staff' | 'user'>()
    .notNull()
    .default('staff'),
  image: text('image'),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

export const userStatus = pgTable('user_status', {
  id: serial('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  company_position: text('company_position'),
  loggedInAt: timestamp('logged_in_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  loggedOutAt: timestamp('logged_out_at', { withTimezone: true }),

  // derived flag: true if loggedOutAt is null
  isOnline: boolean('is_online').default(true).notNull(),
});

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  account => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ],
);

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { withTimezone: true }).notNull(),
});

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  verificationToken => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ],
);

export const authenticators = pgTable(
  'authenticator',
  {
    credentialID: text('credentialID').notNull().unique(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    providerAccountId: text('providerAccountId').notNull(),
    credentialPublicKey: text('credentialPublicKey').notNull(),
    counter: integer('counter').notNull(),
    credentialDeviceType: text('credentialDeviceType').notNull(),
    credentialBackedUp: boolean('credentialBackedUp').notNull(),
    transports: text('transports'),
  },
  authenticator => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ],
);

export const application = pgTable('application', {
  id: serial('id').primaryKey(),
  ownerId: integer('owner_id').notNull(),
  ownerType: text('owner_type').notNull(), // 'startup' | 'corporate' | 'individual'
});

// export const startup = pgTable('startup', {
//   id: serial('id').primaryKey(),

//   // Personal Info
//   firstName: varchar('first_name', { length: 100 }).notNull(),
//   lastName: varchar('last_name', { length: 100 }).notNull(),
//   email: varchar('email', { length: 255 }).notNull().unique(),
//   role: varchar('role', { length: 100 }).notNull(),
//   linkedin: varchar('linkedin', { length: 255 }), // optional

//   // Startup Info
//   startupName: varchar('startup_name', { length: 150 }).notNull(),
//   industry: varchar('industry', { length: 100 }).notNull(),
//   stage: varchar('stage', { length: 50 }).notNull(), // enum in Zod, string in DB
//   teamSize: integer('team_size').notNull(),
//   website: varchar('website', { length: 255 }), // optional

//   // Business Details
//   description: text('description').notNull(),
//   currentChallenges: text('current_challenges').notNull(),
//   revenueModel: varchar('revenue_model', { length: 100 }).notNull(),

//   // Mentorship Goals
//   goals: text('goals').notNull(),
//   preferredExpertise: json('preferred_expertise').$type<string[]>().notNull(),
//   commitmentLevel: varchar('commitment_level', { length: 100 }).notNull(),

//   // Metadata
//   createdAt: timestamp('created_at').defaultNow().notNull(),
// });

export const person = pgTable('person', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  linkedin: varchar('linkedin', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const startup = pgTable('startup', {
  id: serial('id').primaryKey(),
  personId: integer('person_id')
    .references(() => person.id)
    .notNull(),
  startupName: varchar('startup_name', { length: 150 }).notNull(),
  industry: varchar('industry', { length: 100 }).notNull(),
  stage: varchar('stage', { length: 50 }).notNull(),
  teamSize: integer('team_size').notNull(),
  website: varchar('website', { length: 255 }),
});

export const corporate = pgTable('corporate', {
  id: serial('id').primaryKey(),
  personId: integer('person_id')
    .references(() => person.id)
    .notNull(),
  companyName: varchar('company_name', { length: 150 }).notNull(),
  industry: varchar('industry', { length: 100 }).notNull(),
  size: integer('size').notNull(),
  website: varchar('website', { length: 255 }),
});

export const individual = pgTable('individual', {
  id: serial('id').primaryKey(),
  personId: integer('person_id')
    .references(() => person.id)
    .notNull(),
  occupation: varchar('occupation', { length: 100 }),
  skills: json('skills').$type<string[]>(),
});
