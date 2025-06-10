"use client";

import React, { useEffect, useState } from "react";
import PageTitle from "../../../../../../components/Manual/PageTitle";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Commons/Form/Button/Button";
import Common from "../../../../../../components/Manual/CommonAnswer";
import { useAnswer } from "../../_hooks/useAnswer";
import UserInfo from "../../../../../../components/Manual/UserInfo";
import { useRecoilValue } from "recoil";
import { answerStatusState, subjectAnswerState } from "@/atoms/manual/atom";
import { TAnswer, TMethods } from "@/types/personal/types";
import useFetchData from "@/libs/hooks/manual/useFetchPersonalManualData";
import {
  userAttemptIdState,
  userInfoState,
  userManualDataState,
} from "@/atoms/user/atom";
import TitleText from "../../_components/TitleText";
import Spinner from "@/components/Commons/Spinner/Spinner";
import ButtonsContainer from "../../_components/Buttons";

const Page = () => {
  const COMMON_ANSWER_LENGTH = 45;

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
  useFetchData({ userAttemptId, subject: "english", setValue });

  const { handleAnswer, handleSubmit, isLoading } = useAnswer({
    methods,
    subject: "english",
    attemptId: userAttemptId || undefined,
    answerId: userManualData.enAnswerId || undefined,
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <FormProvider {...methods}>
      <div className="flex w-[1400px] flex-col gap-4 overflow-x-auto">
        <TitleText color="english-color" bgColor="english-bg-color">
          영어
        </TitleText>
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <UserInfo subject="english" />
          <div className="flex flex-col items-center gap-10">
            <Common
              title="답안 입력"
              length={COMMON_ANSWER_LENGTH}
              prevLength={0}
              handleAnswerChange={handleAnswer}
              isShortAnswer={false}
            />

            <ButtonsContainer />
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default Page;
