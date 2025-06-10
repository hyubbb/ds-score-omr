import { http } from "@/libs/http/http.interceptors.request";
import axios from "axios";

// const examCode = "/api/v1/fo-user"; //실제 요청
const examCode = "/api/mock"; //라우트 핸들러 목데이터 요청 용 !!!

// 응시코드 목록 조회
const getGroupExamCodeList = async (params?: Record<string, any>) => {
  try {
    // const response = await http.get<any>(
    //   `${examCode}/mock-exam-code/organization-code`,
    //   { params },
    // );
    const response = await axios.get(
      `${examCode}/mock-exam-code/organization-code`,
      { params },
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

const ExamService = {
  getGroupExamCodeList,
};

export default ExamService;
