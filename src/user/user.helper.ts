import UserModel from './user.model';

export const getUserById = async (id: string) => {
  const user = UserModel.findById(id).select('-password');
  return user;
}