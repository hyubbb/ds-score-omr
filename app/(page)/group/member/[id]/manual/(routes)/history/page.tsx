"use client";

import React from "react";
import PageTitle from "@/components/Manual/PageTitle";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Commons/Form/Button/Button";
import Common from "@/components/Manual/CommonAnswer";
import UserInfo from "@/components/Manual/UserInfo";
import { useAnswer } from "../../_hooks/useAnswer";
import { useRecoilValue } from "recoil";
import { answerStatusState, subjectAnswerState } from "@/atoms/manual/atom";
import { TAnswer, TMethods } from "@/types/personal/types";

const Page = () => {
  const COMMON_ANSWER_LENGTH = 20;

  const subjectAnswer = useRecoilValue(subjectAnswerState);
  const answerStatus = useRecoilValue(answerStatusState);
  const methods = useForm<TMethods>({
    defaultValues: {
      answers:
        answerStatus.history === "complete"
          ? (subjectAnswer.history.answer as TAnswer[])
          : Array.from(
              {
                length: COMMON_ANSWER_LENGTH,
              },
              () => null,
            ),
      course1: "",
    },
  });

  const { handleAnswer, handleSubmit } = useAnswer(methods, "history");

  return (
    <FormProvider {...methods}>
      <div className="flex w-[1400px] flex-col gap-4 overflow-x-auto">
        <PageTitle>답안 직접 입력 - 4교시. 한국사</PageTitle>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <UserInfo subject="history" />

            <Common
              title="답안 입력"
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
