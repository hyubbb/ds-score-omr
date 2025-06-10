import React from "react";
import ExcelAnswerUploadContainer from "./_components/ExcelAnswerUploadContainer";

const ExcelAnswerUploadPage = () => {
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <ExcelAnswerUploadContainer />
    </main>
  );
};

export default ExcelAnswerUploadPage;

// 엑셀 파싱 샘플 파일
//https://docs.google.com/spreadsheets/d/16cvEt6FeXzCPN-nEeO0its5p8sRbO-4ZGQYlOlmMCQk/edit?gid=616928566#gid=616928566

// 국수영과탐 api 따로 요청  attemptId랑 응시코드랑 엮여있다
// [

//   {
//     "attemptId": 0,
//     엑셀 응시자 정보보내야됨
//     응시코드
//     엑셀에 있는 정보 다 ~~ 선택과목
//       "answers": [
//         "1","2"
//       ]
//   },
//   {
//     "attemptId": 0,
//       "answers": [
//         "1","2"
//       ]
//   },

// ]
