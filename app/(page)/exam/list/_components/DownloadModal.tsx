"use client";

import Button from "@/components/Commons/Form/Button/Button";
import { Icon } from "@/components/Commons/Icons/Icon";
import Image from "next/image";
import React from "react";
import Loading from "./Loading";
import DownContent from "./DownContent";
import { useDownload } from "../_hooks/useDownload";

interface DownloadModalProps {
  isOpen: boolean;
  examId: number | null;
  onClose: () => void;
  onConfirm: () => void;
}

const DownloadModal = ({
  isOpen,
  examId,
  onClose,
  onConfirm,
}: DownloadModalProps) => {
  const {
    isLoading,
    handlePdfDownload,
    handleWordDownload,
    handleHwpDownload,
  } = useDownload();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-6 flex justify-between">
            <h3 className="text-lg font-semibold">다운로드 확인</h3>
            <div
              className="flex cursor-pointer justify-end hover:bg-gray-100"
              onClick={onClose}
            >
              <Icon title="close" />
            </div>
          </div>
          <p className="mb-6 text-sm text-red-500">
            다운로드 파일을 선택해 주세요. 한글프로그램은 ver.2020 이상으로
            사용을 권장합니다. 파일 오픈 시 UTF-8 형식으로 오픈해 주시기
            바랍니다.
          </p>

          <section className="mb-6 flex items-center justify-between gap-10 bg-[#f5f5f5] p-[30px]">
            <div className="subtitle-bold">시험지 다운로드</div>
            <div className={`flex items-center justify-center gap-[14px]`}>
              <div className="cursor-pointer overflow-hidden rounded-full">
                <Image
                  src="/icons/icon-pdf.png"
                  alt="download"
                  onClick={() => handlePdfDownload({ mode: "exam" })}
                  width={50}
                  height={50}
                />
              </div>
              <div className="cursor-pointer overflow-hidden rounded-full hover:bg-gray-100">
                <Image
                  src="/icons/icon-word.png"
                  alt="download"
                  width={50}
                  height={50}
                  onClick={() => handleWordDownload({ mode: "exam" })}
                />
              </div>
              <div className="cursor-pointer overflow-hidden rounded-full">
                <Image
                  src="/icons/icon-hwp.png"
                  alt="download"
                  width={50}
                  height={50}
                  onClick={() => handleHwpDownload({ mode: "exam" })}
                />
              </div>
            </div>
          </section>
          <section className="mb-6 flex items-center justify-between gap-10 bg-[#f5f5f5] p-[30px]">
            <div className="subtitle-bold">정답지 다운로드</div>
            <div className={`flex items-center justify-center gap-[14px]`}>
              <div className="cursor-pointer overflow-hidden rounded-full hover:bg-gray-100">
                <Image
                  src="/icons/icon-pdf.png"
                  alt="download"
                  onClick={() => handlePdfDownload({ mode: "answer" })}
                  width={50}
                  height={50}
                />
              </div>
              <div className="cursor-pointer overflow-hidden rounded-full hover:bg-gray-100">
                <Image
                  src="/icons/icon-word.png"
                  alt="download"
                  width={50}
                  height={50}
                  onClick={() => handleWordDownload({ mode: "answer" })}
                />
              </div>
              <div className="cursor-pointer overflow-hidden rounded-full">
                <Image
                  src="/icons/icon-hwp.png"
                  alt="download"
                  width={50}
                  height={50}
                  onClick={() => handleHwpDownload({ mode: "answer" })}
                />
              </div>
            </div>
          </section>

          <div className="flex justify-end space-x-3">
            <Button
              label="취소"
              variant="defaultGray"
              size="sm"
              onClick={onClose}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* 로딩 중일 때 전체 모달 오버레이 */}
        {isLoading && <Loading />}

        {/* 숨겨진 PDF 콘텐츠 */}
        <DownContent />
      </div>
    </>
  );
};

export default DownloadModal;
