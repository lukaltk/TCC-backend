import { Request, Response, NextFunction } from 'express';

import Logger from '../common/logger';
import { HttpCode } from '../common/http.code';

import UserDataSource from './user.data-source';

import * as UserError from './user.error';

import { checkPassword, createPasswordHash, createUserToken } from '../authentication/authentication.helper';

class UserController {

  async create(req: Request, res: Response, next: NextFunction) {
    const { email, password, confirmPassword } = req.body;

    try {
      if (password !== confirmPassword) throw new UserError.InvalidParamsError('Passwords do not match.');

      const userExists = await UserDataSource.findOne({ email });
      if (userExists) throw new UserError.InvalidParamsError('User already exists.', { email });

      const passwordHash = await createPasswordHash(password);

      const user = new UserDataSource({
        email,
        password: passwordHash
      });


      const { _id: userId } = await user.save();
      return res.status(HttpCode.CREATED).send({ userId });

    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const user = await UserDataSource.findOne({ email });

      if (!user) throw new UserError.NotFoundError('User is not registered.', { email });

      const isPasswordCorrect = await checkPassword(password, user.password);

      if (!isPasswordCorrect) throw new UserError.InvalidParamsError('Invalid password.', { password });

      const token = await createUserToken(user.id);

      const response = {
        userId: user.id,
        accessToken: token
      }

      return res.status(HttpCode.OK).send(response);

    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }
}

export default new UserController();
