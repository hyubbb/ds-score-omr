export type TAnswer = string | null;

export type TGroupManualUser = {
  users: {
    userId: string;
    answers: TAnswer[];
    selectedSubject: string;
  }[];
};
