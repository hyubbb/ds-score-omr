"use client";

import { ReactNode } from "react";
import Button from "../Form/Button/Button";

export interface ISearchFilter {
  optionContent: ReactNode;
  tabContent?: ReactNode;
  onReset?: () => void;
  onSearch?: () => void;
}

export const SearchFilter = ({
  optionContent,
  tabContent,
  onReset,
  onSearch,
}: ISearchFilter) => {
  return (
    <section>
      {tabContent}

      <div className="border-grayDB mt-[-1px] flex flex-col gap-y-6 border-[1px] bg-white px-[1.875rem] py-[1.5625rem]">
        {optionContent}

        {onReset && onSearch && (
          <div className="flex place-content-center gap-5">
            <Button
              label="초기화"
              variant="secondary"
              size="lg"
              onClick={onReset}
            />
            <Button
              type="submit"
              label="검색"
              variant="primaryFill"
              size="lg"
              onClick={onSearch}
            />
          </div>
        )}
      </div>
    </section>
  );
};
