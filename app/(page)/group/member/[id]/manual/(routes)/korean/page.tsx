"use client";

import React, { useEffect } from "react";
import PageTitle from "@/components/Manual/PageTitle";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Commons/Form/Button/Button";
import Common from "@/components/Manual/CommonAnswer";
import { useAnswer } from "../../_hooks/useAnswer";
import UserInfo from "@/components/Manual/UserInfo";
import { useRecoilValue } from "recoil";
import { answerStatusState, subjectAnswerState } from "@/atoms/manual/atom";
import { TAnswer, TMethods } from "@/types/personal/types";
import { COURSE_LIST } from "@/app/(page)/personal/omr/_utils/utils2";

const Page = () => {
  const COMMON_ANSWER_LENGTH = 34;
  const OPTIONAL_ANSWER_LENGTH = 11;
  const subjectAnswer = useRecoilValue(subjectAnswerState);
  const answerStatus = useRecoilValue(answerStatusState);

  const methods = useForm<TMethods>({
    defaultValues: {
      answers: Array.from(
        { length: COMMON_ANSWER_LENGTH + OPTIONAL_ANSWER_LENGTH },
        () => "",
      ),
      course1: COURSE_LIST.korean[0].value + "",
    },
  });
  const { setValue } = methods;

  useEffect(() => {
    if (answerStatus.korean === "complete") {
      setValue("answers", subjectAnswer.korean.answer as TAnswer[]);
      setValue("course1", subjectAnswer.korean.type);
    }
  }, [answerStatus.korean, subjectAnswer.korean, setValue]);

  const { handleAnswer, handleSubmit } = useAnswer(methods, "korean");

  return (
    <FormProvider {...methods}>
      <div className="flex w-full flex-col gap-4 overflow-y-auto">
        <PageTitle>답안 직접 입력 - 1교시. 국어</PageTitle>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <UserInfo subject="korean" />
            <Common
              title="공통과목 답안 입력"
              length={COMMON_ANSWER_LENGTH}
              prevLength={0}
              handleAnswerChange={handleAnswer}
              isShortAnswer={false}
            />
            <Common
              title="선택과목 답안 입력"
              length={OPTIONAL_ANSWER_LENGTH}
              prevLength={COMMON_ANSWER_LENGTH}
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
