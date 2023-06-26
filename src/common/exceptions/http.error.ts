import { HttpCode } from '../http.code';

export interface IHttpErrorArgs {
  name: string;
  status: HttpCode;
  message: string;
  data?: object;
}

export class HttpError extends Error {
  public readonly name: string;
  public readonly status: HttpCode;
  public readonly data?: object;

  constructor(args: IHttpErrorArgs) {
    super(args.message);

    this.name = args.name;
    this.status = args.status;
    if (args.data) this.data = args.data;
  }
}
