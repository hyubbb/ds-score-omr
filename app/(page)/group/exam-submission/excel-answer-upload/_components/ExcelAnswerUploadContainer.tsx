"use client";

import { useExcelAnswerContext } from "../_context/excel.answer.context";
import AnswerEditingContainer from "./AnswerEditingContainer";
import UploadContainer from "./UploadContainer";

const ExcelAnswerUploadContainer = () => {
  //context api 전역 값 가져오기
  const { korean, english, math, koreanHistory, inquiry } =
    useExcelAnswerContext();
  const parsedAnswer = korean && english && math && koreanHistory && inquiry;

  return (
    <>
      <UploadContainer />
      {/* {!parsedAnswer && <UploadContainer />} */}
      {/* {parsedAnswer && <AnswerEditingContainer />} */}
    </>
  );
};

export default ExcelAnswerUploadContainer;
