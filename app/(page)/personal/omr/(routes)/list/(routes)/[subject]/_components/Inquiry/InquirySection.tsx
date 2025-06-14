import QuestionHeader from "@/app/(page)/personal/omr/_components/Questions/QuestionHeader";
import React from "react";
// import SubjectSection from "./SubjectSection";
import NumberGrid from "./NumberGrid";
import QuestionGrid from "@/app/(page)/personal/omr/_components/Questions/QuestionGrid";
import SubjectSection from "@/app/(page)/personal/omr/_components/Questions/SubjectSection";
import { useFormContext } from "react-hook-form";
import {
  COURSE_LIST,
  COURSE_LIST_EN,
} from "@/app/(page)/personal/omr/_utils/utils2";

const InquirySection = ({
  length,
  title,
  type,
}: {
  length: number;
  title: string;
  type: number;
}) => {
  const { watch } = useFormContext();
  const watchValue = (name: string) => {
    const value = watch(name);
    return Array.isArray(value) ? value.join("") : value;
  };
  const course = COURSE_LIST_EN.inquiry?.filter(
    (item: any) => item.value == watchValue(`course${type + 1}`),
  )[0]?.label;

  const courseLabel = COURSE_LIST.inquiry?.filter(
    (item: any) => item.value == course,
  )[0]?.label;

  return (
    <section className="flex flex-col items-center">
      <div className="flex w-full rounded-lg">
        <SubjectSection title={title} label={courseLabel}>
          <div className="flex divide-x">
            <div className="flex h-full w-[50px] flex-col">
              <div className="flex flex-col items-center gap-1 border-b py-1 font-semibold">
                <span>선 택</span>
                <span>과 목</span>
                <span>번 호</span>
                {/* <span>{courseLabel}</span> */}
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
                    fieldName={`course${type + 1}`}
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
