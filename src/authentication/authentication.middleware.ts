import { ValidationSchema } from 'fastest-validator';
import { Request, Response, NextFunction } from 'express';

import Logger from '../common/logger';

import { validate } from '../common/validator';

import { ITokenParams, checkToken, getToken } from './authentication.helper';

import { HttpError } from '../common/exceptions/http.error';
import { ParamNotFoundError, TokenNotFoundError, TokenNotValid, UserNotFoundError } from './authentication.errors';
import { getUserById } from '../user/user.helper';

export const verifyToken = async (request: Request, response: Response, next: NextFunction) => {

  try {
    if (!request.headers.authorization) throw new ParamNotFoundError('Access denied.');

    const token = getToken(request);

    if (!token) throw new TokenNotFoundError('Access denied.');

    const verified = (await checkToken(token) as ITokenParams);
    const userId = verified.id;

    const user = await getUserById(userId);

    if(!user) throw new UserNotFoundError('User not found.', { userId });

    request.body.user = user;

    next()

  } catch (error) {
    Logger.error(error);

    if(error instanceof HttpError) {
      next(error);
    
    } else {
      next(new TokenNotValid('Access denied.'));
    }
  }
}