"use client";

import PageTitle from "@/components/Manual/PageTitle";
import {
  TData,
  TOmrList,
  TUserInfoType,
  TUserManualData,
} from "@/types/personal/types";
import { DehydratedState, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Commons/Form/Button/Button";
import { useRouter } from "next/navigation";
import { useRecoilState, useSetRecoilState } from "recoil";
import { omrListDataState } from "@/atoms/manual/atom";
import Spinner from "@/components/Commons/Spinner/Spinner";
import { IColumns } from "@/types/interface/common";
// import ColTable from "@/components/Commons/Table/Coltable";
import ColTable from "@/components/Manual/Coltable";
import { fetchWithQuery } from "@/libs/utils/query/fetchWithQuery";
import {
  userAttemptIdState,
  userInfoState,
  userManualDataState,
} from "@/atoms/user/atom";
import {
  getManualSingleTableData,
  manualOMRColumns,
  manualSingleColumns,
} from "@/libs/utils/manual/tableData";
import { useAnswerStatus } from "@/libs/hooks/manual/useAnswerStatus";
import { getCookie } from "cookies-next";
import { setRecoil } from "recoil-nexus";
import { errorState } from "@/atoms/atom";
import { fetchWrapper } from "@/libs/utils/fetchWrapper";
import { useAlert } from "@/libs/hooks/useAlert";

const Container2 = ({
  initData,
  attemptId,
}: {
  initData: TData[];
  attemptId: string;
}) => {
  const router = useRouter();
  const methods = useForm();
  const { openAlert, closeAlert } = useAlert();
  const [omrListState, setOmrListState] = useRecoilState(omrListDataState);
  const [isLoading, setIsLoading] = useState(true);
  const [isAllStatusCheck, setIsAllStatusCheck] = useState(false);

  const [userAttemptId, setUserAttemptId] = useRecoilState(userAttemptIdState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const setUserManualData = useSetRecoilState(userManualDataState);

  useEffect(() => {
    if (initData) {
      setOmrListState(initData);
      setIsLoading(false);
    }
  }, [initData]);

  const columns: IColumns[] = [
    { header: "영역", name: ["subject"], width: "120", align: "center" },

    {
      header: "확인 현황",
      name: ["status"],
      width: "120",
      align: "center",
      editor: (status: string) => {
        return checkedStatus(status);
      },
    },
    {
      header: "답안 입력 결과 확인 / 수정",
      name: ["subjectEn"],
      width: "120",
      align: "center",
      editor: (value: string) => {
        return (
          <Button
            label={`OMR 확인`}
            variant="primaryFill"
            size="sm"
            className="w-20"
            onClick={() => {
              router.push(`/personal/omr/list/${value}`);
            }}
          />
        );
      },
    },
  ];

  const { checkedStatus, checkedUpdateStatus, checkedOMRUpdateStatus } =
    useAnswerStatus();

  const { data: queryStatusData, isLoading: queryStatusLoading } =
    useQuery<TUserManualData>({
      queryKey: ["personal", "manual"],
      // queryFn: () => fetchWithQuery(`/exam/answer/ids/${attemptId}`),
      queryFn: async () => {
        return {
          koAnswerId: 28,
          mathAnswerId: 30,
          enAnswerId: null,
          koHistoryAnswerId: null,
          firstExAnswerId: null,
          secondExAnswerId: 1,
        };
      },
      refetchOnMount: "always",
      staleTime: 1000,
      retry: 2,
    });

  const { data: queryUserInfoData, isLoading: queryUserInfoLoading } =
    useQuery<TUserInfoType>({
      queryKey: ["personal", "info"],
      queryFn: () =>
        fetchWithQuery(
          `/fo-user/mock-exam-attempt/submission-exam/${attemptId}`,
        ),
      refetchOnMount: "always",
      staleTime: 1000,
      retry: 2,
    });

  const { data: subjectStatusData, isLoading: subjectStatusLoading } =
    useQuery<TUserInfoType>({
      queryKey: ["personal", "subjectStatus"],
      queryFn: () =>
        fetchWithQuery(
          `/fo-user/mock-exam-attempt/attemptId/${attemptId}/status`,
        ),
      refetchOnMount: "always",
      staleTime: 1000,
      retry: 2,
    });

  const colData = useMemo(
    () =>
      getManualSingleTableData(
        queryStatusData,
        subjectStatusData,
        checkedStatus,
        checkedOMRUpdateStatus,
      ),
    [queryStatusData, subjectStatusData],
  );

  useEffect(() => {
    if (queryUserInfoData) {
      console.log(queryUserInfoData);
      setUserInfo(queryUserInfoData);
    }
  }, [queryUserInfoData]);

  useEffect(() => {
    if (queryStatusData) {
      setUserAttemptId(+attemptId); // 임시로 지정
      setUserManualData(queryStatusData);
    }
  }, [queryStatusData]);

  useEffect(() => {
    if (queryStatusData && subjectStatusData) {
      const attemptedKeys = Object.keys(subjectStatusData).filter(
        (key) => subjectStatusData[key] === "ATTEMPTED",
      );

      // 과목별 매칭 규칙 정의
      const keyMapping: Record<string, string> = {
        subFirstSubjectStatus: "firstExAnswerId",
        subSecondSubjectStatus: "secondExAnswerId",
      };

      // attemptedKeys의 앞 두 자리 또는 지정된 키 매핑 기준으로 queryStatusData의 값 확인
      const hasNullValue = attemptedKeys.some((attemptedKey) => {
        const mappedKey =
          keyMapping[attemptedKey] || attemptedKey.slice(0, 2) + "AnswerId"; // 기본 매칭 로직 적용
        return queryStatusData[mappedKey] === null;
      });

      setIsAllStatusCheck(hasNullValue);
    }
  }, [queryStatusData, subjectStatusData]);

  const onSubmit = () => {
    // 제출완료시
    // 제출완료 api 연동 해야됨
    if (!getCookie("mockExamId") || !getCookie("memberNo")) {
      setRecoil(errorState, {
        isError: true,
        message: "시험 정보가 존재하지 않습니다.",
        type: "home",
      });
      return;
    }

    openAlert({
      content: "최종 제출한 답안은 수정이 불가합니다. 신중하게 제출해주세요.",
      canClose: true,
      isCancel: true,
      callBack: () => {
        // fetchWrapper.post("/socket/send/answer", {
        //   attemptId: userAttemptId,
        //   mockExamId: getCookie("mockExamId"),
        //   memberNo: getCookie("memberNo"),
        // });
        closeAlert();
        router.push("/personal/manual/success");
      },
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <FormProvider {...methods}>
      <div className="flex w-[1000px] flex-col gap-8 overflow-x-auto">
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

export default Container2;
