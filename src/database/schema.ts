import { text, mysqlSchema, datetime } from 'drizzle-orm/mysql-core';
export const mySchema = mysqlSchema('elysia');

export const users = mySchema.table('users', {
  username: text('username').notNull().primaryKey(),
  password: text('password').notNull(),
  email: text('email').notNull(),
  created_at: datetime('created_at'),
  updated_at: datetime('updated_at'),
  deleted_at: datetime('deleted_at'),
});
