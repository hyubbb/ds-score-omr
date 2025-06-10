import { useCallback } from "react";

import { useRecoilState } from "recoil";

import { modalState } from "@/atoms/atom";

export type OpenModalType = {
  title?: string;
  content: JSX.Element | string;
  isBtn?: boolean;
  btnName?: string;
  callback?: () => void;
  onReset?: () => void;
  renderCount?: number;
  canClose?: boolean;
  isCancelBtn?: boolean;
};

// 모달창 전체 상태관리
export const useModal = () => {
  const [modalDataState, setModalDataState] = useRecoilState(modalState);
  // 모달 닫기
  const closeModal = useCallback(
    () =>
      setModalDataState((prev) => {
        return { ...prev, isOpen: false };
      }),
    [setModalDataState],
  );

  // 모달 열기
  const openModal = useCallback(
    ({
      title,
      content,
      callback,
      onReset,
      isBtn,
      btnName,
      renderCount = 0,
      canClose = true,
      isCancelBtn,
    }: OpenModalType) =>
      setModalDataState({
        isOpen: true,
        isBtn: isBtn,
        title: title || "",
        content,
        callBack: callback,
        onReset,
        btnName,
        renderCount,
        canClose: canClose,
        isCancelBtn: isCancelBtn,
      }),
    [setModalDataState],
  );

  return { modalDataState, closeModal, openModal };
};
