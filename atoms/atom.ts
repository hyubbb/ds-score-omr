import { JSX } from "react";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "recoil-persist-atom",
  storage: sessionStorage,
});

type alertType = {
  isOpen: boolean;
  content: JSX.Element | string;
  isCancel?: boolean;
  callBack?: () => void;
  btnLabel?: string;
  canClose?: boolean;
};

export const alertState = atom<alertType>({
  key: "alertState",
  default: {
    isOpen: false,
    isCancel: false,
    content: "",
    btnLabel: "",
    canClose: true,
  },
});

type modalType = {
  isOpen: boolean;
  title: string;
  content: JSX.Element | string;
  isBtn?: boolean;
  btnName?: string;
  callBack?: () => void;
  onReset?: () => void;
  renderCount: number;
  canClose?: boolean;
  isCancelBtn?: boolean;
};

export const modalState = atom<modalType>({
  key: "modalState",
  default: {
    isOpen: false,
    isBtn: false,
    title: "",
    content: "",
    btnName: "확인",
    renderCount: 0,
    canClose: false,
    isCancelBtn: false,
  },
});

export const isLoadingState = atom<boolean>({
  key: "isLoadingState",
  default: false,
});

export const errorState = atom<{
  isError: boolean;
  message: string | null;
  type?: string | null;
}>({
  key: "globalErrorState",
  default: {
    isError: false,
    message: null,
    type: null,
  },
});
