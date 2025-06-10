"use client";

import { isLoadingState } from "@/atoms/atom";
import { useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import Spinner from "./Commons/Spinner/Spinner";

export default function GlobalLoading() {
  const setIsLoading = useSetRecoilState(isLoadingState);
  const isLoading = useRecoilValue(isLoadingState);

  useEffect(() => {
    // 페이지가 렌더링된 후 로딩 상태를 false로 변경
    setIsLoading(false);
  }, [setIsLoading]);

  if (isLoading) return <Spinner />;

  return null;
}
