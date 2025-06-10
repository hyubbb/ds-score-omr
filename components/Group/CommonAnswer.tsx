import Input from "@/components/Commons/Form/Input/Input";
import ColTable from "@/components/Manual/Coltable";
import { SectionTitle } from "@/components/Manual/SectionTitle";
import { IColumns } from "@/types/interface/common";
import React from "react";

interface ICommon {
  title?: string;
  length: number;
  prevLength: number;
  userIndex: number;
  handleAnswerChange: (e: any, index: number) => void;
  isShortAnswer?: boolean;
  isInitNumber?: boolean;
  divideNum?: number;
}

const Common = ({
  title = "",
  length,
  userIndex,
  prevLength = 0,
  handleAnswerChange,
  isShortAnswer = false,
  isInitNumber = false,
  divideNum = 5,
}: ICommon) => {
  // 탐구영역에서 같은페이지에서 두번 호출되는 경우 초기 번호를 0으로 설정하기 위해 사용
  const DIVIDE_NUM = divideNum === 0 ? length : divideNum;
  const prevNum = isInitNumber ? 0 : prevLength;
  const columns: IColumns[] = [
    {
      header: "문번",
      name: ["type"],
      width: "0",
      align: "center",
      editor: () => <div className="w-[80px]">답안</div>,
    },
    ...Array.from({ length: length }, (_, index) => ({
      header: `${prevNum + index + 1}번`,
      name: [`users.${userIndex}.answers.${prevLength + index}`],
      width: "100",
      align: "center",
      editor: () => (
        <Input
          type="text"
          name={`users.${userIndex}.answers.${prevLength + index}`}
          onKeyUp={(e) => handleAnswerChange(e, prevLength + index)}
          className="w-[60px] text-center"
          deleteIcon={false}
          sizeW="XS"
          // placeholder={`${isShortAnswer ? "최대 3자리" : "1~5까지"} 숫자만 입력`}
        />
      ),
    })),
  ];

  return (
    <section className="w-full overflow-x-auto">
      <SectionTitle>{title}</SectionTitle>
      <div className="w-full">
        <div className="grid grid-cols-1 gap-4">
          {Array.from(
            { length: Math.ceil(length / DIVIDE_NUM) },
            (_, groupIndex) => {
              const start = groupIndex * DIVIDE_NUM;
              const end = Math.min((groupIndex + 1) * DIVIDE_NUM, length);

              const groupColumns = [
                columns[0],
                ...columns.slice(1).slice(start, end),
              ];

              return (
                <ColTable
                  key={`group-${groupIndex}`}
                  isNumber={false}
                  columns={groupColumns}
                  items={[{}]}
                  className="max-w-fit"
                  headerBgColor="bg-[var(--lightgray2)]"
                />
              );
            },
          )}
        </div>
      </div>
    </section>
  );
};

export default Common;
