import React from "react";
import NumberGridRow from "../OmrForm/NumberGridRow";
import SubjectSection from "./_components/SubjectSection";
import QuestionGrid from "./_components/QuestionGrid";

const QuestionSection = ({
  title,
  startIndex,
  length,
  maxValue = 5,
}: {
  title: string;
  startIndex: number;
  length: number;
  maxValue?: number;
}) => {
  return (
    <SubjectSection title={title}>
      {/* <QuestionHeader columns={2} /> */}
      <div className="flex divide-x">
        <QuestionGrid
          startIndex={startIndex}
          length={length}
          maxValue={maxValue}
        />
      </div>
    </SubjectSection>
  );
};

export default QuestionSection;
