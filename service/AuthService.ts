import { getCookie } from "cookies-next";

import { REFRESHTOKEN } from "@/libs/constant/common";
import { IAxiosResponse } from "@/types/interface/common";
import { IReqAuthLogin } from "@/types/interface/parameter/Auth";
import { http, httpWithAuth } from "@/libs/http/http.interceptors.request";

// 기본 로그인
const postLogin = (body: IReqAuthLogin) => {
  return http.post<IAxiosResponse>(`/auth/user/login`, body);
};

// 기본 로그아웃
const getLogout = () => {
  return http.get<IAxiosResponse>(`/auth/user/logout`);
};

// 엑세스 토큰 재발급
const getRefreshToken = async () => {
  try {
    const refreshToken = getCookie(REFRESHTOKEN, { path: "/" });
    const response = await httpWithAuth.get(`/auth/token/refresh`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    return response;
  } catch (error) {
    throw new Error("Failed to refresh token");
  }
};

const AuthService = {
  postLogin,
  getLogout,
  getRefreshToken,
};

export default AuthService;
