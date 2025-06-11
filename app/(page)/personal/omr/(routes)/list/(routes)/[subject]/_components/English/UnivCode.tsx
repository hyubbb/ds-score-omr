import NumberGrid from "@/app/(page)/personal/omr/_components/OmrForm/NumberGrid";
import OmrInput from "@/app/(page)/personal/omr/_components/OmrForm/OmrInput";
import { MAJOR_CODE, UNIV_CODE } from "@/libs/utils/univCode";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const UnivCode = ({
  title = "수험번호",
  fieldName = "examCode",
}: {
  title?: string;
  fieldName?: string;
}) => {
  const { watch } = useFormContext();

  return (
    <section>
      <div className="flex w-40 flex-col gap-2">
        <div className="flex max-h-fit">
          <div className="w-[250px] rounded-md border-2 border-black bg-white shadow-md">
            <div className="text-md border-b text-center font-bold">
              <span className="tracking-[0.2em]">{title}</span>
            </div>
            <div className="border-b text-center">
              <span className="">지원대학 / 학과명</span>
            </div>
            <div className="flex max-h-fit min-h-[46px] flex-col items-center justify-center gap-[2px] border-b text-center">
              <span className="text-sm">
                {UNIV_CODE.find((item) => {
                  const codePrefix =
                    watch(fieldName).join("")?.slice(0, 3) || "";
                  return item.code === codePrefix;
                })?.name || <span className="text-red-500">대학 재선택</span>}
              </span>
              <span className="text-sm">
                {MAJOR_CODE.find((item) => {
                  const codePrefix = watch(fieldName).join("")?.slice(3) || "";
                  return item.code === codePrefix;
                })?.name || <span className="text-red-500">학과 재선택</span>}
              </span>
            </div>
            {/* 수험번호 체크 */}
            <div className="flex flex-col text-center">
              <div className="grid grid-cols-7 divide-x border-b text-sm tracking-tighter">
                <div className="col-span-3">대학 CODE</div>
                <div className="col-span-4">학과 CODE</div>
              </div>
              <div className="grid grid-cols-7 divide-x border-2 border-[red] font-semibold">
                <OmrInput length={7} fieldName={fieldName} width="w-full" />
              </div>
            </div>
            {/* 반  체크박스 */}
            <div className="grid grid-cols-7 divide-x text-center">
              {Array.from({ length: 7 }, (_, index) => (
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

export default UnivCode;
