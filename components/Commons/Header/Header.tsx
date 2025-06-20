"use client";

import Link from "next/link";

export const Header = () => {
  return (
    <header className="z-10 flex h-[100px] w-full items-center justify-center bg-white shadow-md">
      <div className="flex w-full max-w-full items-center justify-between">
        <div className="flex items-center text-[22px] font-semibold">
          {/* 로고 */}
          {/* <Image
            src="/icons/desonglogo.svg"
            alt="헤더 로고"
            width={240}
            height={40}
            className="mr-[60px] cursor-pointer"
            onClick={() => router.push("/")}
          /> */}
          <div className="flex h-[40px] w-[240px] items-center justify-center text-center">
            <Link href="/">
              {/* <Logo size={0.3} color="#5227FF" className="custom-folder" /> */}
              {/* <Image
                src="/icons/desonglogo.svg"
                alt="헤더 로고"
                width={240}
                height={40}
                className="mr-[60px] cursor-pointer"
              /> */}
              <span className="text-[22px] font-semibold">학력개발연구소</span>
            </Link>
          </div>

          {/* 네비게이션 */}
          <nav className="ml-6 flex items-center gap-10">
            <Link href="/personal/omr/list">OMR 답안 입력</Link>
            <Link href="/exam/list">시험지 다운로드</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
