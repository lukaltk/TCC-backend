export enum Role {
  ADMIN = 'admin',
  USER = 'user'
}

type TypeRole = `${Role}`;

export default class User {
  private _id: string;
  private _email: string;
  private _password: string;
  private _role?: TypeRole;

  constructor(_id: string, _email: string, _password: string, _role?: TypeRole) {
    this._id = _id;
    this._email = _email;
    this._password = _password;
    this._role = _role ?? 'user';
  }

  get id() {
    return this._id;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  get role() {
    return this._role;
  }
}

