import { ValidationSchema } from 'fastest-validator';
import { Request, Response, NextFunction } from 'express';

import Logger from '../common/logger';

import { validate } from '../common/validator';

import { InvalidParamsError } from './user.error';

export const validateRegisterRequestFields = (request: Request, response: Response, next: NextFunction) => {

  const schema: ValidationSchema = {
    $$strict: true,
    email: { type: 'email' },
    password: { type: 'string' },
    confirmPassword: { type: 'string' }
  };

  const body = request.body;

  try {
    const errors = validate(schema, body);

    if (errors) throw new InvalidParamsError('Invalid params.', errors);

    next();

  } catch (error) {
    Logger.error(error);
    next(error);
  }
}

export const validateLoginRequestFields = (request: Request, response: Response, next: NextFunction) => {

  const schema: ValidationSchema = {
    $$strict: true,
    email: { type: 'email' },
    password: { type: 'string' }
  };

  try {
    const body = request.body;

    const errors = validate(schema, body);

    if (errors) throw new InvalidParamsError('Invalid params.', errors);

    next();

  } catch (error) {
    Logger.error(error);
    next(error);
  }
}

