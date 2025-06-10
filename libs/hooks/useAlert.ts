import { useCallback } from "react";

import { useRecoilState } from "recoil";

import { alertState } from "@/atoms/atom";
import { IAlert } from "@/types/interface/components/Alert";
import { TAlertData } from "@/types/type/components/Alert";

// 얼럿창 전체 상태관리
export const useAlert = () => {
  const [alertDataState, setAlertDataState] = useRecoilState(alertState);

  // 얼럿 닫기
  const closeAlert = useCallback(
    () =>
      setAlertDataState((prev: IAlert) => {
        return { ...prev, isOpen: false };
      }),
    [setAlertDataState],
  );

  //얼럿 열기
  const openAlert = useCallback(
    ({ content, callBack, isCancel, canClose = true, btnLabel }: TAlertData) =>
      setAlertDataState({
        isOpen: true,
        content: content,
        isCancel: isCancel,
        callBack: callBack,
        canClose: canClose,
        btnLabel: btnLabel,
      }),
    [setAlertDataState],
  );

  return { alertDataState, closeAlert, openAlert };
};
