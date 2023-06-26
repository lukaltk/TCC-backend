import { model, Schema } from 'mongoose';

export interface ISensorData {
  voltage: Number,
  current: Number,
  temperature: [
    {
      x: Number,
      y: Number,
      value: Number
    }
  ],
  sensorId: String
  timestamp: Date
}

const sensorDataSchema = new Schema<ISensorData>(
  {
    voltage: Number,
    current: Number,
    temperature: [
      {
        _id: false,
        id: String,
        x: Number,
        y: Number,
        value: Number
      }
    ],
    sensorId: String,
    timestamp: Date
  },
  {
    timeseries: {
      timeField: 'timestamp',
      metaField: 'sensorId'
    }
  }
);

const SensorDataModel = model('SensorData', sensorDataSchema);

export default SensorDataModel;