import { ExamCode, examCodeState } from "@/atoms/group/atom";
import { useRecoilState } from "recoil";

export const useExamCode = () => {
  const [examCodeData, setExamCodeData] = useRecoilState(examCodeState);

  // 응시 코드 추가
  const addExamCodes = (newCodes: ExamCode[]) => {
    setExamCodeData((prev) => ({
      count: newCodes.length,
      codes: newCodes,
    }));
  };

  // 응시 코드 초기화
  const resetExamCodes = () => {
    setExamCodeData({
      count: 0,
      codes: [],
    });
  };

  return { examCodeData, addExamCodes, resetExamCodes };
};
