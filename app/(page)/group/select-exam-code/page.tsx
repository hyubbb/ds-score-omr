import React from "react";
import SelectExamCodeContainer from "./_components/SelectExamCodeContainer";

const SelectExamCode = ({
  searchParams,
}: {
  searchParams: { num?: string };
}) => {
  return <SelectExamCodeContainer params={searchParams} />;
};

export default SelectExamCode;
