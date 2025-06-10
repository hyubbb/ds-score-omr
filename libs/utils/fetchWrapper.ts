import { handleError } from "./query/handleError";

class FetchWrapper {
  constructor(private baseUrl: string) {}

  async request(url: string, options: RequestInit = {}) {
    try {
      const contentType =
        options.method === "GET" || options.method === "DELETE"
          ? "text/plain"
          : "application/json";
      const response = await fetch(`${this.baseUrl}${url}`, {
        ...options,
        headers: {
          "Content-Type": contentType,
          ...options.headers,
        },
      });

      // if (!response.ok) {
      //   const errorData = await response.json().catch(() => null);
      //   throw {
      //     status: response.status,
      //     message: response.statusText,
      //     data: errorData,
      //   };
      // }

      if (!response.ok) {
        const error = { status: response.status, message: response.statusText };
        throw error;
      }

      const hasContent = response.headers.get("content-type");
      if (hasContent && hasContent.includes("application/json")) {
        return response.json();
      }
      return response.text();
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      // handleFetchError(error); // 일반 fetch 에러 핸들링
      // throw error; // 필요 시 상위에서 추가 처리 가능

      handleError({ error, url }); // 이러면 Recoil 상태가 자동으로 업데이트됨
      throw error; // 필요하다면 다시 throw
    }
  }

  get(url: string) {
    return this.request(url);
  }

  post(url: string, data: any) {
    return this.request(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  put(url: string, data: any) {
    return this.request(url, { method: "PUT", body: JSON.stringify(data) });
  }

  delete(url: string) {
    return this.request(url, { method: "DELETE" });
  }
}

export const fetchWrapper = new FetchWrapper(
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
);

// ✅ 일반 fetch 요청 에러 핸들링 함수
// function handleFetchError(error: any) {
//   if (typeof window !== "undefined") {
//     if (error.status === 401) {
//       alert("인증 오류 (401) - 로그인 필요");
//       window.location.href = "/login";
//     } else if (error.status === 403) {
//       alert("권한 없음 (403)");
//     } else if (error.status === 404) {
//       alert("데이터를 찾을 수 없습니다 (404)");
//     } else if (error.status >= 500) {
//       alert("서버 오류 발생 (500)");
//     } else {
//       alert("알 수 없는 오류 발생");
//     }
//   }
// }

function handleFetchError(error: any) {
  const result = handleError(error);

  if (typeof window !== "undefined") {
    if (result.isAlertNeeded) {
      // globalErrorStore.set(result); // 전역 상태에 저장
      // 전역 상태로 에러 alert 처리
    }
  }
}
