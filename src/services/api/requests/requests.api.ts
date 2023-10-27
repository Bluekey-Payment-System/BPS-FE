import {
  AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig,
} from "axios";

import { instance } from "../instance";

/* get 요청 */
export const getRequest = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await instance.get<T>(
    url,
    config as InternalAxiosRequestConfig,
  );
  return response.data;
};

// /* post 요청 */
export const postRequest = async <T, D>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await instance.post<T, AxiosResponse<T>, D>(
    url,
    data,
    config as InternalAxiosRequestConfig,
  );
  return response.data;
};

/* delete 요청 */
export const deleteRequest = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await instance.delete<T>(
    url,
    config as InternalAxiosRequestConfig,
  );
  return response.data;
};

/* patch 요청 */
export const patchRequest = async <T, D=unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await instance.patch<T, AxiosResponse<T>, D>(
    url,
    data,
    config as InternalAxiosRequestConfig,
  );
  return response.data;
};
