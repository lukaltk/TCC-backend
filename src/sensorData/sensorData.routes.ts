import { Router } from 'express';

import SensorDataController from './sensorData.controller';

import { verifyToken } from '../authentication/authentication.middleware';
import { verifyUserIdSameAsLogged, verifyOwnership } from './sensorData.middleware';

const router = Router();

router.route('/user/:userId/data')
  .all(verifyToken, verifyUserIdSameAsLogged)
  .post(SensorDataController.create)

router.route('/user/:userId/sensor/:sensorId/data')
  .all(verifyToken, verifyUserIdSameAsLogged, verifyOwnership)
  .get(SensorDataController.list)

export default router;