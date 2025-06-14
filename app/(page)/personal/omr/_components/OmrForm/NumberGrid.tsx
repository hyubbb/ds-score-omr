import { useEffect, useState, useMemo } from "react";
import { useFormContext } from "react-hook-form";

// NumberGrid 컴포넌트 추가
const NumberGrid = ({
  posIndex = 0,
  fieldName,
  currentIndex,
  maxValue = 10, // 기본값은 9로 설정
  startNumber = 0,
  className,
  type,
  disabled,
}: {
  posIndex?: number;
  fieldName: string;
  currentIndex: number;
  maxValue?: number;
  startNumber?: number;
  className?: string;
  type?: string;
  disabled?: boolean;
}) => {
  const { watch, setValue } = useFormContext();
  const [data, setData] = useState<string[]>([]);

  const fieldValue = useMemo(() => {
    const value = watch(fieldName)?.[currentIndex];
    if (!value) return "0";
    return type === "shortAnswer"
      ? value.toString().padStart(3, "0").split("")
      : value.toString();
  }, [watch(fieldName)?.[currentIndex], type]);

  useEffect(() => {
    setData(fieldValue);
  }, [fieldValue]);

  // 월과 일에 대한 특별한 처리
  const getNumberRange = () => {
    if (fieldName === "birth") {
      // 월 처리
      if (currentIndex === 2) return 2; // 월 첫째자리 (0-1)
      if (currentIndex === 3) return 10; // 월 둘째자리 (0-9)
      // 일 처리
      if (currentIndex === 4) return 4; // 일 첫째자리 (0-3)
      if (currentIndex === 5) return 10; // 일 둘째자리 (0-9)
    }

    if (fieldName === "phone") {
      // if (currentIndex === 4) return 0;
    }
    return maxValue; // 기본적으로 0부터 maxValue까지 표시
  };

  // 반 숫자 변경 함수
  const handleChange = (value: number | string) => {
    const newExamCode = [...watch(fieldName)];

    if (type == "shortAnswer") {
      data[posIndex] = value.toString();
      newExamCode[currentIndex] = data.join(""); // 다시 문자열로 합쳐서 저장
    } else {
      newExamCode[currentIndex] = value.toString();
    }
    setValue(fieldName, newExamCode);
  };

  return (
    // currentIndex==0 처리를 한 이유는 tailwind에서 divide-x 처리를 했을떄
    // 첫번쨰와 두번째 사이가 밀리는현상이 있어서 1px padding처리함
    <div
      className={`mx-auto flex w-full border-spacing-1 flex-col gap-[6px] py-1 text-xs ${className}`}
    >
      {Array.from({ length: getNumberRange() }, (_, i) => (
        <div key={i} className={`text-center`}>
          <button
            type="button"
            disabled={disabled}
            className={`${NumberButtonStyle} ${
              +data?.[posIndex] == i
                ? "border-none bg-black text-white disabled:bg-gray-600"
                : "border-[red] text-[red]"
            } `}
            onClick={() => handleChange(i)}
            // value={watch(fieldName)?.[currentIndex]}
            value={data?.[posIndex] || 0}
          >
            {i + startNumber}
          </button>
        </div>
      ))}
    </div>
  );
};

export default NumberGrid;

export const NumberButtonStyle = "h-5 w-[14px] rounded-full border";
