import React from "react";
import UnivCode from "./UnivCode";
import QuestionSection from "@/app/(page)/personal/omr/_components/Questions/QuestionSection";

const EnglishComponent = () => {
  return (
    <div className="flex gap-2">
      <div className="flex gap-2">
        <UnivCode title="1지망" fieldName="univCode1" />
        <UnivCode title="2지망" fieldName="univCode2" />
      </div>
      <div className="flex gap-2">
        <QuestionSection divideLength={20} />
        <QuestionSection initNum={20} divideLength={20} />
        <QuestionSection initNum={40} divideLength={5} />
      </div>
    </div>
  );
};

export default EnglishComponent;
