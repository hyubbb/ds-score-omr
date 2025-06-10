// queryClient.ts (전역적으로 React Query 설정)
// 에러는 handleError.tsx 에서 처리
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { handleError } from "./handleError";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any, query: any) => {
      console.log("queryClient onError 호출");
      handleError({ error, queryKey: query?.queryKey });

      // SSR인지 CSR인지 먼저 확인
      // const isCSR = typeof window !== "undefined";
      // console.log(`실행 환경: ${isCSR ? "CSR" : "SSR"}`);

      // if (typeof window === "undefined") {
      //   const result = handleError(error, query?.queryKey);
      //   console.log(`[SSR 에러 로그] `, result);
      //   // return { isAlertNeeded: false }; // 서버에서는 alert 같은거 안함
      // }

      // if (error.response) {
      //   // csr의 경우는 <GlobalErrorHandler/> 여기서 처리함
      //   if (typeof window == "undefined") {
      //     // 서버에서 실행된 경우 (SSR) → 페이지 이동 처리
      //     // throw error; // 이걸쓰면 ErrorBoundary에서 감지하도록 던짐
      //     // error page로 route 할거임
      //     redirect("/");
      //   }
      // } else {
      //   // 네트워크 오류 또는 서버 응답 없음
      //   if (typeof window !== "undefined") {
      //     alert("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.");
      //     // 클라이언트에서 실행된 경우 (CSR)
      //     redirect("/");
      //   } else {
      //     // 서버에서 실행된 경우 (SSR) → 페이지 이동 처리
      //     // throw error; // 이걸쓰면 ErrorBoundary에서 감지하도록 던짐
      //     // error page로 route 할거임
      //     redirect("/");
      //   }
      // }
    },
  }),
});
