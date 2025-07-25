import { TUserInfoType, TUserManualData } from "@/types/personal/types";
import { JSX } from "react";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "recoil-persist-atom",
  storage: sessionStorage,
});

export const userAttemptIdState = atom<number | null>({
  key: "userAttemptId",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const userManualDataState = atom<TUserManualData>({
  key: "userManualData",
  default: {
    koAnswerId: null,
    enAnswerId: null,
    mathAnswerId: null,
    koHistoryAnswerId: null,
    firstExAnswerId: null,
    secondExAnswerId: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export const userInfoState = atom<TUserInfoType>({
  key: "userInfo",
  default: {
    memberNo: "1",
    attemptId: 1,
    userName: "전병훈",
    birthday: "1990-11-09",
    phoneNumber: "01041257216",
    examNumber: "010013",
    gender: "MALE",
    koreanSubject: "LANGUAGE_MEDIA",
    mathSubject: "PROBABILITY_STATISTICS",
    subFirstSubject: "LIFE_ETHICS",
    subSecondSubject: "PHYSICS_I",
  },
  effects_UNSTABLE: [persistAtom],
});
