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
      <section className="flex flex-col gap-4 pl-4 text-lg font-medium">
        <span>모의고사 최종답안 제출이 완료되었습니다.</span>
        <span>시행월별 정확한 성적 조회 일정은 공지사항을 참고 바랍니다.</span>
        <span>
          ※ 온라인성적표 최초공개(시행일자로 부터 10~12일이내) 이후에는 응시일
          이후 1일 이내 성적확인 가능
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
