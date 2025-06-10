import { TData, TOmrList } from "@/types/personal/types";
import { JSX } from "react";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "recoil-persist-atom",
  storage: sessionStorage,
});

export type answerStatusType = {
  [key: string]: "pending" | "complete" | "none";
};

type subjectAnswerType = {
  [key: string]: {
    type: string;
    answer: Array<number | null>;
    status: "pending" | "complete" | "none";
  };
};

// 지울거
// pending- 입력대기 , complete - 입력완료 , none - 미응시
export const answerStatusState = atom<answerStatusType>({
  key: "answerStatusState",
  default: {
    korean: "pending",
    math: "pending",
    english: "pending",
    history: "pending",
    inquiry: "pending",
  },
  effects: [persistAtom],
});

// 지울거
export const subjectAnswerState = atom<subjectAnswerType>({
  key: "subjectAnswerState",
  default: {
    korean: {
      type: "1",
      answer: Array.from({ length: 45 }, () => null),
      status: "pending",
    },
    math: {
      type: "1",
      answer: Array.from({ length: 30 }, () => null),
      status: "pending",
    },
    english: {
      type: "3",
      answer: Array.from({ length: 20 }, () => null),
      status: "pending",
    },
    history: {
      type: "4",
      answer: Array.from({ length: 20 }, () => null),
      status: "pending",
    },
    society: {
      type: "11",
      answer: Array.from({ length: 20 }, () => null),
      status: "pending",
    },
    science: {
      type: "21",
      answer: Array.from({ length: 20 }, () => null),
      status: "pending",
    },
  },
  effects: [persistAtom],
});

export const omrListDataState = atom<TData[]>({
  key: "omrListDataState",
  default: [],
  effects: [persistAtom],
});

type groupUserInfoType = {
  name: string;
  birth: string;
  gender: string;
  classNumber: string;
  studentNumber: string;
  subject: subjectAnswerType;
};

// pending- 입력대기 , complete - 입력완료 , none - 미응시
export const groupUserInfoState = atom<groupUserInfoType>({
  key: "groupUserInfoState",
  default: {
    name: "",
    birth: "",
    gender: "",
    classNumber: "",
    studentNumber: "",
    subject: {
      korean: {
        type: "",
        answer: Array.from({ length: 45 }, () => null),
        status: "pending",
      },
      math: {
        type: "",
        answer: Array.from({ length: 30 }, () => null),
        status: "pending",
      },
      english: {
        type: "",
        answer: Array.from({ length: 20 }, () => null),
        status: "pending",
      },
      history: {
        type: "",
        answer: Array.from({ length: 20 }, () => null),
        status: "pending",
      },
      society: {
        type: "",
        answer: Array.from({ length: 20 }, () => null),
        status: "pending",
      },
      science: {
        type: "",
        answer: Array.from({ length: 20 }, () => null),
        status: "pending",
      },
    },
  },
  effects: [persistAtom],
});
