import mongoose from 'mongoose';

import Logger from '../common/logger';

import { db } from '../config';

const connect = async () => {
  const dbUri = db.uri;

  try {
    await mongoose.connect(dbUri);
    Logger.info('DB connected');

  } catch (error) {
    Logger.error(error);
    process.exit(1);
  }
}

export default connect;