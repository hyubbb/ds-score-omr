"use client";

import classNames from "classnames";
import { ReactNode } from "react";

interface IFilterOption {
  title?: string;
  content?: ReactNode;
  titleCustom?: string;
}

const FilterOption = ({
  title = "",
  content = <>content</>,
  titleCustom,
}: IFilterOption) => {
  return (
    <>
      <div className="w-full flex justify-start flex-nowrap gap-5 h-fit min-h-10">
        {title && (
          <span
            className={classNames(
              "min-w-[100px] whitespace-nowrap text-md font-bold self-center ",
              titleCustom
            )}
          >
            {title}
          </span>
        )}
        <div className="w-full flex flex-wrap gap-2 self-center">{content}</div>
      </div>
    </>
  );
};

export default FilterOption;
