import { ValidationSchema } from 'fastest-validator';
import { Request, Response, NextFunction } from 'express';

import Logger from '../common/logger';

import { validate } from '../common/validator';

import { ForbiddenActionError } from './sensorData.error';

import { getSensorById } from '../sensor/sensor.helper';

export const verifyUserIdSameAsLogged = async (request: Request, response: Response, next: NextFunction) => {
  const { userId } = request.params;
  const user = request.body.user;

  try {
    if (userId !== user.id) throw new ForbiddenActionError('User is not the same as logged in.', { userId });

    next();

  } catch (error) {
    Logger.error(error);
    next(error);
  }
}

export const verifyOwnership = async (request: Request, response: Response, next: NextFunction) => {
  const { sensorId, userId } = request.params;

  try {
    const sensor = await getSensorById(sensorId, userId);
    if (!sensor) throw new ForbiddenActionError('The sensor does not belong to the user.');

    request.body.sensor = sensor;

    next();

  } catch (error) {
    Logger.error(error);
    next(error);
  }
}