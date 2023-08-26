import { Cookies } from "react-cookie";

import { CookieSetOptions } from "@/types/cookies.type";

const cookies = new Cookies();

export const setCookie = (name: string, value: string, options?: CookieSetOptions) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return cookies.get(name);
};

export const removeCookie = (name: string) => {
  return cookies.remove(name);
};
