import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

const connection = await mysql.createPool({
  host: process.env.BUN_DB_HOST || 'localhost',
  user: process.env.BUN_DB_USER || 'root',
  database: process.env.BUN_DB_NAME || 'elysia',
  password: process.env.BUN_DB_PASSWORD || 'password',
});

export const db = drizzle(connection, { schema, mode: 'default' });
