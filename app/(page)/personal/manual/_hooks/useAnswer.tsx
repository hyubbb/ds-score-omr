import { useAlert } from "@/libs/hooks/useAlert";
import { useRouter } from "next/navigation";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { answerStatusState, subjectAnswerState } from "@/atoms/manual/atom";
import { TAnswer, TMethods, TUserInfoType } from "@/types/personal/types";
import ShowErrorModal from "@/components/ShowErrorModal";
import { fetchWrapper } from "@/libs/utils/fetchWrapper";
import { queryClient } from "@/libs/utils/query/queryClient";
import { userInfoState, userManualDataState } from "@/atoms/user/atom";
import {
  SUBJECT_ID,
  SUBJECT_URL,
  SUBMISSION_TYPE,
} from "@/libs/utils/subjectChange";
import { useEffect, useState } from "react";
import postReplaceData from "@/libs/utils/manual/postReplaceData";
import { COURSE_LIST_EN } from "../../omr/_utils/utils2";

const getLabelByValue = (num: any) => {
  const newNum = Array.isArray(num) ? num.join("") : num;
  console.log(newNum);
  const subject = COURSE_LIST_EN?.inquiry?.find(
    (item: any) => +item.value == +newNum,
  );
  return subject ? subject?.label : "Not Found";
};

export const useAnswer = ({
  methods,
  subject,
  attemptId,
  answerId,
  type = "manual",
}: {
  methods: UseFormReturn<
    TMethods & { answers1?: TAnswer[]; answers2?: TAnswer[] }
  >;
  subject: string;
  attemptId?: number;
  answerId?: number;
  type?: "manual" | "omr";
}) => {
  const { openAlert, closeAlert } = useAlert();
  const { getValues, setValue } = methods;
  const userManualData = useRecoilValue(userManualDataState);
  const userInfo = useRecoilValue(userInfoState);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (userInfo) {
      setIsLoading(false);
    }
  }, [userInfo]);

  const handleAnswer = (e: any, index: number, subject?: string) => {
    const answerName =
      subject == "society"
        ? `answers1`
        : subject == "science"
          ? `answers2`
          : "answers";

    const value = getValues(`${answerName}.${index}`);

    if (!value) {
      return;
    }
    if (
      e.key === "." ||
      isNaN(Number(value)) ||
      !Number.isInteger(Number(value)) ||
      Number(value) < 1 ||
      Number(value) > 5 ||
      value === " "
    ) {
      setValue(`${answerName}.${index}`, null);
      openAlert({
        content: (
          <div>
            객관식 문제의 답안은 <br /> 1~5까지의 정수만 입력 가능합니다.
          </div>
        ),
        canClose: true,
        callBack: closeAlert,
      });
      return;
    }

    // 다음 입력 인풋으로 tab처리
    const nextInput = document.querySelector(
      `input[name="${answerName}.${index + 1}"]`,
    ) as HTMLElement;
    if (nextInput) {
      nextInput.focus();
    }
  };

  const handleShortAnswer = (e: any, index: number) => {
    const value = getValues(`answers.${index}`);

    if (index === 0 || !value) {
      return;
    }

    if (
      e.key === "." ||
      isNaN(Number(value)) ||
      !Number.isInteger(Number(value)) ||
      Number(value) < 0 ||
      Number(value) > 999 ||
      value === " "
    ) {
      setValue(`answers.${index}`, null);
      openAlert({
        content: (
          <div>
            주관식 문제의 답안은 <br /> 1자리 ~ 3자리의 숫자만 입력 가능합니다.
          </div>
        ),
        canClose: true,
        callBack: closeAlert,
      });
      return;
    }
  };

  const getUrlAndMethod = (
    answerId: number | undefined,
    basePath: string,
  ): { url: string; method: "put" | "post" } => {
    const url = answerId ? `${basePath}/${attemptId}` : basePath;
    const method = answerId ? "put" : "post";
    return { url, method };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const answerName =
      subject == "society"
        ? `answers1`
        : subject == "science"
          ? `answers2`
          : "answers";
    const hasBlank = getValues(`${answerName}`)?.some((item) => !item);
    console.log(hasBlank);
    const text = hasBlank
      ? "답안을 입력하지 않은 문항이 있습니다.\n 저장 하시겠습니까?"
      : "답안저장을 완료하시겠습니까?";

    openAlert({
      content: <div>{text}</div>,
      isCancel: true,
      callBack: async () => {
        if (subject == "inquiry") {
          if (getValues("course1") == getValues("course2")) {
            openAlert({
              content: "선택과목이 동일할 수 없습니다.",
              callBack: () => {
                closeAlert();
              },
            });
            return;
          }

          const { url: firstUrl, method: firstMethod } = getUrlAndMethod(
            userManualData?.firstExAnswerId || undefined,
            "/exam/answer/first-ex",
          );
          const { url: secondUrl, method: secondMethod } = getUrlAndMethod(
            userManualData?.secondExAnswerId || undefined,
            "/exam/answer/second-ex",
          );

          // 값을 공백이랑 0을 치환하는 함수
          const newAnswers1 = postReplaceData({
            data: getValues("answers1"),
            grade: 3,
            subject: "society",
            type,
          });

          const newAnswers2 = postReplaceData({
            data: getValues("answers2"),
            grade: 3,
            subject: "science",
            type,
          });

          await fetchWrapper[firstMethod](firstUrl, {
            attemptId: attemptId,
            answers: newAnswers1,
          });

          await fetchWrapper[secondMethod](secondUrl, {
            attemptId: attemptId,
            answers: newAnswers2,
          });

          const submission1 =
            type == "omr"
              ? getLabelByValue(getValues("course1"))
              : getValues("course1");
          const submission2 =
            type == "omr"
              ? getLabelByValue(getValues("course2"))
              : getValues("course2");

          const newSubmissionData = {
            [SUBMISSION_TYPE["society"]]: submission1,
            [SUBMISSION_TYPE["science"]]: submission2,
          };

          await fetchWrapper.put(
            `/fo-user/mock-exam-attempt/update-submission-exam/${attemptId}`,
            newSubmissionData,
          );
        } else {
          const submission = getValues("course");
          const submissionType =
            SUBMISSION_TYPE[subject as keyof typeof SUBMISSION_TYPE];
          const newSubmissionData = {
            // ...userInfo,
            [submissionType]: submission,
          };
          let newAnswers;
          const { url, method } = getUrlAndMethod(
            answerId,
            `/exam/answer/${SUBJECT_URL[subject]}`,
          );

          console.log(getValues("answers"));

          // 값을 공백이랑 0을 치환하는 함수
          newAnswers = postReplaceData({
            data: getValues("answers"),
            grade: 3,
            subject,
          });

          // console.log(url, method, SUBJECT_URL[subject], newAnswers);

          await fetchWrapper[method](url, {
            attemptId: attemptId,
            answers: newAnswers,
          });

          console.log(submission, getValues());

          // 선택과목이 변경되었을 경우에만 선택과목 저장
          if (
            submission &&
            submission !== userInfo[submissionType as keyof TUserInfoType]
          ) {
            await fetchWrapper.put(
              `/fo-user/mock-exam-attempt/update-submission-exam/${attemptId}`,
              newSubmissionData,
            );
          }
        }

        closeAlert();
        if (type == "manual") {
          router.push("/personal/manual/");
        } else {
          router.push("/personal/omr/list/");
        }
      },
    });
  };

  return { isLoading, handleAnswer, handleShortAnswer, handleSubmit };
};
