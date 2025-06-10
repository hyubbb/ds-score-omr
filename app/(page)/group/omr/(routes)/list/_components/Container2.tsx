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
import ColTable from "@/components/Commons/Table/Coltable";
import { IColumns } from "@/types/interface/common";

const Container2 = ({ initData }: { initData: TData[] }) => {
  const router = useRouter();
  const methods = useForm();
  const [omrListState, setOmrListState] = useRecoilState(omrListDataState);
  const [isLoading, setIsLoading] = useState(true);
  const [omrList, setOmrList] = useState<TData[]>(initData);
  // const methods = useForm({
  //   defaultValues: initData,
  //   mode: "onChange",
  // });

  useEffect(() => {
    if (!omrListState.length) {
      setOmrListState(initData);
    }
  }, [initData]);

  useEffect(() => {
    setOmrList(omrListState);
    setIsLoading(false);
  }, [omrListState, setOmrListState]);

  const columns: IColumns[] = [
    // { header: "", name: ["number"], width: "120", align: "center" },
    { header: "교시", name: ["number"], width: "120", align: "center" },
    { header: "과목", name: ["subject"], width: "120", align: "center" },
    {
      header: "검수 완료 인원",
      name: ["checkedStudents"],
      width: "120",
      align: "center",
    },
    {
      header: "검수 대기 인원",
      name: ["waitingStudents"],
      width: "120",
      align: "center",
    },
    {
      header: "검수 진행",
      name: ["subjectEn"],
      width: "120",
      align: "center",
      editor: (subjectEn: string) => {
        return (
          <Button
            label="검수 진행"
            variant="defaultBlack"
            size="sm"
            className="w-20"
            onClick={() => {
              router.push(`/group/omr/list/${subjectEn}`);
            }}
          />
        );
      },
    },
  ];

  const onSubmit = () => {
    // 제출완료시
    // 제출완료 api 연동 해야됨
    console.log("제출완료 버튼 클릭");
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <FormProvider {...methods}>
      <div className="flex w-[800px] flex-col gap-8 overflow-x-auto">
        <PageTitle>단체장 답안 검수</PageTitle>
        <div className="flex flex-col gap-4">
          <ColTable items={omrList} columns={columns} isNumber={false} />

          {/* {omrListState?.map((item: TData) => {
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
        })} */}
        </div>
        <div className="flex justify-center">
          <Button
            type="button"
            variant="defaultBlack"
            size="md"
            label="최종 제출"
            onClick={onSubmit}
          />
        </div>
      </div>
    </FormProvider>
  );
};

export default Container2;
