import PageTitle from "@/components/Manual/PageTitle";
import React from "react";

const TitleText = ({
  children,
  color = "black",
  bgColor = "white",
}: {
  children: React.ReactNode;
  color?: string;
  bgColor?: string;
}) => {
  return (
    <div className="flex justify-center">
      <PageTitle
        className={`mb-[20px] flex w-[220px] items-center justify-center rounded-2xl border-0 p-2 text-center bg-${bgColor} text-${color}`}
      >
        답안 입력 <div className="mx-3 h-5 w-[1px] bg-gray-400"></div>
        {children}
      </PageTitle>
    </div>
  );
};

export default TitleText;
