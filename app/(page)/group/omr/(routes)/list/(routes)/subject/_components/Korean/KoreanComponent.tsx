"use client";
import QuestionSectionDouble from "@/app/(page)/personal/omr/_components/Questions/QuestionSection";
import React from "react";
import { useFormContext } from "react-hook-form";
import { OMR_COLORS } from "../../_utils/utils";

const KoreanComponent = () => {
  const { getValues } = useFormContext();
  const subject = getValues("subject");
  const color = OMR_COLORS[subject as keyof typeof OMR_COLORS];
  return (
    <QuestionSectionDouble
      totalLength={45}
      divideLength={20}
      column={2}
      optionalLength={11}
    />
  );
};

export default KoreanComponent;
