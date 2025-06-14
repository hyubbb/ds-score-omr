import React from "react";
import SubjectSection from "./SubjectSection";
import QuestionHeader from "./QuestionHeader";
import QuestionGrid from "./QuestionGrid";

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
  fontColor?: string;
  bgColor?: string;
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
  fontColor = "#000000",
  bgColor = "#FFFFFF",
}: QuestionSectionProps) => {
  const DIVIDE_LENGTH = divideLength;
  const COMMON_LENGTH = totalLength - optionalLength;
  const OPTIONAL_START_INDEX = optionInitNum
    ? optionInitNum - 1
    : COMMON_LENGTH;

  return (
    <section className="flex flex-col items-center">
      <div className="flex w-fit gap-2">
        {!onlyOptional && (
          <SubjectSection title={title}>
            <QuestionHeader
              columns={column}
              title={title}
              fontColor={fontColor}
              bgColor={bgColor}
            />
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
                    fontColor={fontColor}
                    bgColor={bgColor}
                  />
                );
              })}
            </div>
          </SubjectSection>
        )}

        {optionalLength > 0 && (
          <SubjectSection title="선택과목">
            <QuestionHeader fontColor={fontColor} bgColor={bgColor} />
            <QuestionGrid
              startIndex={OPTIONAL_START_INDEX}
              length={optionalLength}
              maxValue={maxValue}
              fontColor={fontColor}
              bgColor={bgColor}
            />
          </SubjectSection>
        )}
      </div>
    </section>
  );
};

export default QuestionSection;
