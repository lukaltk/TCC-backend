import { Request, Response, NextFunction } from 'express';

import Logger from '../common/logger';
import { HttpCode } from '../common/http.code';

import SensorModel from './sensor.model';
import UserModel from '../user/user.model';

import * as SensorError from './sensor.error';

class SensorController {

  async create(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.params;
    const { id } = request.body;

    try {
      const user = await UserModel.findById(userId).select('-password');
      if (!user) throw new SensorError.NotFoundError('User not found.', { userId });

      const sensorExists = await SensorModel.findById(id);
      if (sensorExists) throw new SensorError.InvalidParamsError('Sensor already exists.', { id });

      const sensor = new SensorModel({ _id: id, user: userId });
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
      const sensors = await SensorModel.find({ user: userId });
      return response.status(HttpCode.OK).send(sensors);

    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }

  async getById(request: Request, response: Response, next: NextFunction) {
    const { id, userId } = request.params;

    try {
      const sensor = await SensorModel.findOne({ _id: id, user: userId })

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

      const sensor = await SensorModel.findByIdAndDelete(id);
      if (!sensor) throw new SensorError.NotFoundError('Sensor not found.', { id, userId });

      return response.status(HttpCode.NO_CONTENT).send();

    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }

  async updatePositions(request: Request, response: Response, next: NextFunction) {
    const { id, userId } = request.params;
    const { positions } = request.body;

    try {

      const sensor = await SensorModel.findByIdAndUpdate(id, { positions });
      if (!sensor) throw new SensorError.NotFoundError('Sensor not found.', { id, userId });

      return response.status(HttpCode.NO_CONTENT).send();

    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }
}

export default new SensorController();
