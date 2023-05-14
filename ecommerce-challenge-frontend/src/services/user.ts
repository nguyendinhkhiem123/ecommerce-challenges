import { AxiosResponse } from "axios";
import baseAxios from "../config/axios";
import { IUser, IUserResponse } from "../typings/user";
import {
  IUserDeleteResponse,
  IUserLoginParameter,
  IUserRegisterParameter,
  IUserUpdateParameter,
} from "../typings/userService";

class UserService {
  public register(
    body: IUserRegisterParameter
  ): Promise<AxiosResponse<IUserResponse>> {
    return baseAxios.post("/users", body);
  }
  public login(
    body: IUserLoginParameter
  ): Promise<AxiosResponse<IUserResponse>> {
    return baseAxios.post("/login", body);
  }
  public getInformationAboutYou(): Promise<AxiosResponse<IUserResponse>> {
    return baseAxios.get("/user");
  }
  public getAllUsers(): Promise<AxiosResponse<IUser[]>> {
    return baseAxios.get("/users");
  }
  public deleteUser(
    email: string
  ): Promise<AxiosResponse<IUserDeleteResponse>> {
    return baseAxios.delete(`/users/${email}`);
  }
  public updateUser(body: IUserUpdateParameter): Promise<AxiosResponse<IUser>> {
    return baseAxios.put(`/user`, body);
  }
}

export default new UserService();
