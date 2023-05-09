import { Request, Response, NextFunction } from 'express';

import Logger from '../common/logger';
import { HttpCode } from '../common/http.code';

import SensorDataSource from './sensor.data-source';
import UserDataSource from '../user/user.data-source';

import * as SensorError from './sensor.error';

class SensorController {

  async create(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.params;

    try {
      const user = await UserDataSource.findById(userId).select('-password');
      if (!user) throw new SensorError.NotFoundError('User not found.', { userId });

      const sensor = new SensorDataSource({ user: userId });
      const { _id: sensorId } = await sensor.save();

      return response.status(HttpCode.CREATED).send(sensorId);

    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }

  async list(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.params;

    try {
      const sensors = await SensorDataSource.find({ user: userId });
      return response.status(HttpCode.OK).send(sensors);

    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }

  async getById(request: Request, response: Response, next: NextFunction) {
    const { id, userId } = request.params;

    try {
      const sensor = await SensorDataSource.findOne({ _id: id, user: userId });

      if (!sensor) throw new SensorError.NotFoundError('Sensor not Found', { id, userId });

      return response.status(HttpCode.OK).send(sensor);

    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    const { id, userId } = request.params;

    try {

      const sensor = await SensorDataSource.findByIdAndDelete(id);
      if (!sensor) throw new SensorError.NotFoundError('Sensor not found.', { id, userId });

      return response.status(HttpCode.NO_CONTENT).send();

    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }
}

export default new SensorController();
