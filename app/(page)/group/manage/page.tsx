import React from "react";
import PageTitle from "../../../../components/Manual/PageTitle";
import Container from "./_components/Container";
import { QueryClient } from "@tanstack/react-query";
import { fetchGroupManageData } from "@/libs/utils/apis/api";
import { queryClient } from "@/libs/utils/query/queryClient";

const page = async () => {
  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["groupData"],
  //   queryFn: () => fetchGroupManageData(),
  // });
  return (
    <div className="flex w-[1400px] flex-col gap-4 overflow-x-auto">
      <PageTitle>나의 단체</PageTitle>
      <Container />
    </div>
  );
};

export default page;
