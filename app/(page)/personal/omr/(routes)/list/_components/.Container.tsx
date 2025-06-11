"use client";

import PageTitle from "@/components/Manual/PageTitle";
import { TData, TOmrList } from "@/types/personal/types";
import { DehydratedState, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Commons/Form/Button/Button";
import { useRouter } from "next/navigation";
import { useRecoilState, useSetRecoilState } from "recoil";
import { omrListDataState } from "@/atoms/manual/atom";
import Spinner from "@/components/Commons/Spinner/Spinner";

const Container = ({ initData }: { initData: TData[] }) => {
  const router = useRouter();
  const methods = useForm();
  const { handleSubmit } = methods;
  const [omrListState, setOmrListState] = useRecoilState(omrListDataState);
  const [isLoading, setIsLoading] = useState(true);
  const [omrList, setOmrList] = useState<TData[]>(initData);
  // const methods = useForm({
  //   defaultValues: initData,
  //   mode: "onChange",
  // });

  useEffect(() => {
    if (!omrListState.length) {
      setOmrListState(omrList);
    }

    setIsLoading(false);
  }, [omrList]);

  const itemFields = [
    { label: "과목", key: (item: TData) => item.subject },
    { label: "수험번호", key: (item: TData) => item.examCode },
    { label: "생년월일", key: (item: TData) => item.birth },
    { label: "이름", key: (item: TData) => item.koreanName },
  ];

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="flex w-[1400px] flex-col gap-4 overflow-x-auto">
      <FormProvider {...methods}>
        <PageTitle>OMR 업로드 현황</PageTitle>
        <div className="flex flex-col gap-4">
          {omrListState?.map((item: TData) => {
            return (
              <div
                key={item.subject + item.examCode}
                className="flex max-w-fit items-center justify-center border p-4"
              >
                <div className="flex divide-x">
                  {itemFields.map((field, index) => (
                    <div
                      key={index}
                      className={`w-[100px] px-4 text-center ${index === 0 ? "pl-0" : ""}`}
                    >
                      <div className="text-md font-bold">{field.label}</div>
                      <div className="text-sm">{field.key(item)}</div>
                    </div>
                  ))}
                </div>
                <Button
                  label="OMR 확인"
                  variant="primaryFill"
                  size="sm"
                  className="w-20"
                  onClick={() => {
                    router.push(`/personal/omr/list/${item.subjectEn}`);
                  }}
                />
              </div>
            );
          })}
        </div>
      </FormProvider>
    </div>
  );
};

export default Container;
