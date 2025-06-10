import { http } from "../http.interceptors.request";

http.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  },
);
