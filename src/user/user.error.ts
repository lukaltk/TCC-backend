import { HttpCode } from '../common/http.code'; 
import { HttpError, IHttpErrorArgs } from '../common/exceptions/http.error';

abstract class UserError extends HttpError {
  constructor(args: IHttpErrorArgs) {
    super({ status: args.status, message: args.message, name: `USER_ERROR-${args.name}`, data: args.data });
  }
}

export class InvalidParamsError extends UserError {
  constructor(message = 'Invalid params', data?: object) {
    super({ status: HttpCode.UNPROCESSABLE_CONTENT, message, name: 'INVALID_PARAMS', data });
  }
}

export class ParamNotFoundError extends UserError {
  constructor(message = 'Required param not found', data?: object) {
    super({ status: HttpCode.BAD_REQUEST, message, name: 'PARAM_NOT_FOUND', data });
  }
}

export class AlreadyExistsError extends UserError {
  constructor(message = 'User already exists', data?: object) {
    super({ status: HttpCode.BAD_REQUEST, message, name: 'ALREADY_EXISTS', data });
  }
}

export class EmailAlreadyExistsError extends UserError {
  constructor(message = 'Invalid email', data?: object) {
    super({ status: HttpCode.BAD_REQUEST, message, name: 'INVALID_EMAIL', data });
  }
}

export class TokenNotFoundError extends UserError {
  constructor(message = 'Token not found', data?: object) {
    super({ status: HttpCode.BAD_REQUEST, message, name: 'TOKEN_NOT_FOUND', data });
  }
}
export class NotFoundError extends UserError {
  constructor(message = 'User not found', data?: object) {
    super({ status: HttpCode.NOT_FOUND, message, name: 'NOT_FOUND', data });
  }
}

export class InternalError extends UserError {
  constructor(message = 'Internal error', data?: object) {
    super({ status: HttpCode.INTERNAL_SERVER_ERROR, message, name: 'INTERNAL', data });
  }
}
