import { text, mysqlSchema } from 'drizzle-orm/mysql-core';
export const mySchema = mysqlSchema('elysia');

export const users = mySchema.table('users', {
  username: text('username').notNull().primaryKey(),
  password: text('password').notNull(),
  email: text('email').notNull(),
  createdAt: text('createdAt').default('CURRENT_TIMESTAMP'),
  updatedAt: text('updatedAt').default('CURRENT_TIMESTAMP'),
  deletedAt: text('deletedAt').default('NULL'),
});
