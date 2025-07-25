import { DownloadData } from "@/app/(page)/exam/_utils/data";

export const downloadWord = async (mode: "exam" | "answer") => {
  // 약간의 지연을 두어 DOM이 렌더링될 시간을 줌
  await new Promise((resolve) => setTimeout(resolve, 500));

  // DOM에서 HTML 가져오기
  const htmlElement = document.getElementById("my-word");
  const htmlString = htmlElement?.innerHTML;

  if (!htmlString) {
    throw new Error("HTML 콘텐츠를 가져오는 데 실패했습니다.");
  }

  // 서버에 HTML 전송하여 DOCX 변환 요청
  const res = await fetch("/api/docs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ html: htmlString, data: DownloadData }),
  });
  // DOCX 파일 다운로드
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${mode === "exam" ? "시험지" : "정답지"}.docx`;
  a.click();
  window.URL.revokeObjectURL(url);

  // DOM이 업데이트될 때까지 기다림
  // setTimeout(async () => {
  //   // DOM에서 HTML 가져오기
  //   const htmlElement = document.getElementById("my-word");
  //   const htmlString = htmlElement?.innerHTML;

  //   if (!htmlString) {
  //     throw new Error("HTML 콘텐츠를 가져오는 데 실패했습니다.");
  //   }

  //   // 서버에 HTML 전송하여 DOCX 변환 요청
  //   const res = await fetch("/api/docs", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ html: htmlString, data: DownloadData }),
  //   });

  //   // DOCX 파일 다운로드
  //   const blob = await res.blob();
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = `${mode === "exam" ? "시험지" : "정답지"}.docx`;
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  // }, 500); // DOM 업데이트를 위해 약간의 딜레이 추가
};
