import React from "react";
import ExamCode from "../ExamCode/ExamCode";
import NumberGrid from "../OmrForm/NumberGrid";
import OmrInput from "../OmrForm/OmrInput";
import NumberGridPhone from "../OmrForm/NumberGridPhone";

const Phone = () => {
  const fieldName = "phone";
  const title = "휴대폰번호";
  return (
    <section>
      <div className="flex w-60 flex-col gap-2">
        <div className="flex max-h-fit">
          <div className="rounded-md border-2 border-black bg-white shadow-md">
            <div className="flex flex-col border-b text-center text-lg font-bold">
              <span className="tracking-[0.2em]">{title}</span>
              <span className="text-xs text-gray-400">※ 010 제외</span>
            </div>
            {/* 수험번호 체크 */}
            <div className="flex flex-col text-center font-semibold">
              <div className="grid grid-cols-9 divide-x border-2 border-[red]">
                <OmrInput length={9} fieldName={fieldName} width="w-full" />
              </div>
            </div>
            {/* 반  체크박스 */}
            <div className="grid grid-cols-9 divide-x text-center">
              {Array.from({ length: 4 }, (_, index) => (
                <NumberGrid
                  key={index}
                  currentIndex={index}
                  fieldName={fieldName}
                />
              ))}
              <div></div>
              {Array.from({ length: 4 }, (_, index) => (
                <NumberGrid
                  key={index}
                  currentIndex={index + 4}
                  fieldName={fieldName}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Phone;
