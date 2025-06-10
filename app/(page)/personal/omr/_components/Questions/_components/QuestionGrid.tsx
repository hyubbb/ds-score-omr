import NumberGridRow from "../../OmrForm/NumberGridRow";

const QuestionGrid = ({
  startIndex = 0,
  length,
  maxValue = 5,
  type = 2,
  fontColor,
  bgColor,
}: {
  startIndex?: number;
  length: number;
  maxValue?: number;
  type?: number | boolean;
  fontColor?: string;
  bgColor?: string;
}) => {
  const fieldName = type == 2 ? "answers" : `answers.${type}`;

  return (
    <div className="flex w-full divide-x">
      <div
        className={`flex w-[50px] flex-col items-center gap-2 py-2 pr-[1px] bg-[${bgColor}]`}
      >
        {Array.from({ length }, (_, index) => (
          <span key={index} className={`font-medium text-[${fontColor}]`}>
            {index + startIndex + 1}
          </span>
        ))}
      </div>
      <div className="flex flex-1 basis-0 flex-col gap-2 p-2">
        {Array.from({ length }, (_, index) => (
          <NumberGridRow
            key={index}
            currentIndex={index + startIndex}
            maxValue={maxValue}
            startNumber={1}
            fieldName={fieldName}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionGrid;
