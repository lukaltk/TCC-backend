import { model, Schema } from 'mongoose';
import User, { Role } from './user.model';

const userSchema = new Schema<User>(
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