"use client";

import React from "react";
import PageTitle from "@/components/Manual/PageTitle";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Commons/Form/Button/Button";
import Common from "@/components/Manual/CommonAnswer";
import UserInfo from "@/components/Manual/UserInfo";
import { useRecoilValue } from "recoil";
import { answerStatusState, subjectAnswerState } from "@/atoms/manual/atom";
import { TAnswer, TMethods } from "@/types/personal/types";
import { useAnswer } from "../../_hooks/useAnswer";

const Page = () => {
  const COMMON_ANSWER_LENGTH = 45;
  const subjectAnswer = useRecoilValue(subjectAnswerState);
  const answerStatus = useRecoilValue(answerStatusState);
  const methods = useForm<TMethods>({
    defaultValues: {
      answers:
        answerStatus.english === "complete"
          ? (subjectAnswer.english.answer as TAnswer[])
          : Array.from(
              {
                length: COMMON_ANSWER_LENGTH,
              },
              () => null,
            ),
    },
  });

  const { handleAnswer, handleSubmit } = useAnswer(methods, "english");

  return (
    <FormProvider {...methods}>
      <div className="flex w-[1400px] flex-col gap-4 overflow-x-auto">
        <PageTitle>답안 직접 입력 - 3교시. 영어</PageTitle>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <UserInfo subject="english" />

            <Common
              title="공통과목 답안 입력"
              length={COMMON_ANSWER_LENGTH}
              prevLength={0}
              handleAnswerChange={handleAnswer}
              isShortAnswer={false}
            />

            <div className="flex justify-center">
              <Button
                variant="defaultOutlineBold"
                size="lg"
                label="저장"
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default Page;
