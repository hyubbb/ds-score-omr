import React from "react";
import NumberGridRow from "../../../../../../_components/OmrForm/NumberGridRow";
import SubjectSection from "../../../../../../_components/Questions/_components/SubjectSection";
import QuestionHeader from "../../../../../../_components/Questions/_components/QuestionHeader";
import QuestionGrid from "../../../../../../_components/Questions/_components/QuestionGrid";

const Questions = () => {
  const TOTAL_LENGTH = 45;
  const COMMON_LENGTH = 20;
  const OPTIONAL_LENGTH = 11;
  const DIVIDE_LENGTH = TOTAL_LENGTH - COMMON_LENGTH - OPTIONAL_LENGTH;
  const OPTIONAL_START_INDEX = COMMON_LENGTH + DIVIDE_LENGTH;

  return (
    <section className="flex flex-col items-center">
      <div className="flex w-full gap-4">
        <SubjectSection title="공통과목">
          <QuestionHeader columns={2} />
          <div className="flex divide-x">
            <QuestionGrid startIndex={0} length={COMMON_LENGTH} />
            <QuestionGrid startIndex={COMMON_LENGTH} length={DIVIDE_LENGTH} />
          </div>
        </SubjectSection>

        <SubjectSection title="선택과목">
          <QuestionHeader />
          <QuestionGrid
            startIndex={OPTIONAL_START_INDEX}
            length={OPTIONAL_LENGTH}
          />
        </SubjectSection>
      </div>
    </section>
  );
};

export default Questions;
