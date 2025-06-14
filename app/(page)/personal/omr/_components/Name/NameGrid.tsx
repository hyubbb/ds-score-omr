import { useFormContext } from "react-hook-form";
import { FIRST_NAME, LAST_NAME, MIDDLE_NAME } from "./_utils/Alphabet";
import { getUnicodeFromKorean } from "./_utils/getUnicodeFromKorean";

// NumberGrid 컴포넌트 추가
const NameGrid = ({
  fieldName = "name",
  currentIndex, // 0: 초성, 1: 중성, 2: 종성
}: {
  fieldName?: string;
  currentIndex: number;
}) => {
  const { watch, setValue } = useFormContext();
  // console.log("NameGrid", watch("name"), watch("koreanName"));
  // 반 숫자 변경 함수
  const handleChange = (structure: number, word: string) => {
    const newName = watch("name");

    // newName 배열이 없거나 0, 1 인덱스가 없는 경우 함수 종료
    if (!newName || !newName[0] || !newName[1]) {
      return;
    }

    console.log(newName);

    newName[currentIndex][structure] = word;

    const unicode = getUnicodeFromKorean(
      newName[currentIndex][0],
      newName[currentIndex][1],
      newName[currentIndex][2],
    );

    console.log(unicode, newName);

    setValue(`koreanName.${currentIndex}`, unicode);
    setValue("name", newName);
  };

  return (
    <div className={`flex flex-1 justify-center gap-1 py-1`}>
      <div className="flex flex-col gap-1">
        {Array.from({ length: FIRST_NAME.length }, (_, i) => (
          <div key={i}>
            <div className="text-center text-xs">
              <button
                type="button"
                className={`${NameButtonStyle} ${
                  watch(fieldName)?.[currentIndex][0] == FIRST_NAME[i]
                    ? "border-none bg-black text-white"
                    : "border-[red] text-[red]"
                }`}
                onClick={() => handleChange(0, FIRST_NAME[i])}
                value={watch(fieldName)?.[currentIndex][0]}
              >
                {FIRST_NAME[i]}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        {Array.from({ length: MIDDLE_NAME.length }, (_, i) => (
          <div key={i}>
            <div className="text-center text-xs">
              <button
                type="button"
                className={`${NameButtonStyle} ${
                  watch(fieldName)?.[currentIndex][1] == MIDDLE_NAME[i]
                    ? "border-none bg-black text-white"
                    : "border-[red] text-[red]"
                }`}
                onClick={() => handleChange(1, MIDDLE_NAME[i])}
                value={watch(fieldName)?.[currentIndex][1]}
              >
                {MIDDLE_NAME[i]}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        {Array.from({ length: LAST_NAME.length }, (_, i) => (
          <div key={i}>
            <div className="text-center text-xs">
              <button
                type="button"
                className={`${NameButtonStyle} ${
                  watch(fieldName)?.[currentIndex][2] == LAST_NAME[i]
                    ? "border-none bg-black text-white"
                    : "border-[red] text-[red]"
                }`}
                onClick={() => handleChange(2, LAST_NAME[i])}
                value={watch(fieldName)?.[currentIndex][2]}
              >
                {LAST_NAME[i]}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NameGrid;

export const NameButtonStyle = "h-[18px] w-[14px] rounded-full border";
