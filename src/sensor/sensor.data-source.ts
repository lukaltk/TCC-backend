import { model, Schema } from 'mongoose';

const sensorSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

const SensorDataSource = model('Sensor', sensorSchema);

export default SensorDataSource;