import { getAccessToken } from "@/libs/utils/manageCookie";
import { httpWithAuth } from "../http.interceptors.request";

httpWithAuth.interceptors.request.use(
  (config: any) => {
    const accessToken = getAccessToken("accessToken");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: any) => {
    Promise.reject(error);
  },
);
