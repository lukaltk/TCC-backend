import { Router } from 'express';

import AdminController from './admin.controller';

import { verifyToken } from '../authentication/authentication.middleware';
import { validateRegisterRequestFields, verifyAdmin } from './admin.middleware';

const router = Router();

router.route('/admin/create')
  .post(validateRegisterRequestFields, AdminController.create);

router.route('/admin/:id/user')
  .get(verifyToken, verifyAdmin, AdminController.getAllUsers);

export default router;