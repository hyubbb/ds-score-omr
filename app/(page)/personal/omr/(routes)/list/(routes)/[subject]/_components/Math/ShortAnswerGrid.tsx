import SubjectSection from "@/app/(page)/personal/omr/_components/Questions/SubjectSection";
import React from "react";
import NumberGrid from "@/app/(page)/personal/omr/_components/OmrForm/NumberGrid";
import { useFormContext } from "react-hook-form";

const ShortAnswerGrid = ({
  initNum,
  length,
}: {
  initNum: number;
  length?: number;
}) => {
  const { watch } = useFormContext();
  return (
    <SubjectSection title={`${initNum + 1}번`}>
      <div className="flex divide-x">
        <div className="flex w-full flex-1 divide-x border-b text-center font-semibold">
          <div className="w-full">백</div>
          <div className="w-full">십</div>
          <div className="w-full">일</div>
        </div>
      </div>
      <div className="flex divide-x">
        {/* <QuestionGrid startIndex={0} length={6} maxValue={3} /> */}

        <div className="grid w-[70px] grid-cols-3 divide-x text-center">
          {Array.from({ length: 3 }, (_, index) => {
            // <MathNumberGrid
            //   key={index}
            //   currentIndex={index}
            //   fieldName={"questions"}
            //   maxValue={9}
            // />
            return (
              <NumberGrid
                key={index}
                posIndex={index}
                currentIndex={initNum}
                fieldName="answers"
                type="shortAnswer"
              />
            );
          })}
        </div>
      </div>
    </SubjectSection>
  );
};

export default ShortAnswerGrid;
