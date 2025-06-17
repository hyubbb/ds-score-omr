"use client";

import PageTitle from "@/components/Manual/PageTitle";
import { TData, TUserInfoType, TUserManualData } from "@/types/personal/types";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Commons/Form/Button/Button";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { omrListDataState } from "@/atoms/manual/atom";
import Spinner from "@/components/Commons/Spinner/Spinner";
import { IColumns } from "@/types/interface/common";
import ColTable from "@/components/Manual/Coltable";
import { userAttemptIdState } from "@/atoms/user/atom";
import {
  getManualSingleTableData,
  manualOMRColumns,
} from "@/libs/utils/manual/tableData";
import { useAnswerStatus } from "@/libs/hooks/manual/useAnswerStatus";
import { omrAnswerState } from "@/atoms/omr/atom";
import { useAlert } from "@/libs/hooks/useAlert";
import { fetchSubjectStatusData } from "@/app/actions/exam";

// 컴포넌트 인터페이스 정의
interface ContainerProps {
  initData: TData[];
  attemptId: string;
}

const Container = ({ initData, attemptId }: ContainerProps) => {
  // Hooks 초기화
  const router = useRouter();
  const methods = useForm();
  const { openAlert, closeAlert } = useAlert();

  // Recoil 상태 관리
  const [omrListState, setOmrListState] = useRecoilState(omrListDataState);
  const [userAttemptId, setUserAttemptId] = useRecoilState(userAttemptIdState);
  const [omrAnswerStatus, setOmrAnswerStatus] = useRecoilState(omrAnswerState);

  // 로컬 상태 관리
  const [isLoading, setIsLoading] = useState(true);
  const [isAllStatusCheck, setIsAllStatusCheck] = useState(false);

  // 업로드 현황 데이터 조회
  const { data: subjectStatusData, isLoading: subjectStatusLoading } = useQuery(
    {
      queryKey: ["personal", "subjectStatus"],
      queryFn: () => fetchSubjectStatusData(),
      refetchOnMount: "always",
      staleTime: 1000,
      retry: 2,
    },
  );

  // 유틸리티 함수
  const { checkedStatus, checkedUpdateStatus, checkedOMRUpdateStatus } =
    useAnswerStatus();

  // 테이블 컬럼 정의
  const columns: IColumns[] = useMemo(
    () => [
      { header: "영역", name: ["subject"], width: "120", align: "center" },
      {
        header: "확인 현황",
        name: ["status"],
        width: "120",
        align: "center",
        editor: (status: string) => checkedStatus(status),
      },
      {
        header: "답안 입력 결과 확인 / 수정",
        name: ["subjectEn"],
        width: "120",
        align: "center",
        editor: (value: string) => (
          <Button
            label="OMR 확인"
            variant="primaryFill"
            size="sm"
            className="w-20"
            onClick={() => router.push(`/personal/omr/list/${value}`)}
          />
        ),
      },
    ],
    [router, checkedStatus],
  );

  // 테이블 데이터 생성
  const colData = useMemo(
    () =>
      getManualSingleTableData(
        omrAnswerStatus,
        subjectStatusData,
        checkedStatus,
        checkedOMRUpdateStatus,
      ),
    [omrAnswerStatus, subjectStatusData, checkedStatus, checkedOMRUpdateStatus],
  );

  // 초기 데이터 로딩
  useEffect(() => {
    if (!omrListState.length) {
      setOmrListState(initData);
    }
    setIsLoading(false);
  }, [initData, omrListState.length, setOmrListState]);

  // OMR 답안 상태 관리
  useEffect(() => {
    if (omrAnswerStatus) {
      setUserAttemptId(+attemptId);
      setOmrAnswerStatus(omrAnswerStatus);
    }
  }, [omrAnswerStatus, attemptId, setUserAttemptId, setOmrAnswerStatus]);

  // 과목 상태 체크
  useEffect(() => {
    if (omrAnswerStatus && subjectStatusData) {
      const attemptedKeys = Object.keys(subjectStatusData).filter(
        (key) => subjectStatusData[key as keyof TUserInfoType] === "ATTEMPTED",
      );

      const keyMapping: Record<string, keyof TUserManualData> = {
        subFirstSubjectStatus: "firstExAnswerId",
        subSecondSubjectStatus: "secondExAnswerId",
      };

      const hasNullValue = attemptedKeys.some((attemptedKey) => {
        const mappedKey = keyMapping[attemptedKey] as keyof TUserManualData;
        return mappedKey && omrAnswerStatus[mappedKey] === null;
      });

      setIsAllStatusCheck(hasNullValue);
    }
  }, [omrAnswerStatus, subjectStatusData]);

  // 제출 핸들러
  const onSubmit = () => {
    openAlert({
      content: "최종 제출한 답안은 수정이 불가합니다. 신중하게 제출해주세요.",
      canClose: true,
      isCancel: true,
      callBack: () => {
        closeAlert();
        router.push("/personal/omr/success");
      },
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <FormProvider {...methods}>
      <div className="flex w-[1000px] flex-col gap-8">
        <PageTitle>OMR 업로드 현황</PageTitle>
        <div className="flex flex-col gap-4">
          <ColTable
            isNumber={false}
            items={colData}
            columns={manualOMRColumns}
          />
        </div>
        <div className="flex justify-center">
          <Button
            type="button"
            variant="defaultBlack"
            size="md"
            label="최종 제출"
            onClick={onSubmit}
            disabled={isAllStatusCheck}
          />
        </div>
      </div>
    </FormProvider>
  );
};

export default Container;
