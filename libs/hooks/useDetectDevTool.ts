"use client";

import { useEffect } from "react";

const detectDevTool = (allow: number) => {
  if (isNaN(+allow)) allow = 100;
  const start = +new Date();
  debugger;
  const end = +new Date();
  if (isNaN(start) || isNaN(end) || end - start > allow) {
    alert("경고: 개발자 도구가 감지되었습니다!");
  }
};

export default function useDetectDevTool(allow: number = 100) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_MODE === "production") {
      const handleResize = () => detectDevTool(allow);
      const handleMouseMove = () => detectDevTool(allow);
      const handleFocus = () => detectDevTool(allow);
      const handleBlur = () => detectDevTool(allow);

      window.addEventListener("load", () => detectDevTool(allow));
      window.addEventListener("resize", handleResize);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("focus", handleFocus);
      window.addEventListener("blur", handleBlur);

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("focus", handleFocus);
        window.removeEventListener("blur", handleBlur);
      };
    }
  }, [allow]);
}
