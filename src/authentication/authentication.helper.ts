import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request } from 'express';

import { jwtSecret, jwtExpireTime } from '../config';

export interface ITokenParams {
  id: string
}

export const createPasswordHash = async (password: string) => {
  return await bcrypt.hash(password, 12);
}

export const checkPassword = async (password: string, userPassword: string) => {
  return await bcrypt.compare(password, userPassword);
}

export const createUserToken = async(userId: string) => {
  
  const token = jwt.sign(
    {
      id: userId
    },
    jwtSecret,
    { expiresIn: jwtExpireTime }
  )

  return token;
};

export const getToken = (req: Request) => {
  const authHeader = req.headers.authorization;

  if(!authHeader) return null;

  const token = authHeader.split(" ")[1];
  return token;
};

export const checkToken = async (token: string) => {
    return jwt.verify(token, jwtSecret);
}