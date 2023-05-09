import { NextFunction, Request, Response } from 'express';
import { HttpError } from './http.error';

const errorHandler = (error: HttpError, request: Request, response: Response, next: NextFunction) => {
  const code = error.status || 500;
  const message = error.message || 'Something went wrong';
  const type = error.name;
  const data = error.data;

  response.status(code).json({ code, type, message, data });
}

export default errorHandler;