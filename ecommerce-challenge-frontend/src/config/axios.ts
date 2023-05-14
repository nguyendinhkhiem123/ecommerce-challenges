import { BASE_URL_API } from "@/common/constants/api";
import { TOKEN } from "@/common/constants/cookies";
import axios from "axios";
import { getTokenFromCookie } from "../utils/cookie.utils";

const baseAxios = axios.create({
  baseURL: BASE_URL_API,
  headers: {
    "content-type": "application/json",
  },
});

baseAxios.interceptors.request.use(
  function (config) {
    const token = getTokenFromCookie(TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

baseAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default baseAxios;
