import { deleteCookie } from "cookies-next";
import { useSetRecoilState } from "recoil";

import { isLoadingState } from "@/atoms/atom";
import { TAlertData } from "@/types/type/components/Alert";

import { ACCESSTOKEN, REFRESHTOKEN } from "../constant/common";

import { useAlert } from "./useAlert";

// 에러 받아서 핸들링
export const useErrorHandle = () => {
  const setIsLoading = useSetRecoilState(isLoadingState);
  const { openAlert, closeAlert } = useAlert();

  const errorHandler = (e: any, options?: () => void) => {
    const {
      response: {
        data: { message, error },
        status,
      },
    } = e;
    const alertData: TAlertData = {
      content: status !== 500 ? message : `에러가 발생했습니다. \n ${error}`,
      isCancel: false,
      callBack: () => {
        options && options();
        closeAlert();
      },
    };
    setIsLoading(false);
    openAlert(alertData);
  };

  const stringErrorHandler = (mention: string) => {
    const alertData: TAlertData = {
      content: mention,
      isCancel: false,
      callBack: () => closeAlert(),
    };
    setIsLoading(false);
    openAlert(alertData);
  };

  return { errorHandler, stringErrorHandler };
};

export const removeCookies = () => {
  deleteCookie(ACCESSTOKEN, { path: "/" });
  deleteCookie(REFRESHTOKEN, { path: "/" });
  // deleteCookie(NICKNAME, { path: '/' });
  // deleteCookie(ISREMEMBER, { path: '/' });
  // deleteCookie(ACCOUNT, { path: '/' });
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "/";
};
