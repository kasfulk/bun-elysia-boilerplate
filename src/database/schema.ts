import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  username: text('username').notNull().primaryKey(),
  password: text('password').notNull(),
  email: text('email').notNull(),
  createdAt: text('createdAt').default('CURRENT_TIMESTAMP'),
  updatedAt: text('updatedAt').default('CURRENT_TIMESTAMP'),
  deletedAt: text('deletedAt').default('NULL'),
});
