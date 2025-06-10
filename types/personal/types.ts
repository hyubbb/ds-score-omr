export type TAnswer = string | null;

export type TMethods = {
  answers: TAnswer[];
  course?: string;
  course1?: string;
  course2?: string;
};

// omr 가공전의 데이터
export type TOmrList = {
  subject: string;
  subjectCode: string;
  subjectEn: string;
  examCode: string;
  birth: string;
  name: string[][] | null;
  koreanName: string[];
  questions: string[];
  gender?: string;
  course?: string;
  univCode1?: string[];
  univCode2?: string[];
};

// TOmrList의 타입을 omr의 형태로 가공
export type TData = {
  subject: string;
  subjectCode: string;
  subjectEn: string;
  examCode: string[];
  birth: string[];
  name: string[][] | null;
  koreanName: string[];
  answers: (string | string[])[];
  gender?: string;
  course?: string;
  univCode1?: string[];
  univCode2?: string[];
  status?: string;
};

// userInfo
export type TUserInfoType = {
  attemptId: number;
  userName: string;
  birthday: string;
  phoneNumber: string;
  examNumber: string;
  gender: string;
  koreanSubject: string;
  mathSubject: string;
  subFirstSubject: string;
  subSecondSubject: string;
  memberNo?: string;
};

export type TUserManualData = {
  koAnswerId: number | null;
  enAnswerId: number | null;
  mathAnswerId: number | null;
  koHistoryAnswerId: number | null;
  firstExAnswerId: number | null;
  secondExAnswerId: number | null;
};
