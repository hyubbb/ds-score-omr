import PageTitle from "@/components/Manual/PageTitle";
import Container from "./_components/Container";

const Page = ({ params }: { params: { id: string } }) => {
  // 응시자정보를 기반으로 검색을해서 임시 저장된 데이터가 있으면 불러오고 없으면 초기화 데이터로 넘겨주기

  return (
    <div className="flex w-full flex-col gap-4 overflow-x-auto">
      <Container id={params.id} />
    </div>
  );
};

export default Page;
