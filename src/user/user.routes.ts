import { Router } from 'express';

import UserController from './user.controller';

import { validateRegisterRequestFields, validateLoginRequestFields } from './user.middleware';

const router = Router();

router.route('/user/register')
  .post(validateRegisterRequestFields, UserController.create);

router.route('/user/login')
  .post(validateLoginRequestFields, UserController.login)

export default router;