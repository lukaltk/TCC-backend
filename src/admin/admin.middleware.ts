import { ValidationSchema } from 'fastest-validator';
import { Request, Response, NextFunction } from 'express';

import Logger from '../common/logger';

import { validate } from '../common/validator';

import { InvalidParamsError, NotAdminError, ForbiddenActionError } from './admin.error';

import { Role } from '../user/user.model';

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

export const verifyAdmin = (request: Request, response: Response, next: NextFunction) => {
  const adminId = request.params.id;
  const user = request.body.user;

  try {
    if (user.role !== Role.ADMIN) throw new NotAdminError();

    if (adminId !== user.id) throw new ForbiddenActionError('User is not the same as logged in.', { adminId });
    
    next();

  } catch (error) {
    Logger.error(error);
    next(error);
  }
}