import { ValidationSchema } from 'fastest-validator';
import { Request, Response, NextFunction } from 'express';

import Logger from '../common/logger';

import { validate } from '../common/validator';

import { InvalidParamsError, ForbiddenActionError } from './sensor.error';

import { getSensorById } from './sensor.helper';

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
  const { id, userId } = request.params;

  try {
    const sensor = await getSensorById(id, userId);
    if (!sensor) throw new ForbiddenActionError('The sensor does not belong to the user.');

    request.body.sensor = sensor;

    next();

  } catch (error) {
    Logger.error(error);
    next(error);
  }
}

export const validateCreateRequestFields = (request: Request, response: Response, next: NextFunction) => {

  const schema: ValidationSchema = {
    $$strict: true,
    id: { type: 'string' },
    userId: { type: 'string' },
    user: { type: 'object', optional: true }
  };

  const params = Object.assign(request.params, request.body);

  const errors = validate(schema, params);

  if (errors) next(new InvalidParamsError('Invalid params.', errors));

  next();
}

export const validateListRequestFields = (request: Request, response: Response, next: NextFunction) => {

  const schema: ValidationSchema = {
    $$strict: true,
    userId: { type: 'string' }
  };

  const params = request.params;

  try {
    const errors = validate(schema, params);

    if (errors) throw new InvalidParamsError('Invalid params.', errors);

    next();

  } catch (error) {
    Logger.error(error);
    next(error);
  }
}

export const validateGetByIdRequestFields = (request: Request, response: Response, next: NextFunction) => {

  const schema: ValidationSchema = {
    $$strict: true,
    id: { type: 'string' },
    userId: { type: 'string' }
  };

  const params = request.params;

  try {
    const errors = validate(schema, params);

    if (errors) throw new InvalidParamsError('Invalid params.', errors);

    next();

  } catch (error) {
    Logger.error(error);
    next(error);
  }
}

export const validateDeleteRequestFields = (request: Request, response: Response, next: NextFunction) => {

  const schema: ValidationSchema = {
    $$strict: true,
    id: { type: 'string' },
    userId: { type: 'string' }
  };

  const params = request.params;

  try {
    const errors = validate(schema, params);

    if (errors) throw new InvalidParamsError('Invalid params.', errors);

    next();

  } catch (error) {
    Logger.error(error);
    next(error);
  }
}

export const validateUpdatePositionsRequestFields = (request: Request, response: Response, next: NextFunction) => {

  const schema: ValidationSchema = {
    $$strict: true,
    id: { type: 'string' },
    userId: { type: 'string' },
    user: { type: 'object', optional: true },
    positions: {
      type: 'array',
      items: {
        type: 'object',
        strict: true,
        props: {
          id: { type: 'string' },
          x: { type: 'number' },
          y: { type: 'number' }
        }
      }
    }
  };

  const params = Object.assign(request.params, request.body);

  try {
    const errors = validate(schema, params);

    if (errors) throw new InvalidParamsError('Invalid params.', errors);

    next();

  } catch (error) {
    Logger.error(error);
    next(error);
  }
}