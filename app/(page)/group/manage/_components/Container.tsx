"use client";
import React, { useEffect } from "react";
import SearchForm from "./SearchForm";
import ListTable from "./ListTable";
import { FormProvider, useForm } from "react-hook-form";
import { IColumns } from "@/types/interface/common";
import { IGroupList } from "../_types/types";
import { dummyData } from "./dummyData";
import { dummyData2 } from "./dummyData2";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchGroupManageData } from "@/libs/utils/apis/api";
import { useRecoilState } from "recoil";
import { isLoadingState } from "@/atoms/atom";
import Spinner from "@/components/Commons/Spinner/Spinner";

const columns: IColumns[] = [
  { header: "단체명", name: ["groupName"], width: "120", align: "center" },
  {
    header: "지역",
    name: ["region"],
    width: "150",
    align: "center",
  },
  {
    header: "단체코드",
    name: ["groupCode"],
    width: "120",
    align: "center",
  },
  {
    header: "상태",
    name: ["status"],
    width: "80",
    align: "center",
    editor: (value: boolean) => (value ? "승인완료" : "승인대기"),
  },
];

// const data: IGroupList[] = dummyData2;

const Container = () => {
  const {
    data: groupData,
    isLoading,
    isFetched,
    error,
  } = useQuery({
    queryKey: ["groupData"],
    queryFn: () => fetchGroupManageData(),
  });

  const methods = useForm({
    defaultValues: {
      groupList: "",
      pageNum: 1,
      region: "",
      status: "",
      searchType: "",
      searchTerm: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <section className="flex flex-col gap-6">
        <SearchForm />
        {isLoading ? (
          <div className="flex h-full w-screen items-center justify-center text-center">
            <Spinner />
            <p>로딩중입니다.</p>
          </div>
        ) : (
          <ListTable items={groupData} columns={columns} />
        )}
      </section>
    </FormProvider>
  );
};

export default Container;
