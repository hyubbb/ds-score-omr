import { getUnicodeFromKorean } from "../../../../_components/Name/_utils/getUnicodeFromKorean";
import { SUBJECT_EN } from "../../../../_utils/utils";
import Container from "./_components/Container";

const page = async ({ params }: { params: { subject: string } }) => {
  const subjectIndex = SUBJECT_EN.indexOf(params.subject);
  return <Container subjectIndex={subjectIndex} />;
};

export default page;
