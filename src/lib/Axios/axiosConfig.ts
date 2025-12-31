import { logoutUser, refreshAccessToken } from "@/API/auth";
import type { ApiError } from "@/types";
import axios, { AxiosError } from "axios";
import type { FailedRequestItem } from "..";

declare module "axios" {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

axios.defaults.withCredentials = true;

let isRefreshing = false;
const failedQueue: FailedRequestItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue.length = 0;
};

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

export const refresh = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<ApiError>) => {
    const orgRequest = error.config;
    const currentUrl = window.location.href;
    const ExcludedRoute = ["/sign-in", "/sign-up"];

    const isExcluded = ExcludedRoute.some((route) =>
      currentUrl.includes(route)
    );

    if (error.response?.status === 401 && !orgRequest?._retry && !isExcluded) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(orgRequest!);
          })
          .catch((error) => {
            return Promise.reject(error);
          });
      }

      isRefreshing = true;
      orgRequest!._retry = true;

      return new Promise((resolve, reject) => {
        refreshAccessToken()
          .then(() => {
            processQueue(null);
            resolve(api(orgRequest!));
          })
          .catch((error) => {
            processQueue(error, null);
            logoutUser();
            reject(error);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
