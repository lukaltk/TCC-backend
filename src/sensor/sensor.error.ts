import { HttpCode } from '../common/http.code'; 
import { HttpError, IHttpErrorArgs } from '../common/exceptions/http.error';

abstract class SensorError extends HttpError {
  constructor(args: IHttpErrorArgs) {
    super({ status: args.status, message: args.message, name: `SENSOR_ERROR-${args.name}`, data: args.data });
  }
}

export class InvalidParamsError extends SensorError {
  constructor(message = 'Invalid params', data?: object) {
    super({ status: HttpCode.UNPROCESSABLE_CONTENT, message, name: 'INVALID_PARAMS', data });
  }
}

export class NotFoundError extends SensorError {
  constructor(message = 'User not found', data?: object) {
    super({ status: HttpCode.NOT_FOUND, message, name: 'NOT_FOUND', data });
  }
}

export class ForbiddenActionError extends SensorError {
  constructor(message = 'Forbidden action.', data?: object) {
    super({ status: HttpCode.FORBIDDEN, message, name: 'FORBIDDEN_ACTION', data });
  }
}

export class InternalError extends SensorError {
  constructor(message = 'Internal error', data?: object) {
    super({ status: HttpCode.INTERNAL_SERVER_ERROR, message, name: 'INTERNAL', data });
  }
}
