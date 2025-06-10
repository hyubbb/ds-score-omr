import React from "react";

const PageTitle = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-[30px] text-2xl font-semibold">{children}</div>;
};

export default PageTitle;
