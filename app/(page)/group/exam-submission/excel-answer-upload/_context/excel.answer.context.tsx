"use client";

import { createContext, useContext, useState } from "react";

interface ExcelAnswerContextType {
  korean: string;
  setKorean: (value: string) => void;
  english: string;
  setEnglish: (value: string) => void;
  math: string;
  setMath: (value: string) => void;
  koreanHistory: string;
  setKoreanHistory: (value: string) => void;
  inquiry: string;
  setInquiry: (value: string) => void;
}

const ExcelAnswerContext = createContext<ExcelAnswerContextType | undefined>(
  undefined,
);

const ExcelAnswerContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // 엑셀파싱된 국,영,수,한국사,탐구 추출답안 상태
  const [korean, setKorean] = useState("");
  const [english, setEnglish] = useState("");
  const [math, setMath] = useState("");
  const [koreanHistory, setKoreanHistory] = useState("");
  const [inquiry, setInquiry] = useState("");

  // 📌 Context API에 값 전달
  const value = {
    korean,
    setKorean,
    english,
    setEnglish,
    math,
    setMath,
    koreanHistory,
    setKoreanHistory,
    inquiry,
    setInquiry,
  };

  return (
    <ExcelAnswerContext.Provider value={value}>
      {children}
    </ExcelAnswerContext.Provider>
  );
};

export default ExcelAnswerContextProvider;

// context사용 커스텀 훅
export const useExcelAnswerContext = () => {
  const context = useContext(ExcelAnswerContext);
  if (!context) {
    throw new Error(
      "useExcelAnswer must be used within an ExcelAnswerContextProvider",
    );
  }
  return context;
};

// 커스텀 훅 사용법 예시
// const { korean, setKorean, math, setMath } = useExcelAnswerContext();
