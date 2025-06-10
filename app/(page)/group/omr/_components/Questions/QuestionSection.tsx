import React from "react";
import SubjectSection from "./_components/SubjectSection";
import QuestionHeader from "./_components/QuestionHeader";
import QuestionGrid from "./_components/QuestionGrid";

type QuestionSectionProps = {
  title?: string;
  totalLength?: number;
  divideLength?: number;
  column?: number;
  initNum?: number;
  optionInitNum?: number;
  optionalLength?: number;
  onlyOptional?: boolean;
  maxValue?: number;
};

const QuestionSection = ({
  title,
  totalLength = 20,
  divideLength = 0,
  column = 1,
  initNum = 0,
  optionInitNum = 0,
  optionalLength = 0,
  onlyOptional = false,
  maxValue = 5,
}: QuestionSectionProps) => {
  const DIVIDE_LENGTH = divideLength;
  const COMMON_LENGTH = totalLength - optionalLength;
  const OPTIONAL_START_INDEX = optionInitNum
    ? optionInitNum - 1
    : COMMON_LENGTH;

  return (
    <section className="flex flex-col items-center">
      <div className="flex w-fit gap-4">
        {!onlyOptional && (
          <SubjectSection title={title}>
            <QuestionHeader columns={column} title={title} />
            <div className="flex divide-x">
              {Array.from({ length: column }).map((_, index) => {
                const length = Math.min(
                  DIVIDE_LENGTH,
                  COMMON_LENGTH - DIVIDE_LENGTH * index,
                );

                return (
                  <QuestionGrid
                    key={index}
                    startIndex={index * DIVIDE_LENGTH + initNum}
                    length={length}
                  />
                );
              })}
            </div>
          </SubjectSection>
        )}

        {optionalLength > 0 && (
          <SubjectSection title="선택과목">
            <QuestionHeader />
            <QuestionGrid
              startIndex={OPTIONAL_START_INDEX}
              length={optionalLength}
              maxValue={maxValue}
            />
          </SubjectSection>
        )}
      </div>
    </section>
  );
};

export default QuestionSection;
