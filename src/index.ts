import { Elysia } from 'elysia';
import { api } from './api';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { swaggerOptions } from './options/swagger';
import { jwtAccessSetup, jwtRefreshSetup } from '@guards/setup.jwt';
import cookie from '@elysiajs/cookie';

const app = new Elysia();
api.use(jwtAccessSetup).use(jwtRefreshSetup).use(cookie());
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

if (process.env.BUN_ENVIRONENT !== 'production') {
  api.use(swagger(swaggerOptions));
}

app.use(api);

app.listen(process.env.BUN_PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
