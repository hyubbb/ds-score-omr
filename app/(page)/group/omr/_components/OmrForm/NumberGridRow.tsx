import { useFormContext } from "react-hook-form";

const NumberGridRow = ({
  fieldName,
  currentIndex,
  maxValue = 10, // 기본값은 9로 설정
  startNumber = 0,
  className,
}: {
  fieldName: string;
  currentIndex: number;
  maxValue?: number;
  startNumber?: number;
  className?: string;
}) => {
  const { watch, setValue } = useFormContext();

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
    return maxValue; // 기본적으로 0부터 maxValue까지 표시
  };

  // 반 숫자 변경 함수
  const handleChange = (value: number | string, index: number) => {
    const newExamCode = [...watch(fieldName)];
    newExamCode[index] = value.toString();
    setValue(fieldName, newExamCode);
  };

  return (
    <div className={`flex justify-between gap-2 ${className}`}>
      {Array.from({ length: getNumberRange() }, (_, i) => (
        <div key={i + startNumber}>
          <div className="text-center text-xs">
            <button
              type="button"
              className={`${NumberButtonStyle} ${
                +watch(fieldName)[currentIndex] == i + startNumber
                  ? "border-none bg-black text-white"
                  : "border-[red] text-[red]"
              }`}
              onClick={() => handleChange(i + startNumber, currentIndex)}
              value={watch(fieldName)[currentIndex]}
            >
              {i + startNumber}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NumberGridRow;

export const NumberButtonStyle = "h-6 w-[14px] rounded-full border";
