"use client";
import PageTitle from "@/components/Manual/PageTitle";
import Button from "@/components/Commons/Form/Button/Button";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  return (
    <div className="flex w-[1400px] flex-col gap-4 overflow-x-auto">
      <PageTitle>단체 신청 완료</PageTitle>
      <section className="flex flex-col gap-4 p-4">
        <span className="text-lg font-medium">
          단체 생성이 완료되었습니다.
          <br />
          단체 상세페이지에서 부여된 단체코드 확인 가능합니다.
        </span>
        <div className="flex justify-center">
          <Button
            label="확인"
            variant="primaryFill"
            size="lg"
            onClick={() => router.push("/group/manage")}
          />
        </div>
      </section>
    </div>
  );
};

export default page;
