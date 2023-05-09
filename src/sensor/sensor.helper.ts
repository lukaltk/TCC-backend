import SensorDataSource from './sensor.data-source';

export const getSensorById = async (id: string, userId: string) => {
  const user = SensorDataSource.findOne({ _id: id, user: userId });
  return user;
}