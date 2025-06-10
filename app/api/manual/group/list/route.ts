import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // 그룹 데이터를 가져오는 로직을 여기에 구현
    const data = [
      {
        id: 21,
        registrationCode: "5D3F2223C6",
        codeStatus: "GENERATED",
        codeType: "GROUP",
      },
      {
        id: 22,
        registrationCode: "3DA6895ADC",
        codeStatus: "GENERATED",
        codeType: "GROUP",
      },
      {
        id: 23,
        registrationCode: "466B642452",
        codeStatus: "GENERATED",
        codeType: "GROUP",
      },
      {
        id: 24,
        registrationCode: "BD38BCC041",
        codeStatus: "GENERATED",
        codeType: "GROUP",
      },
      {
        id: 25,
        registrationCode: "6B22334510",
        codeStatus: "GENERATED",
        codeType: "GROUP",
      },
      {
        id: 26,
        registrationCode: "E6BF53BB58",
        codeStatus: "GENERATED",
        codeType: "GROUP",
      },
      {
        id: 27,
        registrationCode: "BB489F43B0",
        codeStatus: "GENERATED",
        codeType: "GROUP",
      },
      {
        id: 28,
        registrationCode: "B882177E0A",
        codeStatus: "GENERATED",
        codeType: "GROUP",
      },
      {
        id: 29,
        registrationCode: "5AEBD3485D",
        codeStatus: "GENERATED",
        codeType: "GROUP",
      },
      {
        id: 30,
        registrationCode: "5EE056D99E",
        codeStatus: "GENERATED",
        codeType: "GROUP",
      },
    ];

    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("그룹 조회 중 오류 발생:", error);
    return NextResponse.json(
      { success: false, error: "그룹 조회 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
