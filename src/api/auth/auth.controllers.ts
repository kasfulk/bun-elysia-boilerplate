import { createElysia } from '@utils/create-elysia';
import { t } from 'elysia';
import { AuthServices } from './auth.services';
import {
  CookieOptions,
  jwtAccessSetup,
  jwtRefreshSetup,
} from '@guards/setup.jwt';

const _authServices = new AuthServices();

export const AuthController = createElysia({
  prefix: '/auth',
  detail: {
    tags: ['Auth'],
  },
})
  .use(jwtAccessSetup)
  .use(jwtRefreshSetup)
  .post(
    '/login',
    async ({ body, jwtAccess, jwtRefresh, cookie, set }) => {
      const { username, password } = body;
      const result = await _authServices.validateUser(username, password);
      if (!result.success) {
        set.status = result.code;
        return {
          code: result.code,
          message: 'Invalid username or password',
        };
      }

      const userId = result.data?.username;
      if (userId) {
        cookie.access_token.set({
          value: await jwtAccess.sign({
            userId,
          }),
          ...CookieOptions.accessToken,
        });
        cookie.refresh_token.set({
          value: await jwtRefresh.sign({
            userId,
          }),
          ...CookieOptions.refreshToken,
        });
      }

      return {
        code: 200,
        message: `Hello from login ${username}!`,
        data: {
          username: result.data?.username,
          email: result.data?.email,
        },
      };
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
      detail: {
        // TODO: splitting into another files
        parameters: [
          {
            name: 'Login API',
            in: 'body',
            description: 'API that allows users to login',
            schema: {
              $ref: '#/definitions/LoginCredentials',
            },
            example: {
              username: 'admin',
              password: 'password',
            },
          },
        ],
      },
    },
  )
  .post(
    '/register',
    async ({ body, jwtAccess, jwtRefresh, cookie, set }) => {
      const { username, password, email } = body;
      const result = await _authServices.registerUser({
        username,
        password,
        email,
      });
      if (!result.success) {
        set.status = result.code;
        return {
          code: result.code,
          message: 'Invalid username or password',
        };
      }
      const userId = result.data?.username;
      if (userId) {
        cookie.access_token.set({
          value: await jwtAccess.sign({
            userId,
          }),
          ...CookieOptions.accessToken,
        });
        cookie.refresh_token.set({
          value: await jwtRefresh.sign({
            userId,
          }),
          ...CookieOptions.refreshToken,
        });
      }

      set.status = 201;
      return {
        code: 201,
        message: `Hello from register ${username}!`,
        data: {
          username: result.data?.username,
          email: result.data?.email,
        },
      };
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
        email: t.String(),
      }),
      detail: {
        // TODO: splitting into another files
        parameters: [
          {
            name: 'Register API',
            in: 'body',
            description: 'API that allows users to register',
            schema: {
              $ref: '#/definitions/RegisterCredentials',
            },
            example: {
              username: 'admin',
              password: 'password',
              email: 'admin@mail.com',
            },
          },
        ],
      },
    },
  );
