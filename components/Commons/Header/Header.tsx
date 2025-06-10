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
          <Image
            src="/icons/desonglogo.svg"
            alt="헤더 로고"
            width={240}
            height={40}
            className="mr-[60px] cursor-pointer"
            onClick={() => router.push("/")}
          />

          {/* 네비게이션 */}
          <nav className="flex items-center gap-10">
            <Link href="/online-mock-test">온라인 응시</Link>
            <Link href="/result/personal">성적조회</Link>

            {/* 드롭다운 메뉴 */}
            <div className="group relative">
              {/* <Link href="/" className="cursor-pointer">
                단체 전용
              </Link> */}

              {/* 서브메뉴 */}
              <div className="duration-400 invisible absolute left-[-35px] top-[50px] w-[150px] rounded-md bg-white py-2 text-center text-lg font-medium opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                <Link
                  href="/group/manage"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  단체 관리
                </Link>
                <Link href="/" className="block px-4 py-2 hover:bg-gray-100">
                  단체 성적조회
                </Link>
                <Link href="/" className="block px-4 py-2 hover:bg-gray-100">
                  오프라인 단체
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
