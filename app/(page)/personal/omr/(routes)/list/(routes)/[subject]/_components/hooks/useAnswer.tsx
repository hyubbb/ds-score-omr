import { useAlert } from "@/libs/hooks/useAlert";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import { useRecoilState } from "recoil";
import { omrListDataState } from "@/atoms/manual/atom";
import { userInfoState } from "@/atoms/user/atom";
import { SUBJECT_ID, SUBMISSION_TYPE } from "@/libs/utils/subjectChange";
import { useEffect, useState } from "react";
import postReplaceData from "@/libs/utils/manual/postReplaceData";
import { COURSE_LIST_EN } from "../../../../../../_utils/utils2";
import { omrAnswerState } from "@/atoms/omr/atom";

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
  methods: UseFormReturn<{ [key: string]: any; subjectCode: number }>;
  subject: string;
  attemptId?: string | undefined;
  answerId?: number;
  type?: "manual" | "omr";
}) => {
  const { openAlert, closeAlert } = useAlert();
  const { getValues, setValue } = methods;
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isLoading, setIsLoading] = useState(true);
  const [omrAnswerStatus, setOmrAnswerStatus] = useRecoilState(omrAnswerState);
  const [omrListData, setOmrListData] = useRecoilState(omrListDataState);
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
    const hasBlank = getValues(`${answerName}`)?.some((item: any) => !item);
    const text = hasBlank
      ? "답안을 입력하지 않은 문항이 있습니다.\n 저장 하시겠습니까?"
      : "답안저장을 완료하시겠습니까?";

    openAlert({
      content: <div>{text}</div>,
      isCancel: true,
      callBack: async () => {
        let newAnswers: any[] = [];
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

          // 값을 공백이랑 0을 치환하는 함수
          const newAnswers1 = postReplaceData({
            data: getValues("answers")[0],
            grade: 3,
            subject: "society",
            type,
          });

          const newAnswers2 = postReplaceData({
            data: getValues("answers")[1],
            grade: 3,
            subject: "science",
            type,
          });

          // 답안 입력 상태 업데이트
          setOmrAnswerStatus({
            ...omrAnswerStatus,
            [SUBJECT_ID["society"]]: 1,
            [SUBJECT_ID["science"]]: 1,
          });

          // 정답 업데이트
          newAnswers = [newAnswers1, newAnswers2];

          // await fetchWrapper.put(
          //   `/fo-user/mock-exam-attempt/update-submission-exam/${attemptId}`,
          //   newSubmissionData,
          // );
        } else {
          // 값을 공백이랑 0을 치환하는 함수
          newAnswers =
            postReplaceData({
              data: getValues("answers"),
              grade: 3,
              subject,
            }) ?? [];

          // 답안 입력 상태 업데이트
          setOmrAnswerStatus({
            ...omrAnswerStatus,
            [SUBJECT_ID[subject]]: 1,
          });
        }

        // 선택과목 업데이트
        setOmrListData(
          omrListData.map((item: any) =>
            item.subjectEn == subject ? getValues() : item,
          ),
        );

        // 유저 정보에 선택과목 업데이트
        setUserInfo({
          ...userInfo,
          [SUBMISSION_TYPE[subject as keyof typeof SUBMISSION_TYPE]]:
            getValues("course"),
        });

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
