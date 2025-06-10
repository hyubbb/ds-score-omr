import { JSX } from "react";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "recoil-persist-atom",
  storage: sessionStorage,
});

// [성별, 반, 번호, 계열, 응시과목, 답안입력 방식]
export type applyInfoDataType = {
  registrationCode: string;
  hakcd: string;
  track: string;
  koreanSubject: string;
  mathSubject: string;
  englishSubject: string;
  koreanHistory: string;
  subFirstSubject: string;
  subSecondSubject: string;
  firstChoiceUniversity: {
    universityName: string;
    universityCode: string;
    departmentName: string;
    departmentCode: string;
  };
  secondChoiceUniversity: {
    universityName: string;
    universityCode: string;
    departmentName: string;
    departmentCode: string;
  };
  answerMethod: string;
  mockExamName: string;
  grade: string;
  userName: string;
  birthday: string;
  memberNo: string;
  gender: string;
  classNumber: string;
  studentNumber: string;
  phoneNumber: string;
};

export const applyInfoData = atom<applyInfoDataType>({
  key: "applyInfoData",
  default: {
    registrationCode: "",
    hakcd: "",
    track: "",
    koreanSubject: "",
    mathSubject: "",
    englishSubject: "",
    koreanHistory: "",
    subFirstSubject: "",
    subSecondSubject: "",
    firstChoiceUniversity: {
      universityName: "",
      universityCode: "",
      departmentName: "",
      departmentCode: "",
    },
    secondChoiceUniversity: {
      universityName: "",
      universityCode: "",
      departmentName: "",
      departmentCode: "",
    },
    answerMethod: "",
    mockExamName: "",
    grade: "",
    userName: "",
    birthday: "",
    memberNo: "",
    gender: "",
    classNumber: "",
    studentNumber: "",
    phoneNumber: "",
  },
  effects: [persistAtom],
});
