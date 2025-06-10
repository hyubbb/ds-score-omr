"use client";

import React, { useEffect } from "react";
import PageTitle from "@/components/Manual/PageTitle";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Commons/Form/Button/Button";
import UserInfo from "@/components/Manual/UserInfo";
import { useRecoilValue } from "recoil";
import { answerStatusState, subjectAnswerState } from "@/atoms/manual/atom";
import { TAnswer, TMethods } from "@/types/personal/types";
import { useAnswer } from "../../../../../../libs/hooks/group/useAnswer";
import { useQuery } from "@tanstack/react-query";
import { TGroupManualUser } from "@/types/manual/types";
import { fetchWithQuery } from "@/libs/utils/query/fetchWithQuery";
import GroupUserInfo from "@/components/Group/GroupUserInfo";
import Common from "../../../../../../components/Group/CommonAnswer";

const Page = () => {
  const COMMON_ANSWER_LENGTH = 20;

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
          answers: Array.from({ length: COMMON_ANSWER_LENGTH }, () => null),
        })),
      );
    }
  }, [userInfo, setValue]);

  const { handleAnswer, handleSubmit } = useAnswer(methods, "history");

  return (
    <FormProvider {...methods}>
      <div className="flex w-full flex-col gap-8 overflow-y-auto">
        <PageTitle>답안 직접 입력 - 4교시. 한국사</PageTitle>
        <form>
          <div className="flex flex-col gap-14">
            {/* <GroupUserInfo userInfo={userInfo} subject="korean" /> */}

            {watch("users")?.map((user: any, userIndex: number) => (
              <div key={userIndex} className="flex flex-col gap-6">
                <GroupUserInfo
                  userData={user}
                  index={userIndex}
                  subject="history"
                />
                <Common
                  title=""
                  length={COMMON_ANSWER_LENGTH}
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
                type="button"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default Page;
