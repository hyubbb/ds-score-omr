"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/Commons/Form/Button/Button";
import Spinner from "@/components/Commons/Spinner/Spinner";
import { useRouter } from "next/navigation";
import PageTitle from "@/components/Manual/PageTitle";

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="flex w-[1400px] flex-col gap-4 overflow-x-auto">
      <PageTitle>첨부 완료</PageTitle>
      <div>
        <p>사업자등록증 첨부가 완료되었습니다.</p>
        <p>관리자 확인 이후 해당 단체의 단체장 권한이 부여됩니다.</p>
      </div>
      <Button
        label="확인"
        variant="defaultOutline"
        size="sm"
        className="w-48"
        onClick={() => {
          router.push("/offline-groups");
        }}
      />
    </div>
  );
};

export default Page;
