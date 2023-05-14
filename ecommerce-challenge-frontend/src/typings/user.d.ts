export interface IUser {
  id: number;
  email: string;
  username: string;
  bio: string;
  image: string;
  token: string;
}

export interface IUserResponse {
  user: IUser;
}
