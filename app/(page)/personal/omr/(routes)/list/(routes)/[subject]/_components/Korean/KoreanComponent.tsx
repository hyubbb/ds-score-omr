"use client";
import QuestionSectionDouble from "@/app/(page)/personal/omr/_components/Questions/QuestionSection";
import React from "react";
import { useFormContext } from "react-hook-form";

const KoreanComponent = () => {
  const { getValues, watch } = useFormContext();
  const subject = getValues("subject");
  const fontColor = "#048F48";
  const bgColor = "#E8F3E7";

  return (
    <QuestionSectionDouble
      totalLength={45}
      divideLength={20}
      column={2}
      optionalLength={11}
      fontColor={fontColor}
      bgColor={bgColor}
    />
  );
};

export default KoreanComponent;
