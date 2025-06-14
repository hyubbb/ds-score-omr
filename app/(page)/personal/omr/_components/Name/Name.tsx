import React from "react";
import NameGrid from "./NameGrid";
import NameInput from "./NameInput";

const Name = ({ color }: { color?: string }) => {
  return (
    <section className="bg-white">
      <div className="flex w-[265px] flex-col gap-2">
        <div className={`rounded-md border-2 border-black shadow-md`}>
          <div className={``}>
            <div className="text-center text-lg font-bold tracking-widest">
              성명
            </div>
            {/* 수험번호 체크 */}
            <div className={`flex flex-col text-center font-semibold`}>
              <span> (빈칸없이 왼쪽부터 기재)</span>
              <div className="flex divide-x border-2 border-[red]">
                <NameInput length={4} width="w-full" />
              </div>
            </div>
          </div>
          {/* 반  체크박스 */}
          <div className="flex w-full divide-x border-b border-gray-300">
            {Array.from({ length: 4 }, (_, index) => (
              <NameGrid key={index} currentIndex={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Name;
