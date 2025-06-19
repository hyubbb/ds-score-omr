const htmlToFile = (htmlContent: string, mode: "exam" | "answer") => {
  const header = "<html><head><meta charset='utf-8'></head><body>";
  const footer = "</body></html>";
  const fullHtml = header + htmlContent + footer;

  const mimeType = "application/vnd.ms-word;charset=utf-8"; // HWP 및 Word와 호환
  const source = `data:${mimeType},` + encodeURIComponent(fullHtml);

  const fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = `${mode === "exam" ? "시험지" : "정답지"}.hwp`;
  fileDownload.click();
  document.body.removeChild(fileDownload);
};

export const downloadHwp = async (mode: "exam" | "answer") => {
  // DOM이 업데이트될 때까지 기다림
  await new Promise((resolve) => setTimeout(resolve, 500));

  // DOM에서 HTML 가져오기
  const htmlElement = document.getElementById("my-hwp") as HTMLElement;

  if (!htmlElement) {
    throw new Error("HTML 콘텐츠를 가져오는 데 실패했습니다.");
  }

  const htmlString = htmlElement?.innerHTML ?? "";

  // HTML을 파일로 다운로드
  htmlToFile(htmlString, mode);
};
