// (공통 API 호출 함수)
import { QueryClient } from "@tanstack/react-query";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

export const fetchWithQuery = async <T>(
  url: string,
  options?: RequestInit, // method, body, headers 등 전달 가능
): Promise<T> => {
  // error는 react-query에서 onError에서 처리하기 때문에 trycatch제거함.

  const res = await fetch(`${BASE_URL}${url}`, {
    method: "GET", // 기본값: GET
    ...options, // 전달된 옵션이 있으면 덮어쓰기
  });

  if (!res.ok) {
    const error = new Error(`Error: ${res.status} ${res.statusText}`);
    (error as any).response = { status: res.status }; // HTTP 상태 코드 추가
    throw error; // react query에서 처리하도록 던짐
  }
  return await res.json();
};
