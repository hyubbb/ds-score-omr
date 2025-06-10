"use client";

import React, { useEffect, useState } from "react";
import PageTitle from "../../../../../../components/Manual/PageTitle";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Commons/Form/Button/Button";
import Common from "../../../../../../components/Manual/CommonAnswer";
import UserInfo from "../../../../../../components/Manual/UserInfo";
import { useAnswer } from "../../_hooks/useAnswer";
import { useRecoilValue } from "recoil";
import { TMethods } from "@/types/personal/types";
import useFetchData from "@/libs/hooks/manual/useFetchPersonalManualData";
import { userAttemptIdState, userManualDataState } from "@/atoms/user/atom";
import Spinner from "@/components/Commons/Spinner/Spinner";
import TitleText from "../../_components/TitleText";
import ButtonsContainer from "../../_components/Buttons";

const Page = () => {
  const COMMON_ANSWER_LENGTH = 20;

  const userAttemptId = useRecoilValue(userAttemptIdState);
  const userManualData = useRecoilValue(userManualDataState);

  const methods = useForm<TMethods>({
    defaultValues: {
      answers: Array.from(
        {
          length: COMMON_ANSWER_LENGTH,
        },
        () => null,
      ),
    },
  });

  const { setValue } = methods;

  // attemptId를 통해 답안 가져오는 훅
  useFetchData({ userAttemptId, subject: "history", setValue });

  const { handleAnswer, handleSubmit, isLoading } = useAnswer({
    methods,
    subject: "history",
    attemptId: userAttemptId || undefined,
    answerId: userManualData?.koHistoryAnswerId || undefined,
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <FormProvider {...methods}>
      <div className="flex w-[1400px] flex-col gap-4 overflow-x-auto">
        <TitleText color="history-color" bgColor="history-bg-color">
          한국사
        </TitleText>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <UserInfo subject="history" />
            <div className="flex flex-col items-center gap-6">
              <Common
                title="답안 입력"
                length={COMMON_ANSWER_LENGTH}
                prevLength={0}
                handleAnswerChange={handleAnswer}
                isShortAnswer={false}
              />
            </div>
            <ButtonsContainer />
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default Page;
