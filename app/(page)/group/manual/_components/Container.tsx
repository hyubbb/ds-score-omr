"use client";

import React, { useEffect, useState, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Commons/Form/Button/Button";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Commons/Spinner/Spinner";
import {
  getManualSingleTableData,
  manualSingleColumns,
} from "@/libs/utils/manual/tableData";
import { useAnswerStatus } from "@/libs/hooks/manual/useAnswerStatus";
import PageTitle from "@/components/Manual/PageTitle";
import ColTable from "@/components/Manual/Coltable";

const Container = () => {
  const router = useRouter();
  const methods = useForm();
  const { handleSubmit } = methods;
  const [isLoading, setIsLoading] = useState(true);
  const [isAllStatusCheck, setIsAllStatusCheck] = useState(false);

  // subjectAnswer 이 임시상태고, api로 가져온 값이 생기면 지우면됨
  const { subjectAnswer, checkedStatus, checkedUpdateStatus } =
    useAnswerStatus();

  // api로 가져온 값을 subjectanswer로 넣으면된다.
  const tableItems = useMemo(
    () =>
      getManualSingleTableData(
        subjectAnswer,
        [],
        checkedStatus,
        checkedUpdateStatus,
      ),
    [subjectAnswer],
  );
  // const tableItems = [] as any;

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const onSubmit = () => {
    // 제출완료시
    // 제출완료 api 연동 해야됨
    router.push("/personal/manual/success");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex w-[1400px] flex-col gap-4 overflow-x-auto">
      <FormProvider {...methods}>
        <PageTitle>답안 입력 현황</PageTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <section className="w-[600px]">
              <ColTable
                isNumber={false}
                items={tableItems}
                columns={manualSingleColumns}
              />
            </section>
            <div className="flex justify-center">
              <Button
                type="submit"
                variant="defaultBlack"
                size="md"
                label="최종 제출"
                disabled={!isAllStatusCheck}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Container;
