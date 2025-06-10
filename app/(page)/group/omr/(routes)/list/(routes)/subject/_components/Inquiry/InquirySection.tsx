import QuestionHeader from "@/app/(page)/personal/omr/_components/Questions/_components/QuestionHeader";
import React from "react";
// import SubjectSection from "./SubjectSection";
import NumberGrid from "./NumberGrid";
import QuestionGrid from "@/app/(page)/personal/omr/_components/Questions/_components/QuestionGrid";
import SubjectSection from "@/app/(page)/personal/omr/_components/Questions/_components/SubjectSection";

const InquirySection = ({
  length,
  title,
  type,
}: {
  length: number;
  title: string;
  type: number;
}) => {
  return (
    <section className="flex flex-col items-center">
      <div className="flex w-full rounded-lg">
        <SubjectSection title={title}>
          <div className="flex divide-x">
            <div className="flex h-full w-[50px] flex-col">
              <div className="flex flex-col items-center gap-1 border-b py-1 font-semibold">
                <span>선 택</span>
                <span>과 목</span>
                <span>번 호</span>
              </div>
              <div className="flex justify-center gap-2 border-b py-1 font-semibold">
                <span>
                  십<br />의<br />자<br />리
                </span>
                <span>
                  일<br />의<br />자<br />리
                </span>
              </div>
              <div className="flex flex-1 basis-0 py-1">
                {Array.from({ length: 2 }, (_, index) => (
                  <NumberGrid
                    key={index}
                    currentIndex={index}
                    maxValue={10}
                    startNumber={0}
                    fieldName={`course.${type}`}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <QuestionHeader columns={1} title="true" />
              <div className="flex divide-x">
                {Array.from({ length: 1 }).map((_, index) => {
                  return (
                    <QuestionGrid key={index} length={length} type={type} />
                  );
                })}
              </div>
            </div>
          </div>
        </SubjectSection>
      </div>
    </section>
  );
};

export default InquirySection;
