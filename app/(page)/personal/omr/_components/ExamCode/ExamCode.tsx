import React from "react";
import OmrInput from "../OmrForm/OmrInput";
import NumberGrid from "../OmrForm/NumberGrid";
import { useFormContext } from "react-hook-form";

const ExamCode = ({
  title = "수험번호",
  fieldName = "examCode",
}: {
  title?: string;
  fieldName?: string;
}) => {
  const { getValues, watch } = useFormContext();

  return (
    <section>
      <div className="flex w-32 flex-col gap-2">
        <div className="flex max-h-fit">
          <div className="w-[250px] rounded-md border-2 border-black bg-white shadow-md">
            <div className="border-b text-center text-lg font-bold">
              <span className="tracking-[0.2em]">{title}</span>
            </div>
            {/* 수험번호 체크 */}
            <div className="flex flex-col text-center font-semibold">
              <div className="grid grid-cols-6 divide-x border-b">
                <div className="col-span-2">반</div>
                <div className="col-span-4">번호</div>
              </div>
              <div className="grid grid-cols-6 divide-x border-2 border-[red]">
                <OmrInput length={6} fieldName={fieldName} width="w-full" />
              </div>
            </div>
            {/* 반  체크박스 */}
            <div className="grid grid-cols-6 divide-x text-center">
              {Array.from({ length: 6 }, (_, index) => (
                <NumberGrid
                  key={index}
                  currentIndex={index}
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

export default ExamCode;
