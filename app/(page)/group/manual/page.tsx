import Container from "./_components/Container";
import { queryClient } from "@/libs/utils/query/queryClient";
import { fetchWithQuery } from "@/libs/utils/query/fetchWithQuery";

const Page = async () => {
  // 응시자정보를 기반으로 검색을해서 임시 저장된 데이터가 있으면 불러오고 없으면 초기화 데이터로 넘겨주기
  // await queryClient.prefetchQuery({
  //   queryKey: ["group", "manual"],
  //   queryFn: () => fetch(`/manual/group`),
  //   staleTime: 1000 * 60 * 60 * 24, // 24시간
  // });

  return (
    <div className="flex w-full flex-col gap-4 overflow-x-auto">
      <Container />
    </div>
  );
};

export default Page;
