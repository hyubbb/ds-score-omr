import React from "react";

const PageTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`mt-[50px] text-2xl font-semibold ${className}`}>
      {children}
    </div>
  );
};

export default PageTitle;
