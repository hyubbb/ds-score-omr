import Button from "@/components/Commons/Form/Button/Button";
import Input from "@/components/Commons/Form/Input/Input";
import FormSelect from "@/components/Commons/Form/Select/Select";
import {
  getOnlySelectOption,
  getSelectOption,
} from "@/libs/utils/getSelectOption";
import { REGION_LIST } from "@/libs/utils/region";
import React from "react";

const SearchForm = () => {
  const regionOptions = getOnlySelectOption({
    전체: "전체",
    ...REGION_LIST,
    기타학원: "기타학원",
  });

  const statusOptions = getOnlySelectOption({
    전체: "전체",
    승인대기: "승인대기",
    승인완료: "승인완료",
  });

  const searchOptions = getSelectOption({
    단체명: "단체명",
    단체코드: "단체코드",
  });

  return (
    <section className="w-3/5 rounded-md border border-[var(--border-lightgray)] p-4">
      <form>
        <section className="flex flex-col gap-4">
          {/* 
          <div className="flex items-center gap-4">
            <label className="text-md w-20 font-bold" htmlFor="region">
              지역
            </label>
            <FormSelect
              name="region"
              items={regionOptions}
              defaultLabel="전체"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="text-md w-20 font-bold" htmlFor="status">
              상태
            </label>
            <FormSelect
              name="status"
              items={statusOptions}
              defaultLabel="전체"
            />
          </div> 
            */}
          <div className="flex items-center gap-4">
            <label className="text-md w-20 font-bold" htmlFor="searchType">
              검색어
            </label>
            <FormSelect
              name="searchType"
              items={searchOptions}
              defaultLabel="선택"
            />
            <Input name="searchTerm" />
          </div>
          <div className="flex justify-end">
            <Button label="검색" variant="primaryFill" size="sm" />
          </div>
        </section>
      </form>
    </section>
  );
};

export default SearchForm;
