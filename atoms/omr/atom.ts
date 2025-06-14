import { TData, TUserManualData } from "@/types/personal/types";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "recoil-persist-atom",
  storage: sessionStorage,
});

export type omrAnswerType = {
  [key: string]: number | null;
};

// 지울거
// pending- 입력대기 , complete - 입력완료 , none - 미응시
export const omrAnswerState = atom<TUserManualData>({
  key: "omrAnswerState",
  default: {
    koAnswerId: null,
    mathAnswerId: null,
    enAnswerId: null,
    koHistoryAnswerId: null,
    firstExAnswerId: null,
    secondExAnswerId: null,
  },
  effects_UNSTABLE: [persistAtom],
});

// -------------------------------------------------
