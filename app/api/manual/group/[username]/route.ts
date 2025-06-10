import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  try {
    const data: any[] = [];

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
