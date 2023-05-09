import { Router } from 'express';

import SensorController from './sensor.controller';

import { verifyToken } from '../authentication/authentication.middleware';
import {
  verifyUserIdSameAsLogged,
  verifyOwnership,
  validateCreateRequestFields,
  validateListRequestFields,
  validateDeleteRequestFields,
  validateGetByIdRequestFields
} from './sensor.middleware';

const router = Router();

router.route('/user/:userId/sensor')
.all(verifyToken, verifyUserIdSameAsLogged)
  .get(validateListRequestFields, SensorController.list)
  .post(validateCreateRequestFields, verifyUserIdSameAsLogged, SensorController.create);

router.route('/user/:userId/sensor/:id')
  .all(verifyToken, verifyUserIdSameAsLogged)
  .get(validateGetByIdRequestFields, SensorController.getById)
  .delete(validateDeleteRequestFields, verifyOwnership, SensorController.delete);

export default router;