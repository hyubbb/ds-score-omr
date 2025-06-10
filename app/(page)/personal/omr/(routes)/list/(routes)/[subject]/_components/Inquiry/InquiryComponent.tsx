import React from "react";
import InquirySection from "./InquirySection";
import { useFormContext } from "react-hook-form";

const InquiryComponent = () => {
  const COMMON_LENGTH = 20;

  return (
    <div className="flex gap-4">
      <InquirySection length={COMMON_LENGTH} title="탐구(제1 선택)" type={0} />
      <InquirySection length={COMMON_LENGTH} title="탐구(제2 선택)" type={1} />
    </div>
  );
};

export default InquiryComponent;
