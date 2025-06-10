import Container from "../list/(routes)/[subject]/_components/Container";
import { getUnicodeFromKorean } from "../../_components/Name/_utils/getUnicodeFromKorean";
import { ALPHABET_INDEX, KOREAN } from "../../_components/Name/_utils/Alphabet";

const DUMMY_DATA =
  "010104_070118_2_SIOAUFDIO   _3_2_1_4_4_2_5_ _2_4_1_3_3_2_2_5_1_3_2_4_1_2_3_4_5_5_4_3_2_1_1_3_5_2_4_4_2_1_4_4_2_3_5_1_2";

const fetchData = async () => {
  // const response = await fetch("/api/omr/upload");
  // const data = await response.json();
  // return data;

  const omrData = DUMMY_DATA.split("_");
  const [examCode, birth, course, name, ...questions] = omrData;

  // OMR카드의 한글 순서랑 유니코드에서 지원하는 순서가 다르기 때문에
  // OMR카드의 순서로 영어로 넘어온 코드를 한글로 변환처리 한 후
  // 유니코드의 영문 순서로 변환해서 자음 모음을 합쳐서 한글로 변환
  const handleConvertName = () => {
    const structureName = name.match(/.{1,3}/g) ?? []; // 이름 3글자씩 자르기
    // 영어로 넘어온 이름을 한글로 변환
    const convertName = structureName.map((n) => {
      return n.split("").map((c, i) => {
        return KOREAN[i][ALPHABET_INDEX[c as keyof typeof ALPHABET_INDEX]];
      });
    });
    return convertName;
  };

  const convertedKrName = handleConvertName().map((n) => {
    return getUnicodeFromKorean(n[0], n[1], n[2]);
  });

  const initData = {
    examCode: examCode.split(""),
    birth: birth.split(""),
    // gender: gender,
    name: handleConvertName(),
    koreanName: convertedKrName,
    questions: questions,
    course: course,
  };

  return initData;
};

const page = async () => {
  const initData = await fetchData();

  return <Container initData={initData} />;
};

export default page;
