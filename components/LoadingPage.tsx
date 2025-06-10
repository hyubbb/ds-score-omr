"use client";
import React from "react";
import Spinner from "./Commons/Spinner/Spinner";
import { errorState } from "@/atoms/atom";
import { setRecoil } from "recoil-nexus";

const LoadingPage = ({ message, type }: { message: string; type: string }) => {
  setRecoil(errorState, { isError: true, message, type });
  return (
    <div className="flex h-full w-full items-center justify-center">
      {/* <Spinner /> */}
    </div>
  );
};

export default LoadingPage;
