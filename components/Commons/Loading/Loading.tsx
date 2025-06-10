import { isLoadingState } from "@/atoms/atom";
import React from "react";
import { useRecoilValue } from "recoil";
import Spinner from "../Spinner/Spinner";

const Loading = () => {
  const isLoading = useRecoilValue(isLoadingState);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Spinner />
    </div>
  );
};

export default Loading;
