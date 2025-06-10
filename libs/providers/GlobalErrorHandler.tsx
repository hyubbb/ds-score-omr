// GlobalErrorHandler.tsx
// alert 창을 띄우는 역할
// errorState 상태를 사용하여 에러 상태를 관리
"use client";

import { useEffect } from "react";
import { useAlert } from "@/libs/hooks/useAlert";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { errorState } from "@/atoms/atom";
import { useRouter } from "next/navigation";

export default function GlobalErrorHandler() {
  const { openAlert, closeAlert } = useAlert();
  const router = useRouter();
  const error = useRecoilValue(errorState);
  const resetError = useResetRecoilState(errorState);

  useEffect(() => {
    if (error.isError && error.message) {
      openAlert({
        content: error.message,
        callBack: () => {
          if (error.type === "personal_info" || error.type === "notCode") {
            router.back();
          } else if (error.type == "shop") {
            router.push("https://dsdo.co.kr/");
          } else if (error.type == "stay") {
          } else {
            router.push("/");
          }
          closeAlert();
          resetError();
        },
        canClose: false,
      });
    }
  }, [error, openAlert, closeAlert, resetError]);

  return null;
}
