import React from "react";
import { FadeLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="absolute left-1/2 top-1/2 z-[120] -translate-x-1/2 -translate-y-1/2 transform">
      <FadeLoader />
    </div>
  );
};

export default Spinner;
