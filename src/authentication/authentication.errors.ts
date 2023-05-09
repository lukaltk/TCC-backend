import { HttpCode } from '../common/http.code';
import { HttpError, IHttpErrorArgs } from '../common/exceptions/http.error';

export abstract class AuthenticationError extends HttpError {
  constructor(args: IHttpErrorArgs) {
    super({ status: args.status, message: args.message, name: `AUTHENTICATION_ERROR-${args.name}`, data: args.data });
  }
}

export class TokenExpired extends AuthenticationError {
  constructor(message = 'Token already expired.', data?: object) {
    super({ status: HttpCode.UNAUTHORIZED, message, name: 'TOKEN_EXPIRED', data });
  }
}
export class TokenNotValid extends AuthenticationError {
  constructor(message = 'Decoding token failed., token not valid.', data?: object) {
    super({ status: HttpCode.UNAUTHORIZED, message, name: 'TOKEN_NOT_VALID', data });
  }
}
export class ParamNotFoundError extends AuthenticationError {
  constructor(message = 'Required param not found.', data?: object) {
    super({ status: HttpCode.BAD_REQUEST, message, name: 'PARAM_NOT_FOUND', data });
  }
}
export class TokenNotFoundError extends AuthenticationError {
  constructor(message = 'Token not found.', data?: object) {
    super({ status: HttpCode.UNAUTHORIZED, message, name: 'TOKEN_NOT_FOUND', data });
  }
}
export class UserNotFoundError extends AuthenticationError {
  constructor(message = 'User not found.', data?: object) {
    super({ status: HttpCode.NOT_FOUND, message, name: 'USER_NOT_FOUND', data });
  }
}

export class WrongEmailOrPassword extends AuthenticationError {
  constructor(message = 'Wrong email or password.', data?: object) {
    super({ status: HttpCode.NOT_FOUND, message, name: 'WRONG_EMAIL_OR_PASSWORD', data });
  }
}

export class InternalError extends AuthenticationError {
  constructor(message = 'Internal error.', data?: object) {
    super({ status: HttpCode.INTERNAL_SERVER_ERROR, message, name: 'INTERNAL', data });
  }
}
