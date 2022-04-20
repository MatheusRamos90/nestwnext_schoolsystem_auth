import cookie from "cookie";
import Cookies from "js-cookie";

export const ACCESS_TOKEN = 'access_token'

export const parseCookies = (req?: any) => {
    if (!req || !req.headers) {
      return {};
    }
  
    return cookie.parse(req.headers.cookie || "");
}

export const setToken = (data: any) => {
    Cookies.set(ACCESS_TOKEN, data.access_token)
}

export const getToken = () => {
    return Cookies.get(ACCESS_TOKEN)
}

export const isTokenExpired = (token: string) => {
    const payload = getPayload(token);
  
    const clockTimestamp = Math.floor(Date.now() / 1000);
  
    return clockTimestamp > payload.exp;
}
  
export const getPayload = (token: string) => {
    return JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString("utf8")
    );
}

export const clearCookies = () => {
    Cookies.remove(ACCESS_TOKEN)
}

