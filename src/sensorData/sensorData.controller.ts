import { Request, Response, NextFunction } from 'express';

import Logger from '../common/logger';
import { HttpCode } from '../common/http.code';

import SensorModel from '../sensor/sensor.model';
import SensorDataModel, { ISensorData } from './sensorData.model';

import * as SensorDataError from './sensorData.error';

class SensorDataController {

  async create(request: Request, response: Response, next: NextFunction) {
    const { sensorId, voltage, current, temperatures } = request.body;

    try {
      const sensor = await SensorModel.findById(sensorId);
      if (!sensor) throw new SensorDataError.NotFoundError('Sensor not found.', { sensorId });

      const temp = temperatures.map((temperature: { id: String, value: number }) => {
        const position = sensor.positions.find(position => position.id === temperature.id);

        return {
          id: temperature.id,
          value: temperature.value,
          x: position?.x ?? 0,
          y: position?.y ?? 0,
        }
      });

      const sensorData: ISensorData = {
        voltage: voltage,
        current: current,
        temperature: temp,
        sensorId,
        timestamp: new Date()
      }

      const data = new SensorDataModel(sensorData);
      const { id } = await data.save();

      return response.status(HttpCode.CREATED).send({ id });

    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }

  async list(request: Request, response: Response, next: NextFunction) {
    const { sensorId } = request.params;

    try {
      const data = await SensorDataModel.find({ sensorId });
      return response.status(HttpCode.OK).send(data);

    } catch (error) {
      Logger.error(error);
      next(error);
    }
  }
}

export default new SensorDataController();
