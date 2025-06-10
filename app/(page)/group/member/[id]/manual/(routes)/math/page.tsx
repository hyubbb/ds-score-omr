"use client";

import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import Common from "@/components/Manual/CommonAnswer";
import { useAnswer } from "../../_hooks/useAnswer";
import UserInfo from "@/components/Manual/UserInfo";
import Button from "@/components/Commons/Form/Button/Button";
import { useRecoilValue } from "recoil";
import { answerStatusState, subjectAnswerState } from "@/atoms/manual/atom";
import { TAnswer, TMethods } from "@/types/personal/types";
import PageTitle from "@/components/Manual/PageTitle";

const Page = () => {
  const COMMON_ANSWER_LENGTH = 15;
  const COMMON_SHORT_ANSWER_LENGTH = 7;
  const OPTIONAL_ANSWER_LENGTH = 6;
  const OPTIONAL_SHORT_ANSWER_LENGTH = 2;

  const subjectAnswer = useRecoilValue(subjectAnswerState);
  const answerStatus = useRecoilValue(answerStatusState);

  const methods = useForm<TMethods>({
    defaultValues: {
      answers: Array.from(
        { length: COMMON_ANSWER_LENGTH + OPTIONAL_ANSWER_LENGTH },
        () => "",
      ),
      course1: subjectAnswer.math.type,
    },
  });
  const { setValue } = methods;

  useEffect(() => {
    if (answerStatus.math === "complete") {
      setValue("answers", subjectAnswer.math.answer as TAnswer[]);
      setValue("course1", subjectAnswer.math.type);
    }
  }, [answerStatus.math, subjectAnswer.math, setValue]);

  const { handleAnswer, handleShortAnswer, handleSubmit } = useAnswer(
    methods,
    "math",
  );

  return (
    <FormProvider {...methods}>
      <div className="flex w-[1400px] flex-col gap-4 overflow-x-auto">
        <PageTitle>답안 직접 입력 - 2교시. 수학</PageTitle>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <UserInfo subject="math" />
            <Common
              title="공통과목 답안 입력"
              length={COMMON_ANSWER_LENGTH}
              prevLength={0}
              handleAnswerChange={handleAnswer}
              isShortAnswer={false}
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
