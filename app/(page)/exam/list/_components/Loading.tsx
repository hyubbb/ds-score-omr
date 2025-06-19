import Spinner from "@/components/Commons/Spinner/Spinner";
import React from "react";

const Loading = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
      <div className="relative text-center">
        <div className="relative mb-6 h-16">
          <Spinner />
        </div>
        <div className="text-sm text-gray-600">파일을 생성하고 있습니다...</div>
      </div>
    </div>
  );
};

export default Loading;
