import { getUnicodeFromKorean } from "../../_components/Name/_utils/getUnicodeFromKorean";
import { ALPHABET_INDEX, KOREAN } from "../../_components/Name/_utils/Alphabet";
import Container from "./_components/Container";

import { SUBJECT_EN } from "../../_utils/utils";
import { cookies } from "next/headers";

const DUMMY_DATA = [
  "1_010104_070118_2_SIOAUFDIO   _3_2_1_4_4_2_5_ _2_4_1_3_3_2_2_5_1_3_2_4_1_2_3_4_5_5_4_3_2_1_1_3_5_2_4_4_2_1_4_4_2_3_5_1_2",
  "2_010104_070118_1_SIOAUFDIO   _5_5_2_4_1_3_3_2_2_5_1_2_1_1_3_  9_ 17_115_320_ 36_ 44_ 25_2_4_4_1_2_5_  4_ 10",
  "3_010104_070118_1_SIOAUFDIO   _087_0078_0010_079_2_4_1_3_3_3_2_4_1_4_2_5_5_2_4_2_1_5_1_3_2_4_1_2_3_4_5_5_4_5_5_4_3_2_1_1_3_5_2_4_1_3_3_2_2",
  "4_010104_070118_SIOAUFDIO   _2_5_1_2_3_4_5_5_5_2_4_2_1_5_1_3_3_2_2_5",
  "5_010104_070118_SIOAUFDIO   _11_2_4_4_2_1_4_4_2_5_5_2_3_2_2_5_1_1_3_2_4_12_3_4_5_4_3_2_1_1_3_5_5_2_4_1_3_3_2_ _5_1",
];

// const parseData = (fetchData: string[]) => {
//   return fetchData.map((data: string) => {
//     const parts = data.split("_");
//     const courseOrGender = parts[3].length == 1; // 과목코드가 있냐 없냐 판별하기 위한장치

//     const [
//       subject,
//       examCode,
//       birth,
//       maybeCourseOrGender,
//       name,
//       ...questions
//     ] = courseOrGender
//       ? parts
//       : [...parts.slice(0, 3), undefined, ...parts.slice(3)];

//     const handleConvertName = () => {
//       const structureName = name?.match(/.{1,3}/g) ?? []; // 이름 3글자씩 자르기
//       // 영어로 넘어온 이름을 한글로 변환
//       const convertName = structureName.map((n) => {
//         return n.split("").map((c, i) => {
//           return KOREAN[i][ALPHABET_INDEX[c as keyof typeof ALPHABET_INDEX]];
//         });
//       });
//       return convertName;
//     };
//     const convertedKrName = handleConvertName().map((n) => {
//       return getUnicodeFromKorean(n[0], n[1], n[2]);
//     });

//     return {
//       subject: subject,
//       examCode: examCode?.split("") || "",
//       birth: birth?.split("") || "",
//       courseOrGender: maybeCourseOrGender?.trim(),
//       name: handleConvertName(),
//       koreanName: convertedKrName,
//       questions: questions.map((q) => q || ""),
//     };
//   });
// };

const parseData = (fetchData: string[]) => {
  return fetchData.map((data: string) => {
    const parts = data.split("_");

    const subjectCode = parts[0];
    const subjectMap = {
      "1": "국어",
      "2": "수학",
      "3": "영어",
      "4": "한국사",
      "5": "탐구",
    };
    const subject = subjectMap[subjectCode as keyof typeof subjectMap];
    const subjectEn = SUBJECT_EN[
      subjectCode as keyof typeof SUBJECT_EN
    ] as string;
    const examCode = parts[1];
    const birth = parts[2];
    let course;
    let gender;
    let name;
    let questions;
    let univCode1;
    let univCode2;
    let phone = "45339426";
    if (subjectCode === "3") {
      // 영어
      gender = parts[3];
      name = parts[4];
      univCode1 = parts.slice(5, 7).join("");
      univCode2 = parts.slice(7, 9).join("");
      questions = parts.slice(9);
    } else if (subjectCode === "5") {
      // 탐구
      name = parts[3];
      const course1 = parts[4];
      const questions1 = parts.slice(5, 25);
      const course2 = parts[25];
      const questions2 = parts.slice(26);
      course = [course1, course2];
      questions = [questions1, questions2];
    } else if (subjectCode == "4") {
      // 한국사
      name = parts[3];
      questions = parts.slice(4);
    } else {
      // 국어, 수학, 한국사
      course = parts[3];
      name = parts[4];
      questions = parts.slice(5);
    }

    const handleConvertName = () => {
      const structureName = name?.match(/.{1,3}/g) ?? []; // 이름 3글자씩 자르기
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

    return {
      subject: subject,
      subjectCode: subjectCode,
      subjectEn: subjectEn,
      examCode: examCode?.split("") || "",
      birth: birth?.split("") || "",
      course: Array.isArray(course) ? course.join(",") : course,
      gender: gender,
      name: handleConvertName(),
      koreanName: convertedKrName,
      answers: questions.map((q) => q || ""),
      univCode1: univCode1?.split("") || [],
      univCode2: univCode2?.split("") || [],
      status: "false", // 답안 입력 현황
      phone: phone?.split("") || [],
    };
  });
};
const fetchData = async () => {
  // const response = await fetch("/api/omr/upload");
  // const data = await response.json();
  // return data;

  const omrData = parseData(DUMMY_DATA);
  return omrData;
};

const page = async () => {
  // tanstack query 사용
  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["omrListData"],
  //   queryFn: () => fetchData(),
  // });
  // const dehydratedData = dehydrate(queryClient);

  const cookieStore = cookies();
  // const attemptId = cookieStore.get("attemptId");
  const attemptId = { value: "1" };
  // if (!attemptId) {
  //   return <NotFound />;
  // }

  const initData = await fetchData();
  return (
    // <HydrationBoundary state={dehydratedData}>
    // <Container initData={initData} />
    <Container initData={initData} attemptId={attemptId.value} />
    // </HydrationBoundary>
  );
};

export default page;
