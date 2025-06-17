import React from "react";
import KoreanComponent from "../Korean/KoreanComponent";
import MathComponent from "../Math/MathComponent";
import HistoryComponent from "../History/HistoryComponent";
import InquiryComponent from "../Inquiry/InquiryComponent";
import EnglishComponent from "../English/EnglishComponent";
import Course from "@/app/(page)/personal/omr/_components/Course/Course";
import Gender from "@/app/(page)/personal/omr/_components/Gender/Gender";
import Name from "@/app/(page)/personal/omr/_components/Name/Name";
import ExamCode from "@/app/(page)/personal/omr/_components/ExamCode/ExamCode";
import Birth from "@/app/(page)/personal/omr/_components/Birth/Birth";
import { bgColorClasses, mainColorClasses } from "@/libs/utils/colorClasses";
import clsx from "clsx";

const SUBJECT_COMPONENTS = {
  korean: KoreanComponent,
  english: EnglishComponent,
  math: MathComponent,
  history: HistoryComponent,
  inquiry: InquiryComponent,
} as const;

interface OmrContentProps {
  currentSubject: keyof typeof SUBJECT_COMPONENTS;
  isCourseSection: boolean;
}

const OmrContent: React.FC<OmrContentProps> = ({
  currentSubject,
  isCourseSection,
}) => {
  const bgColor = "bg-" + bgColorClasses[currentSubject] || "bg-white";
  const borderColor =
    "border-" + mainColorClasses[currentSubject] || "border-gray-300";

  const renderComponent = () => {
    const Component = SUBJECT_COMPONENTS[currentSubject];
    return Component ? <Component /> : <div>과목을 찾을 수 없습니다.</div>;
  };

  return (
    <div
      className={`mx-4 flex gap-2 rounded-md border ${borderColor} ${bgColor} border-2 p-8`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <ExamCode />
          <Birth />
        </div>
        <Name />
      </div>
      <div className={clsx(isCourseSection && "flex flex-col gap-2")}>
        {isCourseSection && <Course />}
        {/* {isGenderSection && <Gender />} */}
      </div>
      {renderComponent()}
    </div>
  );
};

export default OmrContent;
