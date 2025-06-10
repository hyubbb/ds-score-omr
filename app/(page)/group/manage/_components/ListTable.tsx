"use client";
import Button from "@/components/Commons/Form/Button/Button";
import ColTable from "@/components/Commons/Table/Coltable";
import { IColumns } from "@/types/interface/common";
import React from "react";
import { IGroupList } from "../_types/types";
import { Pagination } from "@/components/Commons/Table/Pagination/Pagination";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ListTable = ({
  items,
  columns,
}: {
  items: IGroupList[];
  columns: IColumns[];
}) => {
  const router = useRouter();
  const { watch } = useFormContext();
  const pageNum = watch("pageNum");

  // 임시 페이지네이션 처리를 위한 변수
  const pageCount = 5; // 한 페이지에 보여줄 아이템 수
  // const pageCount = 20; // 한 페이지에 보여줄 아이템 수
  const pageSize = 3;
  const startIndex = (pageNum - 1) * pageCount;
  const endIndex = startIndex + pageCount;
  const paginatedItems = items.slice(startIndex, endIndex); // 페이지에 보여줄 아이템
  const totalPageCnt = Math.ceil(items.length / pageCount); // 총 페이지 수
  const totalCnt = items.length;
  const handleCreate = () => {
    router.push("/group/manage/create");
  };

  return (
    <section className="w-3/5">
      <div className="mb-4 flex justify-end">
        <Button
          label="신청"
          variant="defaultBlack"
          size="sm"
          onClick={handleCreate}
        />
      </div>
      <ColTable
        isNumber={true}
        items={paginatedItems}
        columns={columns}
        name="groupList"
        tableKey="groupList"
        isNumberName="번호"
        isRowLink={{
          pathname: "/group/manage/",
          slug: "id",
          afterPathname: "/detail",
          columnName: "groupName",
        }}
        baseNumber={totalCnt - (pageNum - 1) * pageCount}
      />
      <Pagination totalCnt={totalPageCnt} pageSize={pageSize} name="pageNum" />
    </section>
  );
};

export default ListTable;
