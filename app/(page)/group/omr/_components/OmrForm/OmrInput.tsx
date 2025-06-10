import { useAlert } from "@/libs/hooks/useAlert";
import { useFormContext } from "react-hook-form";

// 새로운 컴포넌트 추가
const OmrInput = ({
  length,
  fieldName,
  width,
}: {
  length: number;
  fieldName: string;
  width: string;
}) => {
  const { register, watch, setValue } = useFormContext();

  const { openAlert, closeAlert } = useAlert();

  // 반 숫자 변경 함수
  const handleExamCodeChange = (value: number | string, index: number) => {
    if (isNaN(Number(value))) {
      setValue(fieldName, [...watch(fieldName)]);

      openAlert({
        isCancel: false,
        content: "숫자만 입력 가능합니다.",
        callBack: closeAlert,
      });
      return;
    }

    const newExamCode = [...watch(fieldName)];
    newExamCode[index] = value.toString();
    setValue(fieldName, newExamCode);
  };

  return (
    <>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="text"
          className={`h-8 ${width} text-center`}
          maxLength={1}
          {...register(`${fieldName}.${index}`)}
          onChange={(e) => handleExamCodeChange(e.target.value, index)}
        />
      ))}
    </>
  );
};
export default OmrInput;
