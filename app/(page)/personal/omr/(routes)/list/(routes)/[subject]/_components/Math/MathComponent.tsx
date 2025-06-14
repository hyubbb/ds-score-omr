import SubjectSection from "@/app/(page)/personal/omr/_components/Questions/SubjectSection";
import QuestionSection from "@/app/(page)/personal/omr/_components/Questions/QuestionSection";
import React from "react";
import QuestionGrid from "./QuestionGrid";
import QuestionHeader from "@/app/(page)/personal/omr/_components/Questions/QuestionHeader";
import ShortAnswerGrid from "./ShortAnswerGrid";

const MathComponent = () => {
  const COMMON_ANSWER_LENGTH = 15;
  const COMMON_SHORT_ANSWER_LENGTH = 7;
  const OPTIONAL_ANSWER_LENGTH = 6;
  const OPTIONAL_SHORT_ANSWER_LENGTH = 2;

  const TOTAL_LENGTH =
    COMMON_ANSWER_LENGTH +
    COMMON_SHORT_ANSWER_LENGTH +
    OPTIONAL_ANSWER_LENGTH +
    OPTIONAL_SHORT_ANSWER_LENGTH;

  const DIVIDE_LENGTH =
    TOTAL_LENGTH - COMMON_ANSWER_LENGTH - OPTIONAL_ANSWER_LENGTH;
  const OPTIONAL_START_INDEX = COMMON_ANSWER_LENGTH + DIVIDE_LENGTH;

  return (
    <div className="flex flex-col gap-4">
      <section className="flex gap-4">
        <QuestionSection
          totalLength={15}
          divideLength={8}
          column={2}
          title="공통과목"
        />

        <div className="flex max-w-fit gap-4">
          {/* <QuestionSection
            title="공통과목"
            startIndex={0}
            length={COMMON_ANSWER_LENGTH}
            /> */}
          {Array.from({ length: 5 }, (_, index) => (
            <ShortAnswerGrid
              key={index}
              initNum={COMMON_ANSWER_LENGTH + index}
            />
          ))}
        </div>
      </section>
      <section className="flex gap-4">
        <div className="flex max-w-fit gap-4">
          {Array.from({ length: 2 }, (_, index) => (
            <ShortAnswerGrid
              key={index}
              initNum={COMMON_ANSWER_LENGTH + index + 5}
            />
          ))}
        </div>
        <QuestionSection
          totalLength={6}
          divideLength={6}
          optionInitNum={23}
          optionalLength={6}
          onlyOptional={true}
          column={2}
        />
        <div className="flex max-w-fit gap-4">
          {Array.from({ length: 2 }, (_, index) => (
            <ShortAnswerGrid key={index} initNum={28 + index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MathComponent;
