import Cookies from "universal-cookie";
import { TOKEN } from "../common/constants/cookies";
import { getExpireDateFromToken } from "./token.utils";

const cookies = new Cookies();

export const getTokenFromCookie = (key: string): string => {
  return cookies.get(key);
};

export const setTokenIntoCookie = (key: string, token: string) => {
  return cookies.set(key, token, {
    path: "/",
    expires: getExpireDateFromToken(token),
  });
};

export const removeTokenInCookie = (key: string) => {
  try {
    cookies.remove(TOKEN, { path: "/" });
  } catch (err) {
    console.log(err);
  }
};
