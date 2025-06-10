import NumberGridRow from "@/app/(page)/personal/omr/_components/OmrForm/NumberGridRow";

const QuestionGrid = ({
  startIndex,
  length,
  maxValue = 5,
}: {
  startIndex: number;
  length: number;
  maxValue?: number;
}) => (
  <div className="flex w-full divide-x">
    {/* <div className="flex w-[50px] flex-col items-center gap-2 py-2 pr-[1px]">
      {Array.from({ length }, (_, index) => (
        <span key={index} className="font-medium text-gray-700">
          {index + startIndex + 1}
        </span>
      ))}
    </div> */}
    <div className="flex flex-1 basis-0 flex-col gap-2 p-2">
      {Array.from({ length }, (_, index) => (
        <NumberGridRow
          key={index}
          currentIndex={index + startIndex}
          maxValue={maxValue}
          startNumber={1}
          fieldName="answers"
        />
      ))}
    </div>
  </div>
);

export default QuestionGrid;
