import UserDataSource from './user.data-source';

export const getUserById = async (id: string) => {
  const user = UserDataSource.findById(id).select('-password');
  return user;
}