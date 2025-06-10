import { useQuery } from "@tanstack/react-query";
import ExamService from "../../service/group/ExamCodeService";

// (R)단체 - 응시코드 목록조회
export const useGetExamCodeList = (queryBody: any) => {
  return useQuery({
    queryKey: ["ExamCodeList", queryBody],
    queryFn: () => ExamService.getGroupExamCodeList(queryBody),
  });
};
