"use client";

import React from "react";
import Spinner from "./Spinner";
import { useRecoilValue } from "recoil";
import { isLoadingState } from "@/atoms/atom";

const RecoilLoadingSpinner = () => {
  const isLoading = useRecoilValue(isLoadingState);

  if (!isLoading) return null;
  return <Spinner />;
};

export default RecoilLoadingSpinner;
