"use client";

import React from "react";
import PageTitle from "../../../../../../components/Manual/PageTitle";
import { FormProvider, useForm } from "react-hook-form";

import Common from "../../../../../../components/Manual/CommonAnswer";
import UserInfo from "../../../../../../components/Manual/UserInfo";
import Button from "@/components/Commons/Form/Button/Button";
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
import { useAnswer } from "../../_hooks/useAnswer";
import ButtonsContainer from "../../_components/Buttons";

const Page = () => {
  const COMMON_ANSWER_LENGTH = 15;
  const COMMON_SHORT_ANSWER_LENGTH = 7;
  const OPTIONAL_ANSWER_LENGTH = 6;
  const OPTIONAL_SHORT_ANSWER_LENGTH = 2;

  const userAttemptId = useRecoilValue(userAttemptIdState);
  const userManualData = useRecoilValue(userManualDataState);
  const userInfo = useRecoilValue(userInfoState);

  const methods = useForm<TMethods>({
    defaultValues: {
      answers: Array.from(
        {
          length:
            COMMON_ANSWER_LENGTH +
            COMMON_SHORT_ANSWER_LENGTH +
            OPTIONAL_ANSWER_LENGTH +
            OPTIONAL_SHORT_ANSWER_LENGTH,
        },
        () => null,
      ),
      course: userInfo?.mathSubject || COURSE_LIST.math[0].value + "",
    },
  });

  const { setValue } = methods;

  // attemptId를 통해 답안 가져오는 훅
  useFetchData({ userAttemptId, subject: "math", setValue });

  const { handleAnswer, handleShortAnswer, handleSubmit, isLoading } =
    useAnswer({
      methods,
      subject: "math",
      attemptId: userAttemptId || undefined,
      answerId: userManualData?.mathAnswerId || undefined,
    });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <FormProvider {...methods}>
      <div className="flex min-w-[700px] flex-col gap-4 overflow-x-auto">
        <TitleText color="math-color" bgColor="math-bg-color">
          수학
        </TitleText>
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <UserInfo subject="math" />
          <div className="flex flex-col items-center gap-10">
            <Common
              title="공통과목 답안 입력"
              length={COMMON_ANSWER_LENGTH}
              prevLength={0}
              handleAnswerChange={handleAnswer}
              isShortAnswer={false}
              bgType="another"
            />
            <Common
              title="공통과목 단답형 답안 입력"
              length={COMMON_SHORT_ANSWER_LENGTH}
              prevLength={COMMON_ANSWER_LENGTH}
              handleAnswerChange={handleShortAnswer}
              isShortAnswer={true}
            />
            <Common
              title="선택과목 답안 입력"
              length={OPTIONAL_ANSWER_LENGTH}
              prevLength={COMMON_ANSWER_LENGTH + COMMON_SHORT_ANSWER_LENGTH}
              handleAnswerChange={handleAnswer}
              isShortAnswer={false}
              bgType="another"
            />
            <Common
              title="선택과목 단답형 답안 입력"
              length={OPTIONAL_SHORT_ANSWER_LENGTH}
              prevLength={
                COMMON_ANSWER_LENGTH +
                COMMON_SHORT_ANSWER_LENGTH +
                OPTIONAL_ANSWER_LENGTH
              }
              handleAnswerChange={handleShortAnswer}
              isShortAnswer={true}
            />
          </div>
          <ButtonsContainer />
        </form>
      </div>
    </FormProvider>
  );
};

export default Page;
