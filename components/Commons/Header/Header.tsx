"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  return (
    <header className="z-10 flex h-[100px] w-full items-center justify-center bg-white shadow-md">
      <div className="flex min-w-[1400px] items-center justify-between">
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
            <Link href="/">LOGO</Link>
          </div>

          {/* 네비게이션 */}
          <nav className="flex items-center gap-10">
            <Link href="/personal/omr/list">개인 답안 입력</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
