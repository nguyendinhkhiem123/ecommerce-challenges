import jwtDecode from "jwt-decode";

const decodeToken = (token: string) => {
  try {
    if (token) return jwtDecode<any>(token || "");
    return null;
  } catch (error) {
    console.log("DECODE TOKEN ERROR", error);
    return null;
  }
};

export const getExpireDateFromToken = (token: string) => {
  const decode = decodeToken(token);
  const date = new Date((decode?.exp || 0) * 1000);
  return date;
};

export const isDecodableToken = (token: string): boolean => {
  if (!token) return false;
  const { id, exp } = decodeToken(token) || {};
  const isValidDate = new Date(Date.now()) < new Date(exp * 1000);
  return isValidDate && !!id;
};
