import PageTitle from "@/components/Manual/PageTitle";
import React from "react";
import Container from "./_components/Container";

const page = () => {
  return (
    <div className="flex w-[1400px] flex-col gap-4 overflow-x-auto">
      <PageTitle>단체 추가</PageTitle>
      <Container />
    </div>
  );
};

export default page;
