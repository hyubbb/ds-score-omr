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
  const textColorClass =
    {
      korean: "text-subject-korean-main",
      math: "text-subject-math-main",
      english: "text-subject-english-main",
      history: "text-subject-history-main",
      inquiry: "text-subject-inquiry-main",
    }[color] || "text-black";

  const bgColorClass =
    {
      korean: "bg-subject-korean-bg",
      math: "bg-subject-math-bg",
      english: "bg-subject-english-bg",
      history: "bg-subject-history-bg",
      inquiry: "bg-subject-inquiry-bg",
    }[bgColor] || "bg-white";

  return (
    <div className="flex justify-center">
      <PageTitle
        className={`mb-[20px] flex w-[220px] items-center justify-center rounded-2xl border-0 p-2 text-center ${bgColorClass} ${textColorClass}`}
      >
        답안 입력 <div className="mx-3 h-5 w-[1px] bg-zinc-600"></div>
        {children}
      </PageTitle>
    </div>
  );
};

export default TitleText;
