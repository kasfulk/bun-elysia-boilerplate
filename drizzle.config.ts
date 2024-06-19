import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/database/schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    database: process.env.DB_DATABASE || 'elysia',
  },
  verbose: true,
  out: './generated',
});
