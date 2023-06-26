import { model, Schema } from 'mongoose';

const sensorSchema = new Schema(
  {
    _id: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    positions: [
      {
        _id: false,
        id: String,
        x: Number,
        y: Number
      }
    ]
  },
  { timestamps: true }
);

const SensorDataSource = model('Sensor', sensorSchema);

export default SensorDataSource;