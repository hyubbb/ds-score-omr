import { UseFormGetValues } from "react-hook-form";

export const validateOmrForm = (
  getValues: UseFormGetValues<any>,
  currentSubject: string,
) => {
  const removeBlank = getValues("answers").map((item: string) => item.trim());
  const validationChecks = {
    examCode: getValues("examCode").some((item: string) => item === ""),
    birth: getValues("birth").some((item: string) => item === ""),
    koreanName: getValues("koreanName")?.some(
      (item: string, index: number) => item === "" && index < 2,
    ),
    name: Object.values(getValues("name") || {})?.some(
      (item: string[], index: number) => item.length === 0 && index < 2,
    ),
    gender: !getValues("gender"),
    course: !getValues("course"),
    questions: removeBlank.some((item: string) => item === ""),
  };

  if (
    validationChecks.examCode ||
    validationChecks.birth ||
    validationChecks.koreanName ||
    validationChecks.name
  ) {
    return {
      isValid: false,
      message: "입력되지 않은 항목이 존재합니다.",
    };
  }

  if (
    currentSubject !== "history" &&
    validationChecks.gender === validationChecks.course
  ) {
    return {
      isValid: false,
      message: "선택되지 않은 항목이 있습니다.",
    };
  }

  if (validationChecks.questions) {
    return {
      isValid: false,
      message: "입력되지 않은 정답이 존재합니다.",
    };
  }

  return {
    isValid: true,
    message: "",
  };
};
