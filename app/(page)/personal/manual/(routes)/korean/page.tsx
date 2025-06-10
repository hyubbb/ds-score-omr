"use client";

import React, { useEffect, useState } from "react";
import PageTitle from "../../../../../../components/Manual/PageTitle";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Commons/Form/Button/Button";
import Common from "../../../../../../components/Manual/CommonAnswer";
import { useAnswer } from "../../_hooks/useAnswer";
import UserInfo from "../../../../../../components/Manual/UserInfo";
import { useRecoilValue } from "recoil";
import { TMethods } from "@/types/personal/types";
import {
  userAttemptIdState,
  userInfoState,
  userManualDataState,
} from "@/atoms/user/atom";
import useFetchData from "@/libs/hooks/manual/useFetchPersonalManualData";
import { COURSE_LIST } from "../../../omr/_utils/utils2";
import Spinner from "@/components/Commons/Spinner/Spinner";
import TitleText from "../../_components/TitleText";
import ButtonsContainer from "../../_components/Buttons";

const Page = () => {
  const COMMON_ANSWER_LENGTH = 34;
  const OPTIONAL_ANSWER_LENGTH = 11;

  const userAttemptId = useRecoilValue(userAttemptIdState);
  const userManualData = useRecoilValue(userManualDataState);
  const userInfo = useRecoilValue(userInfoState);

  const methods = useForm<TMethods>({
    defaultValues: {
      answers: Array.from(
        { length: COMMON_ANSWER_LENGTH + OPTIONAL_ANSWER_LENGTH },
        () => "",
      ),
      course: userInfo?.koreanSubject || COURSE_LIST.korean[0].value + "",
    },
  });
  const { setValue } = methods;

  // attemptId를 통해 답안 가져오는 훅
  useFetchData({ userAttemptId, subject: "korean", setValue });

  const { isLoading, handleAnswer, handleSubmit } = useAnswer({
    methods,
    subject: "korean",
    attemptId: userAttemptId || undefined,
    answerId: userManualData?.koAnswerId || undefined,
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <FormProvider {...methods}>
      <div className="flex w-full flex-col gap-4 overflow-y-auto">
        <TitleText color="korean-color" bgColor="korean-bg-color">
          국어
        </TitleText>
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <UserInfo subject="korean" />
          <div className="flex flex-col items-center justify-center gap-10">
            <Common
              title="공통과목 답안 입력"
              length={COMMON_ANSWER_LENGTH}
              handleAnswerChange={handleAnswer}
              bgType="another"
            />
            <Common
              title="선택과목 답안 입력"
              length={OPTIONAL_ANSWER_LENGTH}
              prevLength={COMMON_ANSWER_LENGTH}
              handleAnswerChange={handleAnswer}
            />
          </div>
          <ButtonsContainer />
        </form>
      </div>
    </FormProvider>
  );
};

export default Page;
