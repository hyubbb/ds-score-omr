"use client";
import { useSearchParams } from "next/navigation";

export function useExamCode() {
  const searchParams = useSearchParams();
  return searchParams.get("code");
}
