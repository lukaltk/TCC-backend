import { Router } from 'express';

import adminRouter from './admin/admin.routes';
import sensorRouter from './sensor/sensor.routes';
import userRouter from './user/user.routes';
import sensorDataRouter from './sensorData/sensorData.routes' 

const router = Router();

router.use(adminRouter);
router.use(sensorRouter);
router.use(sensorDataRouter);
router.use(userRouter);

export default router;