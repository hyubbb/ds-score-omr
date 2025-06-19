import { NextResponse } from "next/server";
import { asBlob } from "html-docx-js-typescript";

export async function POST(request: Request) {
  const { html, data } = await request.json();

  // 여백 설정 (단위: twips, 1 inch = 1440 twips, 0.5 inch = 720 twips)
  const INCH = 1440;
  // blank: NARROWLY("좁게") | COMMONLY("보통") | WIDELY("넓게");
  const padding = data.blank;
  const paddingValue =
    padding === "NARROWLY" ? 720 : padding === "COMMONLY" ? 900 : 1080;

  const options = {
    margins: {
      top: paddingValue, // 1 inch
      bottom: paddingValue, // 1 inch
      left: paddingValue, // 0.5 inch
      right: paddingValue, // 0.5 inch
    },
  };
  try {
    const docxBlob = await asBlob(html, options);

    return new NextResponse(docxBlob, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": "attachment; filename=document.docx",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "변환 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
