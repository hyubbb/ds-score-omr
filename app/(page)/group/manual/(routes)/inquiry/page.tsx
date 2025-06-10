"use client";

import React, { useEffect } from "react";
import PageTitle from "@/components/Manual/PageTitle";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Commons/Form/Button/Button";
import Common from "@/components/Manual/CommonAnswer";
import UserInfo from "@/components/Manual/UserInfo";
import { useAnswer } from "../../../../../../libs/hooks/group/useAnswer";
import { useRecoilValue } from "recoil";
import { answerStatusState, subjectAnswerState } from "@/atoms/manual/atom";
import { TAnswer, TMethods } from "@/types/personal/types";
import { COURSE_LIST } from "@/app/(page)/personal/omr/_utils/utils";
import { userInfoState } from "@/atoms/user/atom";
import { TGroupManualUser } from "@/types/manual/types";

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
  //     course1: options[0][0].value + "",
  //     course2: options[1][0].value + "",
  //   },
  // });

  const userInfo = useRecoilValue(userInfoState);
  const subjectAnswer = useRecoilValue(subjectAnswerState);
  const answerStatus = useRecoilValue(answerStatusState);

  const methods = useForm<TMethods | TGroupManualUser>({
    defaultValues: {
      answers: Array.from(
        {
          length: SOCIETY_ANSWER_LENGTH + SCIENCE_ANSWER_LENGTH,
        },
        () => null,
      ),
      course1: COURSE_LIST.inquiry[0].value + "",
      course2: COURSE_LIST.inquiry[1].value + "",
    },
  });

  const { setValue } = methods;

  useEffect(() => {
    if (answerStatus.inquiry === "complete") {
      setValue(
        "answers",
        subjectAnswer.society.answer.concat(
          subjectAnswer.science.answer,
        ) as TAnswer[],
      );
      setValue("course1", subjectAnswer.society.type);
      setValue("course2", subjectAnswer.science.type);
    }
  }, [
    answerStatus.inquiry,
    subjectAnswer.society,
    subjectAnswer.science,
    setValue,
  ]);

  const { handleAnswer, handleSubmit } = useAnswer(methods, "inquiry");

  return (
    <FormProvider {...methods}>
      <div className="flex w-[1400px] flex-col gap-4 overflow-x-auto">
        <PageTitle>답안 직접 입력 - 4교시. 탐구</PageTitle>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <UserInfo subject="inquiry" />

            {/* <Common
              title="탐구 (제1선택) 답안 입력"
              length={SOCIETY_ANSWER_LENGTH}
              prevLength={0}
              handleAnswerChange={handleAnswer}
              isShortAnswer={false}
            />
            <Common
              title="탐구 (제2선택) 답안 입력"
              length={SCIENCE_ANSWER_LENGTH}
              prevLength={SOCIETY_ANSWER_LENGTH}
              handleAnswerChange={handleAnswer}
              isShortAnswer={false}
              isInitNumber={true}
            /> */}

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
