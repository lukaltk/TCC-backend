import * as dotenv from 'dotenv';
dotenv.config();

export const environment = process.env.NODE_ENV;
export const port = Number(process.env.PORT ?? '5000');

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

export const db = {
  uri: `mongodb+srv://${dbUser}:${dbPassword}@cluster0.mwsrn5n.mongodb.net/?retryWrites=true&w=majority`
};

if(!process.env.JWT_SECRET) throw new Error('JWT Secret Not Found!');
export const jwtSecret = process.env.JWT_SECRET;
export const jwtExpireTime = process.env.JWT_EXPIRE_TIME ?? '15m';