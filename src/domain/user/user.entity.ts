export class User {
  private _id: number;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _uuid: string;
  private _password: string;
  private _status: boolean;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor({
    id,
    email,
    firstName,
    lastName,
    uuid,
    password,
    status,
    createdAt,
    updatedAt,
  }:
    | {
        id?: number;
        firstName: string;
        lastName: string;
        email: string;
        uuid?: string;
        password?: string;
        status?: boolean;
        createdAt?: Date;
        updatedAt?: Date;
      }
    | undefined) {
    this._id = id;
    this._email = email;
    this._firstName = firstName;
    this._lastName = lastName;
    this._uuid = uuid;
    this._password = password;
    this._status = status;
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

  public get firstName() {
    return this._firstName;
  }

  public set firstName(firstName: string) {
    this._firstName = firstName;
  }

  public get lastName() {
    return this._lastName;
  }

  public get fullName() {
    return `${this._firstName} ${this._lastName}`;
  }

  public set lastName(lastName: string) {
    this._lastName = lastName;
  }

  public get status() {
    return this._status;
  }

  public set status(status: boolean) {
    this._status = status;
  }

  public get createdAt() {
    return this._createdAt;
  }

  public get updatedAt() {
    return this._updatedAt;
  }
}
