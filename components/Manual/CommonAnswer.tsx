import Input from "@/components/Commons/Form/Input/Input";
import { IColumns } from "@/types/interface/common";
import React from "react";
import { SectionTitle } from "./SectionTitle";
import ColTable from "./Coltable";

interface ICommon {
  title?: string;
  length: number;
  prevLength?: number;
  handleAnswerChange: (e: any, index: number, subject?: string) => void;
  isShortAnswer?: boolean;
  isInitNumber?: boolean;
  divideNum?: number;
  subject?: string;
  bgType?: string;
}

const Common = ({
  title = "",
  length,
  prevLength = 0,
  handleAnswerChange,
  isShortAnswer = false,
  isInitNumber = false,
  divideNum = 5,
  subject,
  bgType = "default",
}: ICommon) => {
  // 탐구영역에서 같은페이지에서 두번 호출되는 경우 초기 번호를 0으로 설정하기 위해 사용
  const DIVIDE_NUM = divideNum === 0 ? length : divideNum;
  const prevNum = isInitNumber ? 0 : prevLength;
  const name =
    subject == "society"
      ? "answers1"
      : subject == "science"
        ? "answers2"
        : "answers";
  const columns: IColumns[] = [
    {
      header: "문번",
      name: ["type"],
      width: "100",
      align: "center",
      editor: () => <div className="w-[100px]">답안</div>,
    },
    ...Array.from({ length: length }, (_, index) => ({
      header: `${prevNum + index + 1}번`,
      name: [`${name}.${prevLength + index}`],
      width: "100",
      align: "center",
      editor: () => (
        <Input
          type="text"
          name={`${name}.${prevLength + index}`}
          onKeyUp={(e) => handleAnswerChange(e, prevLength + index, subject)}
          className="text-center [&::placeholder]:text-[12px]"
          sizeW="XS"
          placeholder={
            index % 5 === 0
              ? isShortAnswer
                ? "최대 3자리 숫자"
                : "1~5의 숫자"
              : ""
          }
        />
      ),
    })),
  ];

  const bgColor =
    bgType == "default"
      ? "bg-[#ffffff] border-[2px] border-[#00000050]"
      : "bg-[#00000007]";

  return (
    <section
      className={`flex min-w-[760px] flex-col justify-center gap-6 rounded-xl p-6 ${bgColor}`}
    >
      <SectionTitle className="text-center">{title}</SectionTitle>
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
                className="max-w-fit bg-white"
              />
            );
          },
        )}
      </div>
    </section>
  );
};

export default Common;
