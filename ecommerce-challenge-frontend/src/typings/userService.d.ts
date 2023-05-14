import { IUser } from "./user";

export interface IUserRegisterParameter {
  username: string;
  email: string;
  password: string;
}

export interface IUserLoginParameter {
  email: string;
  password: string;
}

export interface IUserDeleteResponse {
  raw: IUser[];
}

export interface IUserUpdateParameter {
  email: string;
  username: string;
  bio: string;
  image: string;
}
