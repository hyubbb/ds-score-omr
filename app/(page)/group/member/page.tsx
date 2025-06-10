import React from "react";
import Container from "./_components/Container";
import { queryClient } from "@/libs/utils/query/queryClient";
import { fetchWithQuery } from "@/libs/utils/query/fetchWithQuery";

const page = async () => {
  // await queryClient.prefetchQuery({
  //   queryKey: ["group", "manual"],
  //   queryFn: () =>
  //     fetchWithQuery(`${process.env.NEXT_PUBLIC_API_MOCK_URL}/manual/group`),
  //   staleTime: 1000 * 60 * 60 * 24, // 24시간
  // });

  return (
    <div className="flex w-full flex-col gap-4 overflow-x-auto">
      {/* 
      응시자정보가 넘어 올테니까 넘어온 응시자 정보로 응시자 이름목록 만들어주고
      그 응시자 누르면 개별입력처럼 폼이 나오게
      */}

      {/* <Container /> */}
    </div>
  );
};

export default page;
