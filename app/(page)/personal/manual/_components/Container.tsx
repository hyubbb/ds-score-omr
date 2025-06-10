"use client";

import React, { useEffect, useState, useMemo } from "react";
import PageTitle from "@/components/Manual/PageTitle";
import ColTable from "@/components/Manual/Coltable";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Commons/Form/Button/Button";
import { useRecoilState, useSetRecoilState } from "recoil";
import Spinner from "@/components/Commons/Spinner/Spinner";
import {
  getManualSingleTableData,
  manualSingleColumns,
} from "@/libs/utils/manual/tableData";
import { useAnswerStatus } from "@/libs/hooks/manual/useAnswerStatus";
import {
  userAttemptIdState,
  userInfoState,
  userManualDataState,
} from "@/atoms/user/atom";
import { useQuery } from "@tanstack/react-query";
import { fetchWithQuery } from "@/libs/utils/query/fetchWithQuery";
import { TUserInfoType, TUserManualData } from "@/types/personal/types";
import { useRouter } from "next/navigation";
import { fetchWrapper } from "@/libs/utils/fetchWrapper";
import { getCookie } from "cookies-next";
import { setRecoil } from "recoil-nexus";
import { errorState } from "@/atoms/atom";
import { useAlert } from "@/libs/hooks/useAlert";

const Container = ({ attemptId }: { attemptId: string }) => {
  const methods = useForm();
  const { handleSubmit } = methods;
  const router = useRouter();
  const { openAlert, closeAlert } = useAlert();
  const [isAllStatusCheck, setIsAllStatusCheck] = useState(false);

  const [userAttemptId, setUserAttemptId] = useRecoilState(userAttemptIdState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [userManualData, setUserManualData] =
    useRecoilState(userManualDataState);

  const { checkedStatus, checkedUpdateStatus } = useAnswerStatus();

  const { data: queryStatusData, isLoading: queryStatusLoading } =
    useQuery<TUserManualData>({
      queryKey: ["personal", "manual"],
      queryFn: () => fetchWithQuery(`/exam/answer/ids/${attemptId}`),
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
        checkedUpdateStatus,
      ),
    [queryStatusData, subjectStatusData],
  );

  useEffect(() => {
    if (queryUserInfoData) {
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

  const onSubmit = async () => {
    // 제출완료시
    // 제출완료 api 연동 해야됨
    // const reqData = {
    //   attemptId: 2,
    //   answers: subjectAnswer,
    // };
    // fetch("https://dev-service.api.dsdo.wanso.kr/api/v1/exam/answer/ko", {
    //   method: "POST",
    //   body: JSON.stringify(reqData),
    // });

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
        fetchWrapper.post("/socket/send/answer", {
          attemptId: userAttemptId,
          mockExamId: getCookie("mockExamId"),
          memberNo: getCookie("memberNo"),
        });
        closeAlert();
        router.push("/personal/manual/success");
      },
    });
  };

  if (queryStatusLoading || queryUserInfoLoading || subjectStatusLoading) {
    return <Spinner />;
  }

  return (
    <FormProvider {...methods}>
      <div className="flex w-[1000px] flex-col gap-8 overflow-x-auto">
        <PageTitle>답안 입력 현황</PageTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-10">
            <ColTable
              isNumber={false}
              items={colData}
              columns={manualSingleColumns}
            />
            <div className="flex justify-center">
              <Button
                type="submit"
                variant="defaultBlack"
                size="md"
                label="최종 제출"
                disabled={isAllStatusCheck}
              />
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default Container;
