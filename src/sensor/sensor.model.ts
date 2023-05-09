export default class Sensor {
  private _id: string;
  private _userId: string;

  constructor(_id: string, userId: string) {
    this._id = _id;
    this._userId = userId;
  }

  get id() {
    return this._id;
  }

  get user() {
    return this._userId;
  }
}

