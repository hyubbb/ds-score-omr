"use client";

import { omrAnswerState } from "@/atoms/omr/atom";
import { fetchWrapper } from "@/libs/utils/fetchWrapper";
import fetchReplaceData from "@/libs/utils/manual/fetchReplaceData";
import { SUBJECT_ID, SUBJECT_URL } from "@/libs/utils/subjectChange";
import { TUserManualData } from "@/types/personal/types";
import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useRecoilState } from "recoil";

type TProps = {
  userAttemptId: number | null;
  subject: string;
  setValue: UseFormSetValue<any>;
  type?: "omr" | "manual";
};

const useFetchData = ({
  userAttemptId,
  subject,
  setValue,
  type = "manual",
}: TProps) => {
  const urlSubject = SUBJECT_URL[subject];

  const [userManualData, _] = useRecoilState(omrAnswerState);

  const fetchData = async (userAttemptId: number) => {
    const res = await fetchWrapper.get(
      `/exam/answer/${urlSubject}/${userAttemptId}`,
    );

    if (res) {
      // 폼 상태관리 근데 필요한가?
      if (subject === "society") {
        const newAnswers = fetchReplaceData({
          data: res.answers,
          grade: 3,
          subject,
        });

        if (type == "omr") {
          return setValue("answers.0", newAnswers);
        }

        return setValue("answers1", newAnswers);
      }
      if (subject === "science") {
        const newAnswers = fetchReplaceData({
          data: res.answers,
          grade: 3,
          subject,
        });
        if (type == "omr") {
          return setValue("answers.1", newAnswers);
        }

        return setValue("answers2", newAnswers);
      }

      const newAnswers = fetchReplaceData({
        data: res.answers,
        grade: 3,
        subject,
      });

      return setValue("answers", newAnswers);
    }
  };

  useEffect(() => {
    // console.log(userAttemptId, userManualData, SUBJECT_ID, subject);

    // const checkSubject = subject === "inquiry" ? "society" : subject;

    if (
      userAttemptId &&
      userManualData?.[SUBJECT_ID[subject] as keyof TUserManualData]
    ) {
      // fetchData(userAttemptId);
    }
  }, [userAttemptId, userManualData, setValue, subject]);
};

export default useFetchData;
