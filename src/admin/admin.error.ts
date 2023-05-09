import { HttpCode } from '../common/http.code'; 
import { HttpError, IHttpErrorArgs } from '../common/exceptions/http.error';

abstract class AdminError extends HttpError {
  constructor(args: IHttpErrorArgs) {
    super({ status: args.status, message: args.message, name: `ADMIN_ERROR-${args.name}`, data: args.data });
  }
}

export class InvalidParamsError extends AdminError {
  constructor(message = 'Invalid params.', data?: object) {
    super({ status: HttpCode.UNPROCESSABLE_CONTENT, message, name: 'INVALID_PARAMS', data });
  }
}

export class AlreadyExistsError extends AdminError {
  constructor(message = 'Admin already exists.', data?: object) {
    super({ status: HttpCode.BAD_REQUEST, message, name: 'ALREADY_EXISTS', data });
  }
}

export class TokenNotFoundError extends AdminError {
  constructor(message = 'Token not found.', data?: object) {
    super({ status: HttpCode.BAD_REQUEST, message, name: 'TOKEN_NOT_FOUND', data });
  }
}
export class ForbiddenActionError extends AdminError {
  constructor(message = 'Forbidden action.', data?: object) {
    super({ status: HttpCode.FORBIDDEN, message, name: 'FORBIDDEN_ACTION', data });
  }
}
export class NotFoundError extends AdminError {
  constructor(message = 'User not found.', data?: object) {
    super({ status: HttpCode.NOT_FOUND, message, name: 'NOT_FOUND', data });
  }
}

export class NotAdminError extends AdminError {
  constructor(message = 'The user is not an administrator.', data?: object) {
    super({ status: HttpCode.UNAUTHORIZED, message, name: 'NOT_ADMIN', data})
  }
}

export class InternalError extends AdminError {
  constructor(message = 'Internal error.', data?: object) {
    super({ status: HttpCode.INTERNAL_SERVER_ERROR, message, name: 'INTERNAL', data });
  }
}
