import { TGroupManualList } from "@/types/group/types";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

export type ExamCode = {
  id: number;
  registrationCode: string;
  codeStatus: string;
  codeType: string;
};
const { persistAtom } = recoilPersist({
  key: "recoil-persist-atom",
  storage: sessionStorage,
});

export const examCodeState = atom<{
  count: number;
  codes: ExamCode[];
}>({
  key: "examCodeState",
  default: {
    count: 0, // 선택한 응시 코드 개수
    codes: [], // 선택된 응시 코드 목록
  },
});

//attemptId 값도 저장 해야될 듯
export const groupManualListState = atom<TGroupManualList[]>({
  key: "groupManualListState",
  default: [],
});

export interface TGroupDetail {
  mrgCd: string;
  mockExamId: number;
  mockExamName: string;
  grade: string;
}

export const groupDetailState = atom<TGroupDetail>({
  key: "groupDetailState",
  default: {
    mrgCd: "",
    mockExamId: 0,
    mockExamName: "",
    grade: "",
  },
  effects_UNSTABLE: [persistAtom],
});
