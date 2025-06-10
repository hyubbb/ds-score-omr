"use client";

import PageTitle from "@/components/Manual/PageTitle";
import React from "react";
import Container from "./_components/Container";
import {
  fetchGroupManageDetailData,
  fetchGroupRelationData,
} from "@/libs/utils/apis/api";
import { queryClient } from "@/libs/utils/query/queryClient";

const page = async ({ params }: { params: { groupId: string } }) => {
  await queryClient.prefetchQuery({
    queryKey: ["groupDetail"],
    queryFn: () => fetchGroupManageDetailData(params.groupId),
  });

  await queryClient.prefetchQuery({
    queryKey: ["groupRelation"],
    queryFn: () => fetchGroupRelationData(params.groupId),
  });

  return (
    <div className="flex w-[1400px] flex-col gap-4 overflow-x-auto">
      <PageTitle>단체 상세</PageTitle>
      <Container groupId={params.groupId} />
    </div>
  );
};

export default page;
