import { useAlert } from "@/libs/hooks/useAlert";
import { useFormContext } from "react-hook-form";
import { decomposeKorean } from "./_utils/decomposeKorean";
import React from "react";
import Input from "@/components/Commons/Form/Input/Input";

// 새로운 컴포넌트 추가
const NameInput = ({
  length,
  fieldName = "koreanName",
  width,
}: {
  length: number;
  fieldName?: string;
  width: string;
}) => {
  const { register, watch, setValue } = useFormContext();

  const { openAlert, closeAlert } = useAlert();

  // 반 숫자 변경 함수
  const handleExamCodeChange = (value: string, index: number) => {
    // 빈 문자열이거나 공백만 있는 경우 처리

    // 문자열이 1글자 이상이면 입력이 안됨
    if (value.length > 1) {
      setValue("koreanName", [...watch("koreanName")]);
      return;
    }

    // 숫자 입력 체크
    if (/\d/.test(value)) {
      openAlert({
        isCancel: false,
        content: "숫자는 입력할 수 없습니다.",
        callBack: closeAlert,
        canClose: true,
      });
      return;
    }

    // index의 값이 초중종을 뜻하니까, 수정되는 index의 값은 decompose의 값을 쓰고, 나머지값들은 그대로 유지
    const convertedName = {
      ...watch("name"),
      [index]: decomposeKorean(value), // 이름 분해함수
    };

    const newExamCode = [...watch("koreanName")];
    newExamCode[index] = value;
    setValue("koreanName", newExamCode); // koreanName
    setValue("name", convertedName); // name
  };

  return (
    <>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="text"
          className={`h-8 ${width} text-center`}
          {...register(`${fieldName}.${index}`)}
          onChange={(e) => handleExamCodeChange(e.target.value, index)}
        />
      ))}
    </>
  );
};
export default React.memo(NameInput);
