import express from 'express';
import cors from 'cors'
import helmet from 'helmet';

import { port, environment } from './config';

import db from './database/db.config';

import Logger from './common/logger';
import errorHandler from './common/exceptions/http.error.handler';

import morganMiddleware from './common/middleware/morgan.middleware';

import router from './routes';

const app = express();

app.use(express.json());

app.use(morganMiddleware);
app.use(cors());
app.use(helmet());

app.use('/api', router);

app.use(errorHandler);

app.listen(port, async () => {
  await db();
  Logger.info(`Server running on env:${environment} and port:${port}`);
});