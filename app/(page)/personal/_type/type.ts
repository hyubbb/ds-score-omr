export interface IAnswer {
  id: number;
  attemptId: number;
  answers: string[];
}

export type TFetchAnswer = {
  status: number;
  data: IAnswer | null;
};
