import { deleteCookie } from "cookies-next";
import { redirect } from "next/navigation";

import { setAccessToken } from "../utils/manageCookie";

import AuthService from "../../service/AuthService";
import { http } from "./http.interceptors.request";

export const redirectToLogin = () => {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
  redirect("/logout");
};

const responseInterceptors =
  (axiosInstance: any) =>
  async (error: {
    config: any;
    response: {
      data: {
        code: number;
        message: string;
      };
    };
  }) => {
    const originalRequest = error.config;

    if (error.response && error.response.data.code === 401) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const response = await AuthService.getRefreshToken();

          if (response.data.code === 200) {
            const newAccessToken = response.data.data.access_token;
            const newRefreshToken = response.data.data.refresh_token;
            setAccessToken("accessToken", newAccessToken);
            setAccessToken("refreshToken", newRefreshToken);

            http.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

            originalRequest.headers["Authorization"] =
              `Bearer ${newAccessToken}`;

            return axiosInstance(originalRequest);
          } else {
            redirectToLogin();
          }
        } catch (error) {
          redirectToLogin();
        }
      }
    } else if (
      (error.response && error.response.data.code === 400) ||
      (error.response && error.response.data.code === 403)
    ) {
      const errorMessage = error.response; // 에러 메시지를 가져옴
      return errorMessage;
    }

    return Promise.reject(error);
  };

export default responseInterceptors;
