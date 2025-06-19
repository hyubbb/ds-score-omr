export const convertToPdf = async (mode: "exam" | "answer") => {
  if (typeof window !== "undefined") {
    // 브라우저 환경에서만 실행
    // @ts-ignore
    const html2pdf = (await import("html2pdf.js")).default;

    const option = {
      margin: [4, 0, 4, 0], // 위, 왼쪽, 아래, 오른쪽
      filename: `${mode === "exam" ? "시험지" : "정답지"}.pdf`,
      image: { type: "jpeg", quality: 21 },
      html2canvas: { scale: 2, dpi: 192, letterRendering: true },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: {
        mode: ["css", "legacy"],
        before: [".page-break-before"],
        after: [".page-break-after"],
        avoid: [".page-break-avoid", ".question-avoid"],
      },
    };

    const element = document.getElementById("pdf-content") as HTMLElement;

    // PDF 생성
    if (element) {
      await html2pdf().from(element).set(option).toPdf().save();
    }
  }
};

export const downloadPdf = async (mode: "exam" | "answer") => {
  // 약간의 지연을 두어 DOM이 렌더링될 시간을 줌
  await new Promise((resolve) => setTimeout(resolve, 500));
  await convertToPdf(mode);
};
