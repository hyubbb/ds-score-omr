import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // 그룹 데이터를 가져오는 로직을 여기에 구현
    const data = [
      {
        name: "김철수",
        birth: "20060101",
        phone: "01012345678",
        class: "01",
        number: "0001",
        status: "pending",
        answers: Array.from({ length: 10 }, () => 1),
      },
      {
        name: "이영희",
        birth: "20060202",
        phone: "01023456789",
        class: "02",
        number: "0002",
        status: "pending",
      },
      {
        name: "박민수",
        birth: "20060303",
        phone: "01034567890",
        class: "03",
        number: "0003",
        status: "complete",
      },
      {
        name: "최지우",
        birth: "20060404",
        phone: "01045678901",
        class: "04",
        number: "0004",
        status: "pending",
      },
      {
        name: "정수빈",
        birth: "20060505",
        phone: "01056789012",
        class: "05",
        number: "0005",
        status: "pending",
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
