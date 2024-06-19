import { jwtAccessSetup, jwtRefreshSetup } from '@guards/setup.jwt';
import { Elysia } from 'elysia';
export const createElysia = (
  config?: ConstructorParameters<typeof Elysia>[0],
) =>
  new Elysia({ ...config, aot: process.env.RUNTIME === 'bun' })
    .use(jwtAccessSetup)
    .use(jwtRefreshSetup);
