import { useEffect, useState } from "react";
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
}: {
  posIndex?: number;
  fieldName: string;
  currentIndex: number;
  maxValue?: number;
  startNumber?: number;
  className?: string;
  type?: string;
}) => {
  const { watch, setValue } = useFormContext();
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    // 단답형 문제일때 정답을 3자리로 판단을 해야한다.
    const shortAnswer = watch(fieldName)
      ?.[currentIndex]?.toString()
      .padStart(3, "0");

    // type이 "shortAnswer"이면 3자리로 변환한 값을 배열로 사용
    const fieldValue =
      type === "shortAnswer"
        ? shortAnswer?.split("")
        : watch(fieldName)?.[currentIndex]?.toString() || "0";

    setData(fieldValue);
  }, [watch(fieldName)?.[currentIndex]]);

  // 월과 일에 대한 특별한 처리
  const getNumberRange = () => {
    if (currentIndex === 0) return 3;
    if (currentIndex === 1) return 10;

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
            className={`${NumberButtonStyle} ${
              +data?.[posIndex] == i
                ? "border-none bg-black text-white"
                : "border-[red] text-[red]"
            }`}
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
