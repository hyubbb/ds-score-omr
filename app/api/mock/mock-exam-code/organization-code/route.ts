import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const data = [
      {
        id: 25,
        registrationCode: "6B22334510",
        codeStatus: "COMPLETED",
        codeType: "GROUP",
      },
      {
        id: 29,
        registrationCode: "5AEBD3485D",
        codeStatus: "COMPLETED",
        codeType: "GROUP",
      },
      {
        id: 22,
        registrationCode: "3DA6895ADC",
        codeStatus: "INCOMPLETE",
        codeType: "GROUP",
      },
      {
        id: 26,
        registrationCode: "E6BF53BB58",
        codeStatus: "INCOMPLETE",
        codeType: "GROUP",
      },
      {
        id: 28,
        registrationCode: "B882177E0A",
        codeStatus: "INCOMPLETE",
        codeType: "GROUP",
      },
      {
        id: 30,
        registrationCode: "5EE056D99E",
        codeStatus: "INCOMPLETE",
        codeType: "GROUP",
      },
      {
        id: 21,
        registrationCode: "5D3F2223C6",
        codeStatus: "REVIEW_SUBMITTED",
        codeType: "GROUP",
      },
      {
        id: 23,
        registrationCode: "466B642452",
        codeStatus: "REVIEW_SUBMITTED",
        codeType: "GROUP",
      },
      {
        id: 24,
        registrationCode: "BD38BCC041",
        codeStatus: "GROUP_REVIEW_COMPLETED",
        codeType: "GROUP",
      },
      {
        id: 27,
        registrationCode: "BB489F43B0",
        codeStatus: "GROUP_REVIEW_COMPLETED",
        codeType: "GROUP",
      },
    ];

    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("응시코드오류:", error);
    return NextResponse.json(
      { success: false, error: "응시코드오류" },
      { status: 500 },
    );
  }
}
// 응시코드 상태
// 발급 → GENERATED
// 응시완료 → COMPLETED
// 응시미완 → INCOMPLETE
// 제출자검수완료 →REVIEW_SUBMITTED
// 단체장검수완료 → GROUP_REVIEW_COMPLETED
// 최종제출완료 → TRANSMITTED
// 환불완료 → REFUND_COMPLETED
// 폐기 → DISCARDED
