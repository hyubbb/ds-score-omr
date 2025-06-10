"use client";

import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useAnswer } from "../../../../../../libs/hooks/group/useAnswer";
import Button from "@/components/Commons/Form/Button/Button";
import PageTitle from "@/components/Manual/PageTitle";
import { COURSE_LIST } from "@/app/(page)/personal/omr/_utils/utils";
import GroupUserInfo from "@/components/Group/GroupUserInfo";
import { useQuery } from "@tanstack/react-query";
import { TGroupManualUser } from "@/types/manual/types";
import { fetchWithQuery } from "@/libs/utils/query/fetchWithQuery";
import Common from "../../../../../../components/Group/CommonAnswer";

const Page = () => {
  const COMMON_ANSWER_LENGTH = 15;
  const COMMON_SHORT_ANSWER_LENGTH = 7;
  const OPTIONAL_ANSWER_LENGTH = 6;
  const OPTIONAL_SHORT_ANSWER_LENGTH = 2;
  const TOTAL_ANSWER_LENGTH =
    COMMON_ANSWER_LENGTH +
    COMMON_SHORT_ANSWER_LENGTH +
    OPTIONAL_ANSWER_LENGTH +
    OPTIONAL_SHORT_ANSWER_LENGTH;

  const methods = useForm<TGroupManualUser>({
    defaultValues: {
      users: [],
    },
  });
  const { setValue, watch, getValues } = methods;

  const { data: userData } = useQuery<{ data: any[] }>({
    queryKey: ["group", "manual"],
    queryFn: () => fetchWithQuery("http://localhost:3000/api/manual/group"),
    staleTime: 1000 * 60 * 60 * 24, // 24시간
  });

  const userInfo = userData?.data;

  // userInfo가 로드된 후 defaultValues 설정
  useEffect(() => {
    if (userInfo) {
      setValue(
        "users",
        userInfo.map((user) => ({
          ...user,
          answers: Array.from({ length: TOTAL_ANSWER_LENGTH }, () => null),
          selectedSubject: COURSE_LIST.math[0].value, // 기본 과목 설정
        })),
      );
    }
  }, [userInfo, setValue]);

  const { handleAnswer, handleShortAnswer, handleSubmit } = useAnswer(
    methods,
    "math",
  );

  return (
    <FormProvider {...methods}>
      <div className="flex w-full flex-col gap-8 overflow-y-auto">
        <PageTitle>답안 직접 입력 - 2교시. 수학</PageTitle>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-14">
            {watch("users")?.map((user: any, userIndex: number) => (
              <div key={userIndex} className="flex flex-col gap-6">
                <GroupUserInfo
                  userData={user}
                  index={userIndex}
                  subject="math"
                />
                <Common
                  title=""
                  length={TOTAL_ANSWER_LENGTH}
                  prevLength={0}
                  handleAnswerChange={(e, answerIndex) =>
                    handleAnswer(e, userIndex, answerIndex)
                  }
                  userIndex={userIndex}
                  isShortAnswer={false}
                  divideNum={0}
                />
              </div>
            ))}
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
