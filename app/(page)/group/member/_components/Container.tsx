"use client";
import Button from "@/components/Commons/Form/Button/Button";
import ColTable from "@/components/Commons/Table/Coltable";
import PageTitle from "@/components/Manual/PageTitle";
import { useGroupAnswerStatus } from "@/libs/hooks/manual/useGroupAnswerStatus";
import { manualGroupColumns } from "@/libs/utils/manual/tableData";
import { fetchWithQuery } from "@/libs/utils/query/fetchWithQuery";
import { queryClient as customQueryClient } from "@/libs/utils/query/queryClient";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

type TData = {
  name: string;
  birth: string;
  phone: string;
  class: string;
  number: string;
  status: string;
};

const Container = () => {
  const { data: initData } = useQuery<ApiResponse<TData[]>>({
    queryKey: ["group", "manual"],
    queryFn: () => fetchWithQuery("/api/manual/group"),
  });

  const { checkedStatus, checkedUpdateStatus } = useGroupAnswerStatus(
    initData?.data,
  );

  // QueryClient 인스턴스 가져오기
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!initData?.data) return; // 데이터가 없으면 실행 X

    const newData = initData.data.map((item) => ({
      ...item,
      statusText: checkedStatus(item.status),
      updateStatus: checkedUpdateStatus(item.status, item.number),
      question: {
        korean: { type: "", answer: Array(45).fill(null), status: "pending" },
        math: { type: "", answer: Array(30).fill(null), status: "pending" },
        english: {
          type: "",
          answer: Array(20).fill(null),
          status: "pending",
        },
        history: {
          type: "",
          answer: Array(20).fill(null),
          status: "pending",
        },
        society: {
          type: "",
          answer: Array(20).fill(null),
          status: "pending",
        },
        science: {
          type: "",
          answer: Array(20).fill(null),
          status: "pending",
        },
      },
    }));

    queryClient.setQueryData(["group", "manual"], {
      success: true,
      data: newData,
    });
  }, [initData]); // ✅ `initData` 변경될 때만 실행

  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = () => {
    console.log("submit");
  };

  return (
    <div className="flex w-full flex-col gap-4 overflow-x-auto">
      <FormProvider {...methods}>
        <PageTitle>단체 수기입력</PageTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <section className="w-[800px]">
              <ColTable
                isNumber={false}
                items={initData?.data}
                columns={manualGroupColumns}
              />
            </section>
            <div className="flex justify-center">
              <Button
                type="submit"
                variant="defaultBlack"
                size="md"
                label="최종 제출"
                // disabled={!isAllStatusCheck}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Container;
