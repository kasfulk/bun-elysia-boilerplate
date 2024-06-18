import { Elysia } from 'elysia';
import { api } from './api';
import { cors } from '@elysiajs/cors';

const app = new Elysia();
api.use(
  cors({
    origin: process.env.BUN_CORS_ORIGIN || '*',
    credentials: true,
    exposedHeaders: process.env.BUN_CORS_EXPOSED_HEADERS || '*',
    allowedHeaders: process.env.BUN_CORS_ALLOWED_HEADER || '*',
    // @ts-expect-error env
    methods: (process.env.BUN_CORS_ALLOWED_METHODS! as HTTPMethod) || '*',
  }),
);

app.use(api);

app.listen(process.env.BUN_PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
