import axios from "axios";

import fetchDataResponse from "./response/fetchData.interceptors.response";
import authResponse from "./response/auth.interceptors.response";

const http = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_MOCK_URL}`,
  headers: {
    "Content-type": "application/json",
  },
});

const httpWithAuth = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    "Content-type": "application/json",
  },
});

// 데이터 패칭 관련 에러 인터셉터 (데이터페치 API 에러 먼저 처리)
http.interceptors.response.use((response) => response, fetchDataResponse(http));

// 로그인 관련 토큰 인터셉터 (토큰 처리)
httpWithAuth.interceptors.response.use(undefined, authResponse(httpWithAuth));

export { http, httpWithAuth };
