import { createElysia } from '@utils/create-elysia';
import { PublicServices } from './public.services';

const _publicServices = new PublicServices();

export const PublicController = createElysia({
  prefix: '/public',
  detail: {
    tags: ['Public'],
  },
})
  .get(
    '',
    () => {
      return _publicServices.checkServices();
    },
    {
      detail: {
        tags: ['Public'],
      },
    },
  )
  .get(
    '/api-trial',
    () => {
      return _publicServices.apiTrial();
    },
    {
      detail: {
        tags: ['Public'],
      },
    },
  );
