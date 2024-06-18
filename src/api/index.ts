import { createElysia } from '@utils/create-elysia';

import { PublicController } from './public/public.controllers';

export const api = createElysia().use(PublicController);
