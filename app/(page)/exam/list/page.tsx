"use client";
import PageTitle from "@/components/Manual/PageTitle";
import React from "react";
import Table from "./_components/Table";

const page = () => {
  return (
    <div className="flex w-[1000px] flex-col gap-8">
      <PageTitle>시험지 다운로드</PageTitle>
      <Table />
    </div>
  );
};

export default page;
