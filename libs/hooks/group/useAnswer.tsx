import { useAlert } from "@/libs/hooks/useAlert";
import { useRouter } from "next/navigation";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { useRecoilState } from "recoil";
import { answerStatusState, subjectAnswerState } from "@/atoms/manual/atom";
import { TMethods } from "@/types/personal/types";
import { TGroupManualUser } from "@/types/manual/types";
import { queryClient } from "@/libs/utils/query/queryClient";
import { useQueryClient } from "@tanstack/react-query";

export const useAnswer = (
  methods: UseFormReturn<TGroupManualUser | TMethods>,
  subject: string,
  name?: string,
  callback?: () => void,
) => {
  const { openAlert, closeAlert } = useAlert();
  const { getValues, setValue, watch } = methods;
  const [answerStatus, setAnswerStatus] = useRecoilState(answerStatusState);
  const [answer, setAnswer] = useRecoilState(subjectAnswerState);
  const router = useRouter();
  const q = useQueryClient();

  const handleAnswer = (e: any, userIndex: number, answerIndex: number) => {
    if (subject === "korean" || subject === "english") {
      handleNormalAnswer(e, userIndex, answerIndex);
    } else if (subject === "math") {
      const COMMON_ANSWER_LENGTH = 15;
      const COMMON_SHORT_ANSWER_LENGTH = 7;
      const OPTIONAL_ANSWER_LENGTH = 6;
      if (answerIndex < COMMON_ANSWER_LENGTH) {
        handleNormalAnswer(e, userIndex, answerIndex);
      } else if (
        answerIndex <
        COMMON_ANSWER_LENGTH + COMMON_SHORT_ANSWER_LENGTH
      ) {
        handleShortAnswer(e, userIndex, answerIndex);
      } else if (
        answerIndex <
        COMMON_ANSWER_LENGTH +
          COMMON_SHORT_ANSWER_LENGTH +
          OPTIONAL_ANSWER_LENGTH
      ) {
        handleNormalAnswer(e, userIndex, answerIndex);
      } else {
        handleShortAnswer(e, userIndex, answerIndex);
      }
    }
  };

  const handleNormalAnswer = (
    e: any,
    userIndex: number,
    answerIndex: number,
  ) => {
    const value = watch(`users.${userIndex}.answers.${answerIndex}`);
    console.log(getValues(`users.${userIndex}.answers`));
    if (
      value !== null &&
      (isNaN(Number(value)) ||
        Number(value) < 1 ||
        Number(value) > 5 ||
        value === " ")
    ) {
      setValue(`users.${userIndex}.answers.${answerIndex}`, null);
      openAlert({
        content: (
          <div>
            객관식 문제의 답안은 <br /> 1~5까지의 숫자만 입력 가능합니다.
          </div>
        ),
        canClose: true,
        callBack: closeAlert,
      });
      return;
    }
  };

  const handleShortAnswer = (
    e: any,
    userIndex: number,
    answerIndex: number,
  ) => {
    const value = watch(`users.${userIndex}.answers.${answerIndex}`);

    if (value === null || answerIndex === 0) return;

    if (
      value !== null &&
      (Number(value) < 1 || Number(value) > 999 || value === " ")
    ) {
      setValue(`users.${userIndex}.answers.${answerIndex}`, null);
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

  const handleCallback = () => {
    if (subject === "inquiry") {
      // 탐구의 경우 2개의 답안을 제출해야하므로 콜백함수를 호출한다.
      // setAnswerStatus((prev) => ({
      //   ...prev,
      //   inquiry: "complete",
      // }));

      setAnswer((prev: any) => ({
        ...prev,
        society: {
          type: getValues("course1") as string,
          answer: getValues("answers").slice(0, 20) as (number | null)[],
        },
        science: {
          type: getValues("course2") as string,
          answer: getValues("answers").slice(20, 40) as (number | null)[],
        },
      }));
    } else {
      // setAnswerStatus((prev: any) => ({
      //   ...prev,
      //   [subject]: "complete",
      // }));
      // setAnswer((prev: any) => ({
      //   ...prev,
      //   [subject]: {
      //     type: getValues("course1"),
      //     answer: getValues("answe`rs"),
      //   },
      // }));

      const users = getValues("users");
      const newUsers = users.map((user: any, index: number) => {
        const { answers, ...rest } = user; // answers 속성을 제외한 나머지 속성만 가져오기
        return {
          ...rest,
          [subject]: {
            type: getValues(`users.${index}.selectedSubject`) as string,
            answer: getValues(`users.${index}.answers`) as (number | null)[],
          },
        };
      });

      // 수정된 답안저장 - tanstack
      queryClient.setQueryData(["group", "manual"], (prev: any) => ({
        ...prev,
        data: newUsers,
      }));

      closeAlert();
      router.push("/group/manual/");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(getValues("users"));

    const hasEmptyAnswers = getValues("users").some((user: any) => {
      return user.answers.some(
        (answer: number | null | string) => answer === null || answer === "",
      );
    });

    openAlert({
      content: hasEmptyAnswers ? (
        <div>
          미입력된 문항이 존재합니다. <br /> 입력을 완료하시겠습니까?
        </div>
      ) : (
        <div>답안저장을 완료하시겠습니까?</div>
      ),
      isCancel: true,
      callBack: handleCallback,
    });
  };

  return { handleAnswer, handleShortAnswer, handleSubmit };
};
