import { model, Schema } from 'mongoose';

export enum Role {
  ADMIN = 'admin',
  USER = 'user'
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER
    }
  },
  { timestamps: true }
);

const UserDataSource = model('User', userSchema);

export default UserDataSource;

