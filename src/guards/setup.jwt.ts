import { Elysia, t } from 'elysia';
import { jwt } from '@elysiajs/jwt';

interface ÌCookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: boolean | 'strict' | 'lax' | 'none' | undefined;
  maxAge: number;
  path: string;
}

interface ICookiesOptions {
  accessToken: ÌCookieOptions;
  refreshToken: ÌCookieOptions;
}

export const CookieOptions: ICookiesOptions = {
  accessToken: {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: parseInt(process.env.JWT_TOKEN_EXPIRATION_TIME || '604800'),
  },
  refreshToken: {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/auth/refresh-token',
    maxAge: parseInt(
      process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME || '2592000',
    ),
  },
};

export const jwtAccessSetup = new Elysia({
  name: 'jwtAccess',
}).use(
  jwt({
    name: 'jwtAccess',
    schema: t.Object({
      userId: t.String(),
    }),
    secret: process.env.JWT_ACCESS_SECRET ?? 'DO NOT USE THIS SECRET KEY',
    exp:
      process.env.JWT_TOKEN_EXPIRATION_TIME || 30 * 24 * 60 * 60 + Date.now(),
  }),
);

export const jwtRefreshSetup = new Elysia({
  name: 'jwtRefresh',
}).use(
  jwt({
    name: 'jwtRefresh',
    schema: t.Object({
      userId: t.String(),
    }),
    secret: process.env.JWT_REFRESH_SECRET ?? 'DO NOT USE THIS SECRET KEY',
    exp:
      process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME ||
      30 * 24 * 60 * 60 + Date.now(),
  }),
);

export type jwtAccessSetupType = typeof jwtAccessSetup;
