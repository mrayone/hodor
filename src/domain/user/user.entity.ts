export class User {
  private _id: number;
  private _email: string;
  private _uuid: string;
  private _password: string;
  private _isActive: boolean;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor({
    id,
    email,
    uuid,
    password,
    isActive,
    createdAt,
    updatedAt,
  }:
    | {
        id?: number;
        email?: string;
        uuid?: string;
        password?: string;
        isActive?: boolean;
        createdAt?: Date;
        updatedAt?: Date;
      }
    | undefined) {
    this._id = id;
    this._email = email;
    this._uuid = uuid;
    this._password = password;
    this._isActive = isActive;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  public get email() {
    return this._email;
  }

  public set email(email: string) {
    this._email = email;
  }

  public get id() {
    return this._id;
  }

  public get uuid() {
    return this._uuid;
  }

  public get password() {
    return this._password;
  }

  public set password(password: string) {
    this._password = password;
  }

  public get isActive() {
    return this._isActive;
  }

  public set isActive(isActive: boolean) {
    this._isActive = isActive;
  }

  public get createdAt() {
    return this._createdAt;
  }

  public get updatedAt() {
    return this._updatedAt;
  }
}
