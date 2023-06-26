import SensorModel from './sensor.model';

export const getSensorById = async (id: string, userId: string) => {
  const user = SensorModel.findOne({ _id: id, user: userId });
  return user;
}