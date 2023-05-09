import { Request, Response, NextFunction } from 'express';

import Logger from '../common/logger';
import { HttpCode } from '../common/http.code';

import UserDataSource from '../user/user.data-source';

import { Role } from '../user/user.model'

import * as AdminError from './admin.error';

import { createPasswordHash } from '../authentication/authentication.helper';

class AdminController {
  async create(request: Request, response: Response, next: NextFunction) {
    const { email, password, confirmPassword } = request.body;

    try {
      if (password !== confirmPassword) throw new AdminError.InvalidParamsError('Passwords do not match.');

      const adminExists = await UserDataSource.findOne({ email });
      if (adminExists) throw new AdminError.InvalidParamsError('Admin already exists.', { email });

      const passwordHash = await createPasswordHash(password);

      const admin = new UserDataSource({
        email,
        password: passwordHash,
        role: Role.ADMIN
      });


      const { _id: adminId } = await admin.save();
      return response.status(HttpCode.CREATED).send({ adminId });

    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }

  async getAllUsers(request: Request, response: Response, next: NextFunction) {

    try {
      const users = await UserDataSource.find().select('-password');
      return response.status(HttpCode.OK).send({ users });

    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }
}

export default new AdminController();