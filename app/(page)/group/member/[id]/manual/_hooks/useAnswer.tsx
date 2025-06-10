import { useAlert } from "@/libs/hooks/useAlert";
import { useRouter } from "next/navigation";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { useRecoilState } from "recoil";
import { answerStatusState, subjectAnswerState } from "@/atoms/manual/atom";
import { TMethods } from "@/types/personal/types";

export const useAnswer = (
  methods: UseFormReturn<TMethods>,
  subject: string,
) => {
  const { openAlert, closeAlert } = useAlert();
  const { getValues, setValue } = methods;
  const [answerStatus, setAnswerStatus] = useRecoilState(answerStatusState);
  const [answer, setAnswer] = useRecoilState(subjectAnswerState);
  const router = useRouter();

  const handleAnswer = (e: any, index: number) => {
    const value = getValues(`answers.${index}`);

    if (
      value !== null &&
      (isNaN(Number(value)) ||
        Number(value) < 1 ||
        Number(value) > 5 ||
        value === " ")
    ) {
      setValue(`answers.${index}`, null);
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

  const handleShortAnswer = (e: any, index: number) => {
    const value = getValues(`answers.${index}`);

    if (value === null || index === 0) return;

    if (
      value !== null &&
      (Number(value) < 1 || Number(value) > 999 || value === " ")
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    openAlert({
      content: <div>답안저장을 완료하시겠습니까?</div>,
      isCancel: true,
      callBack: () => {
        if (subject === "inquiry") {
          // 탐구의 경우 2개의 답안을 제출해야하므로 콜백함수를 호출한다.
          setAnswerStatus((prev) => ({
            ...prev,
            inquiry: "complete",
          }));

          setAnswer((prev) => ({
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
          setAnswerStatus((prev) => ({
            ...prev,
            [subject]: "complete",
          }));
          setAnswer((prev) => ({
            ...prev,
            [subject]: {
              type: getValues("course1"),
              answer: getValues("answers"),
            },
          }));
        }
        closeAlert();
        router.push("/personal/manual/");
      },
    });
  };

  return { handleAnswer, handleShortAnswer, handleSubmit };
};
