"use client";

import React, { useEffect, useState, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Commons/Form/Button/Button";
import { useRecoilState } from "recoil";
import { groupUserInfoState } from "@/atoms/manual/atom";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Commons/Spinner/Spinner";
import {
  getManualSingleTableData,
  manualSingleColumns,
} from "@/libs/utils/manual/tableData";
import { useAnswerStatus } from "@/libs/hooks/manual/useAnswerStatus";
import PageTitle from "@/components/Manual/PageTitle";
import ColTable from "@/components/Manual/Coltable";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchWithQuery } from "@/libs/utils/query/fetchWithQuery";
import { queryClient } from "@/libs/utils/query/queryClient";

const Container = ({ id }: { id: string }) => {
  const router = useRouter();
  const methods = useForm();
  const { handleSubmit } = methods;
  const [isLoading, setIsLoading] = useState(true);
  const [isAllStatusCheck, setIsAllStatusCheck] = useState(false);

  const { subjectAnswer, checkedStatus, checkedUpdateStatus } =
    useAnswerStatus();

  const queryDatas = queryClient.getQueryData(["group", "manual"]);
  const userQuestions = queryDatas?.data.filter(
    (item: any) => item.number === id,
  )[0];

  // 유저정보를 불러오는데 이값을 기준으로 수정인풋에 뿌리고, 수정되면 api에 전송하고
  // usemutation으로 수정된 값을 전송하고 수정된 값을 반영하는 로직 작성

  // 아 이해했다
  // 어차피 답안입혁페이지에 오면 해당되는 유저의 정보 별도로 fetch해서 올거니까 그 데이터 그냥 담아서 그대로 보여주고 저장하면되고
  // 각페이지마다 fetch 하면되니까 그냥 데이터가공할 필요없을듯?

  // getquerydata를 계속하는게 비효율적이라서 hooks나 utils함수로 만들어야될듯?

  const tableItems = useMemo(
    () => getManualSingleTableData(checkedStatus, checkedUpdateStatus),
    [subjectAnswer],
  );

  useEffect(() => {
    if (Object.keys(subjectAnswer).length > 0) {
      const allStatusCheck = Object.values(subjectAnswer).every(
        ({ status }) => status === "complete" || status === "none",
      );
      setIsAllStatusCheck(allStatusCheck);
    }
    setIsLoading(false);
  }, [subjectAnswer]);

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
