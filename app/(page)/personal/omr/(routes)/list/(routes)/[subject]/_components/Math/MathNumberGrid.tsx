import { useFormContext } from "react-hook-form";

/**
 * omr에는 백자리 수의 숫자0이 없어서 만들었는데,
 * 라디오 버튼으로 만들었기때문에, 잘못 클릭 할 수도 있기 때문에 0을 추가해둔 컴포넌트
 *
 */
const MathNumberGrid = ({
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

  // 반 숫자 변경 함수
  const handleChange = (value: number | string, index: number) => {
    const newExamCode = [...watch(fieldName)];
    newExamCode[index] = value.toString();
    setValue(fieldName, newExamCode);
  };

  return (
    // currentIndex==0 처리를 한 이유는 tailwind에서 divide-x 처리를 했을떄
    // 첫번쨰와 두번째 사이가 밀리는현상이 있어서 1px padding처리함
    <div
      className={`mx-auto flex w-full border-spacing-1 flex-col gap-2 py-1 text-xs ${className}`}
    >
      {Array.from({ length: maxValue + 1 }, (_, i) => {
        if (currentIndex == 0 && i == 0) {
          return <div className={`${NumberButtonStyle} border-none`}></div>;
        }

        return (
          <div key={i} className={`text-center`}>
            <button
              type="button"
              className={`${NumberButtonStyle} ${
                +watch(fieldName)?.[currentIndex] == i
                  ? "border-none bg-black text-white"
                  : "border-[red] text-[red]"
              } `}
              onClick={() => handleChange(i, currentIndex)}
              value={watch(fieldName)?.[currentIndex]}
            >
              {i + startNumber}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default MathNumberGrid;

export const NumberButtonStyle = "h-6 w-[14px] rounded-full border";
