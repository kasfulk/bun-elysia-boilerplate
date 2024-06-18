import { createElysia } from '@utils/create-elysia';

import { PublicController } from './public/public.controllers';
import { AuthController } from './auth/auth.controllers';

export const api = createElysia().use(PublicController).use(AuthController);
