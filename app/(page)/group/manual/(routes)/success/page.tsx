"use client";
import PageTitle from "@/components/Manual/PageTitle";
import Button from "@/components/Commons/Form/Button/Button";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  return (
    <div className="flex w-[1400px] flex-col gap-4 overflow-x-auto">
      <PageTitle>모의고사 응시 완료</PageTitle>
      <section className="flex flex-col gap-4">
        <span className="text-lg font-medium">
          모의고사 응시가 완료되었습니다.
          <br />
          성적 처리 이후 성적 조회가 가능합니다.
        </span>
        <div className="flex justify-center">
          <Button
            label="완료"
            variant="primaryFill"
            size="lg"
            onClick={() => router.push("/")}
          />
        </div>
      </section>
    </div>
  );
};

export default page;
