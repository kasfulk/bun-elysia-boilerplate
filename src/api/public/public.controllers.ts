import { createElysia } from '@utils/create-elysia';
import { PublicServices } from './public.services';

const _publicServices = new PublicServices();

export const PublicController = createElysia().group('public', (app) => {
  return app
    .get('', () => {
      return _publicServices.checkServices();
    })
    .get('/api-trial', () => {
      return _publicServices.apiTrial();
    });
});
