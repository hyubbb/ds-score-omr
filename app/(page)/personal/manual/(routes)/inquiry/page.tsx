"use client";

import React, { useEffect } from "react";
import PageTitle from "../../../../../../components/Manual/PageTitle";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Commons/Form/Button/Button";
import Common from "../../../../../../components/Manual/CommonAnswer";
import UserInfo from "../../../../../../components/Manual/UserInfo";
import { useAnswer } from "../../_hooks/useAnswer";
import { useRecoilValue } from "recoil";
import { answerStatusState, subjectAnswerState } from "@/atoms/manual/atom";
import { TAnswer, TMethods } from "@/types/personal/types";
import useFetchData from "@/libs/hooks/manual/useFetchPersonalManualData";
import {
  userAttemptIdState,
  userInfoState,
  userManualDataState,
} from "@/atoms/user/atom";

import Spinner from "@/components/Commons/Spinner/Spinner";
import { COURSE_LIST } from "../../../omr/_utils/utils2";
import TitleText from "../../_components/TitleText";
import ButtonsContainer from "../../_components/Buttons";

const Page = () => {
  const SOCIETY_ANSWER_LENGTH = 20;
  const SCIENCE_ANSWER_LENGTH = 20;

  // const methods = useForm<TMethods>({
  //   defaultValues: {
  //     answers: Array.from(
  //       {
  //         length: SOCIETY_ANSWER_LENGTH + SCIENCE_ANSWER_LENGTH,
  //       },
  //       () => null,
  //     ),
  //     subject1: options[0][0].value + "",
  //     subject2: options[1][0].value + "",
  //   },
  // });

  const userAttemptId = useRecoilValue(userAttemptIdState);
  const userInfo = useRecoilValue(userInfoState);
  const methods = useForm<
    TMethods & { answers1?: TAnswer[]; answers2?: TAnswer[] }
  >({
    defaultValues: {
      answers1: Array.from({ length: SOCIETY_ANSWER_LENGTH }, () => null),
      answers2: Array.from({ length: SCIENCE_ANSWER_LENGTH }, () => null),
      course1: userInfo?.subFirstSubject || COURSE_LIST.inquiry[0].value + "",
      course2: userInfo?.subSecondSubject || COURSE_LIST.inquiry[1].value + "",
    },
  });

  const { setValue, watch } = methods;

  // attemptId를 통해 답안 가져오는 훅
  useFetchData({ userAttemptId, subject: "society", setValue });
  useFetchData({ userAttemptId, subject: "science", setValue });

  const { handleAnswer, handleSubmit, isLoading } = useAnswer({
    methods: methods,
    subject: "inquiry",
    attemptId: userAttemptId || undefined,
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <FormProvider {...methods}>
      <div className="flex w-[1400px] flex-col gap-4 overflow-x-auto">
        <TitleText color="inquiry-color" bgColor="inquiry-bg-color">
          탐구
        </TitleText>
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <UserInfo subject="inquiry" />
          <div className="flex flex-col items-center gap-6">
            <Common
              title="탐구 (제1선택) 답안 입력"
              length={SOCIETY_ANSWER_LENGTH}
              handleAnswerChange={handleAnswer}
              subject="society"
            />

            <Common
              title="탐구 (제2선택) 답안 입력"
              length={SCIENCE_ANSWER_LENGTH}
              handleAnswerChange={handleAnswer}
              subject="science"
            />

            <ButtonsContainer />
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default Page;
