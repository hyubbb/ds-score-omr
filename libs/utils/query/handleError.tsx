// handleError.ts
// 통합 에러를 처리하는데 사용되는 함수
// 서버 사이드에서 발생하는 에러는 typeof window === "undefined" 로 확인

import { errorState } from "@/atoms/atom";
import { setRecoil } from "recoil-nexus"; // Recoil Nexus 사용 추천 (비훅 환경에서 상태 변경 가능하게)

export function handleError({
  error,
  queryKey,
  type,
  url,
}: {
  error: any;
  queryKey?: string[];
  type?: string;
  url?: string;
}) {
  const status = error?.status || error?.response?.status;
  let errorType = type || null;
  let message = "에러가 발생했습니다.";

  if (typeof window === "undefined") {
    console.log(`[SSR 에러 로그] ${status}`);
    return { isAlertNeeded: false };
  }

  if (status === 400) {
    if (url === "/socket/receive/personal/record" || url === "/socket/cert-code/request-score") {
      return;
      message = "응시 이력 조회에 실패했습니다. \n 응시 코드를 확인해주세요.";
      errorType = "stay";
    } else if (url === "/socket/send/answer") {
      message = "이미 제출된 성적표 입니다.";
    } else {
      message = "잘못된 요청입니다.";
    }
  } else if (status === 401) {
    if (queryKey && queryKey?.join("_") === "personal_subjectStatus") {
      message = "응시 정보가 존재하지 않습니다.";
      errorType = "personal_subjectStatus";
    } else if (url === "/socket/cert-code/request-score") {
      message = "인증코드를 확인해주세요.";
    } else {
      message = "인증이 필요합니다.";
    }
  } else if (status === 404) {
    console.log(url);
    if (url === "/socket/receive/personal/record" || url === "/socket/cert-code/request-score") {
      message = "성적 제출에서 문제가 발생하였습니다.";
    } else {
      message = "데이터를 찾을 수 없습니다.";
    }
  } else if (status >= 500) {
    if (queryKey && queryKey?.join("_") === "personal_info") {
      message = "응시 정보가 존재하지 않습니다.";
      errorType = "personal_info";
    }
  } else {
    message = "서버 오류가 발생했습니다.";
  }

  // 여기서 바로 errorState 업데이트
  setRecoil(errorState, { isError: true, message, type: errorType });

  return { isAlertNeeded: true, message, type: errorType };
}
