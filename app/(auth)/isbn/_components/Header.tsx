"use client";

import { Modal } from "@/components/Commons/Modal/Modal";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const handleNavigation = () => {
    router.push("https://dsdostore.shopby.co.kr/");
  };
  return (
    <header className="z-[10] flex h-[100px] w-full flex-row items-center justify-center bg-white shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)]">
      <Modal />
      <div className="flex min-w-[1400px] flex-row items-center justify-between">
        <div className="flex items-center text-[22px] font-semibold">
          <Image
            src={`/icons/desonglogo.svg`}
            alt={`헤더 로고`}
            width={240}
            height={40}
            className="mr-[60px] cursor-pointer"
            onClick={handleNavigation}
          />
        </div>
      </div>
    </header>
  );
};
