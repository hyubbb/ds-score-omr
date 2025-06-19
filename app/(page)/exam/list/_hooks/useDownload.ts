import { useState } from "react";
import { useRecoilState } from "recoil";
import { downloadModeState } from "@/atoms/download/atom";
import {
  downloadPdf,
  downloadWord,
  downloadHwp,
} from "../../../../../utils/download";

export type DownloadMode = "exam" | "answer";

export const useDownload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useRecoilState(downloadModeState);

  const handlePdfDownload = async ({ mode }: { mode: DownloadMode }) => {
    try {
      setIsLoading(true);
      setMode({ mode });
      await downloadPdf(mode);
    } catch (error) {
      console.error("PDF 다운로드 중 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWordDownload = async ({ mode }: { mode: DownloadMode }) => {
    try {
      setIsLoading(true);
      setMode({ mode });
      await downloadWord(mode);
    } catch (error) {
      console.error("다운로드 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHwpDownload = async ({ mode }: { mode: DownloadMode }) => {
    try {
      setIsLoading(true);
      setMode({ mode });
      await downloadHwp(mode);
    } catch (error) {
      console.error("다운로드 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    mode,
    handlePdfDownload,
    handleWordDownload,
    handleHwpDownload,
  };
};
