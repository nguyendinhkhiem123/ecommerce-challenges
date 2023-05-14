import UserServices from "@/services/user";
import { IUser, IUserResponse } from "@/typings/user";
import Events from "events";
import { TOKEN } from "../common/constants/cookies";
import {
  getTokenFromCookie,
  removeTokenInCookie,
  setTokenIntoCookie,
} from "./cookie.utils";
import { isDecodableToken } from "./token.utils";

const events = new Events();

export const AUTH_UPDATE = "auth-update";
export const AUTH_LOGOUT = "auth-logout";

export class Auth {
  private _loading: boolean;
  private _userProfile: IUser | null;
  private _isAuth: boolean;

  constructor() {
    this._isAuth = false;
    this._userProfile = null;
    this._loading = false;
    const token = getTokenFromCookie(TOKEN);
    const isValidToken = isDecodableToken(token);
    if (isValidToken) {
      this._isAuth = true;
      this.getYourProfile();
    } else {
      this.logout();
    }
  }

  get isAuth() {
    return this._isAuth;
  }

  get userProfile() {
    return this._userProfile;
  }

  get loading() {
    return this._loading;
  }

  public logout() {
    removeTokenInCookie(TOKEN);
    this._isAuth = false;
    this._userProfile = null;
    events.emit(AUTH_LOGOUT);
  }

  public setAccount(userResponse: IUserResponse) {
    setTokenIntoCookie(TOKEN, userResponse.user.token);
    this._isAuth = true;
    this._userProfile = userResponse.user;
    this.getYourProfile();
    events.emit(AUTH_UPDATE);
  }

  public onUpdate = (cb: () => void) => {
    events.on(AUTH_UPDATE, () => {
      cb();
    });
  };

  public onLogout = (cb: () => void) => {
    events.on(AUTH_LOGOUT, () => {
      cb();
    });
  };

  public getYourProfile = async () => {
    try {
      this._loading = true;
      const response = await UserServices.getInformationAboutYou();
      const { user } = response.data;
      this._userProfile = user;
      events.emit(AUTH_UPDATE);
    } catch (err) {
      console.log(err);
    } finally {
      this._loading = false;
    }
  };
}

globalThis.auth = new Auth();
export {};
