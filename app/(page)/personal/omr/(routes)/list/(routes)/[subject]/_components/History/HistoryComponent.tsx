import SubjectSection from "@/app/(page)/personal/omr/_components/Questions/SubjectSection";
import React from "react";
import QuestionHeader from "@/app/(page)/personal/omr/_components/Questions/QuestionHeader";
import QuestionGrid from "@/app/(page)/personal/omr/_components/Questions/QuestionGrid";

const HistoryComponent = () => {
  const COMMON_LENGTH = 20;
  return (
    <section className="flex flex-col items-center">
      <div className="flex w-full gap-4">
        <SubjectSection title="한국사 (필수)">
          <QuestionHeader columns={1} title="한국사(필수)" />
          <div className="flex divide-x">
            {Array.from({ length: 1 }).map((_, index) => {
              return <QuestionGrid key={index} length={COMMON_LENGTH} />;
            })}
          </div>
        </SubjectSection>
      </div>
    </section>
  );
};

export default HistoryComponent;
