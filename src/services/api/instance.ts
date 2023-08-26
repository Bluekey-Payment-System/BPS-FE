/* eslint-disable no-console */
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosInstance,
} from "axios";

import { getCookie } from "@/utils/cookies";

export const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
  timeout: 30000,
});

/* request interceptors */
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    /**
     * request 직전 공통으로 진행할 작업
     */
    // TODO: 로컬 스토리지에서 토큰 가져와서 아래에 설정
    // config.headers.Authorization = `Bearer ${token}`;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const token = getCookie("token");
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
    if (process.env.NODE_ENV === "development") {
      const { method, url } = config;
      console.log(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`);
    }

    return config;
  },

  /**
   * request 에러 시 작업
   */
  (error: AxiosError | Error): Promise<AxiosError> => { return Promise.reject(error); },
);

/* response interceptors */
instance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    /**
     * http status가 20X이고, http response가 then으로 넘어가기 직전 호출
     */
    if (process.env.NODE_ENV === "development") {
      const { method, url } = response.config;
      const { status } = response;
      console.log(`🚁 [API] ${method?.toUpperCase()} ${url} | Response ${status}`);
    }

    return response;
  },
  (error: AxiosError | Error): Promise<AxiosError> => {
    /**
     * http status가 20X가 아니고, http response가 catch로 넘어가기 직전 호출
     */
    if (process.env.NODE_ENV === "development") {
      if (axios.isAxiosError(error)) {
        const { message } = error;
        const { method, url } = error.config as InternalAxiosRequestConfig;
        const { status, statusText } = error.response as AxiosResponse;

        console.log(`🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${statusText} | ${message}`);
      } else {
        console.log(`🚨 [API] | Error ${error.message}`);
      }
    }
    return Promise.reject(error);
  },
);
