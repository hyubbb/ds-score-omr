"use client";

import React from "react";
import SampleDownloader from "./SampleDownloader";
import { useExcelAnswerContext } from "../_context/excel.answer.context";
import Upload from "@/components/Commons/Form/Uploadfile/Upload";
import { FormProvider, useForm } from "react-hook-form";
import { useAlert } from "@/libs/hooks/useAlert";
import {
  checkExamParticipantCount,
  parseEnglishData,
  parseInquiryData,
  parseKoreanData,
  parseKoreanHistoryData,
  parseMathData,
} from "../utils/parseUtils";

const UploadContainer = () => {
  const methods = useForm({
    defaultValues: {
      fileName: "",
      file: null,
    },
  });

  const groupCode = "a1234567";
  const mockExamName = "The Premium 3월 모의고사";
  const grade = "FRESHMAN";
  const answerMethod = "INPUT_EXCEL";

  const { setKorean, setEnglish, setMath, setKoreanHistory, setInquiry } =
    useExcelAnswerContext();
  // const setIsLoading = useSetRecoilState(isLoadingState);
  // const { openAlert, closeAlert } = useAlert();
  // const { count, codes } = useRecoilValue(examCodeState);
  const handleUploadAndParseExcel = async (file: File) => {
    if (!file) return;

    try {
      //파싱된 데이터(과목별)
      const korean = await parseKoreanData(file); // 국어 데이터 파싱
      const math = await parseMathData(file); // 수학 데이터 파싱
      const english = await parseEnglishData(file); // 영어 데이터 파싱
      const koreanHistory = await parseKoreanHistoryData(file); // 한국사 데이터 파싱
      const inquiry = await parseInquiryData(file); // 탐구 데이터 파싱

      // ✅ 응시자 수 검사
      // if (
      //   !checkExamParticipantCount(korean, "국어", count) ||
      //   !checkExamParticipantCount(math, "수학", count) ||
      //   !checkExamParticipantCount(english, "영어", count) ||
      //   !checkExamParticipantCount(koreanHistory, "한국사", count) ||
      //   !checkExamParticipantCount(inquiry, "탐구", count)
      // ) {
      //   return; // 🚨 응시자 초과 시 중단
      // }

      // FormData 생성
      const formData = new FormData();
      formData.append("file", file); // 업로드된 파일
      formData.append("korean", JSON.stringify(korean)); // 파싱된 국어 데이터
      formData.append("math", JSON.stringify(math)); // 파싱된 수학 데이터
      formData.append("english", JSON.stringify(english)); // 파싱된 영어 데이터
      formData.append("koreanHistory", JSON.stringify(koreanHistory)); //파싱된 한국사 데이터
      formData.append("inquiry", JSON.stringify(inquiry)); //파싱된 탐구 데이터

      console.log("국어데이터 파싱확인", JSON.stringify(korean));
      console.log("수학데이터 파싱확인", JSON.stringify(math));
      console.log("영어데이터 파싱확인", JSON.stringify(english));
      console.log("한국사데이터 파싱확인", JSON.stringify(koreanHistory));
      console.log("탐구데이터 파싱확인", JSON.stringify(inquiry));

      //TODO: api 연동작업
    } catch (error) {
      // 파싱중 에러 얼럿 띄우기
      console.log("엑셀 업로드 에러");
    }
  };

  return (
    <FormProvider {...methods}>
      {/* 엑셀 양식 다운로드 */}
      <SampleDownloader />
      <Upload
        name="file"
        rules={{
          fileExtension: {
            value: ["xlsx"],
            message: "엑셀 파일만 업로드 가능합니다.",
          },
          fileMaxSize: {
            // value: 10000000,
            // message: "10MB 이하의 파일만 업로드 가능합니다.",
          },
        }}
        isOnly={true}
        isThumbnail={false}
        showNoFileMessage={false}
        uploadLabel="업로드"
        onFileChange={(file) => {
          handleUploadAndParseExcel(file as File);
        }}
        className="mt-4"
      />
    </FormProvider>
  );
};

export default UploadContainer;
