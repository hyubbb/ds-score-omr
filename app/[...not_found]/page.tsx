"use client";

import Button from "@/components/Commons/Form/Button/Button";
import { useModal } from "@/libs/hooks/useModal";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "../(auth)/isbn/_components/Header";

export default function NotFound() {
  const modal = useModal();
  const router = useRouter();

  useEffect(() => {
    modal.openModal({
      content: (
        <div className="flex flex-col items-center justify-center">
          <div className="text-center">
            비정상적인 접근입니다.
            <br />
            대성학력개발연구소 홈페이지에서 로그인 후 사용 가능합니다.
          </div>
          <div className="mt-[30px]">
            <Button
              label="확인"
              variant="defaultBlack"
              size="lg"
              onClick={() => {
                modal.closeModal();
                // 외부 사이트로 리다이렉션하거나 다른 처리
                router.push("https://dsdostore.shopby.co.kr/");
              }}
            />
          </div>
        </div>
      ),
      canClose: false,
    });
  }, []);

  return (
    <>
      <Header />
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center justify-center"></div>
      </div>
    </>
  );
}
