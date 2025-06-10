// 데이터를 받아올때 공백으로 넘어오는 값을
// trim 또는 0으로 치환 처리하는 함수

function transformString(str: string) {
  const trimmed = str.trim(); // 앞뒤 공백 제거
  if (trimmed === "") return null; // 모든 공백만 있는 경우 빈 문자열 반환

  const leftSpaces = str.length - str.trimStart().length; // 왼쪽 공백 개수
  const rightSpaces = str.length - str.trimEnd().length; // 오른쪽 공백 개수

  if (leftSpaces === 1 && rightSpaces === 1) {
    return trimmed + "0"; // 원래 값 + "0"
  } else if (rightSpaces > 0) {
    return trimmed + "00"; // 원래 값 + "00"
  } else if (leftSpaces > 0) {
    return trimmed; // 원래 값 유지
  }
  return trimmed; // 기본적으로 원래 값 유지
}

const fetchReplaceData = ({
  data,
  grade,
  subject = "notMath",
}: {
  data: string[];
  grade: number;
  subject?: string;
}) => {
  let newAnswers;
  // const newAnswers = data.map((answer) => {
  //   return answer.trim();
  // });

  if (subject !== "math") {
    return data.map((answer) => answer.trim());
  }

  if (grade === 3) {
    const COMMON_ANSWER_LENGTH = 15;
    const COMMON_SHORT_ANSWER_LENGTH = 7;
    const OPTIONAL_ANSWER_LENGTH = 6;
    const OPTIONAL_SHORT_ANSWER_LENGTH = 2;
    const TOTAL_ANSWER_LENGTH =
      COMMON_ANSWER_LENGTH +
      COMMON_SHORT_ANSWER_LENGTH +
      OPTIONAL_ANSWER_LENGTH +
      OPTIONAL_SHORT_ANSWER_LENGTH;
    // length에 따라서 short answer이 아닌 나머지는 문자열을 비교해서 있으면 공백2칸 없으면 3칸추가
    newAnswers = data.map((answer, index) => {
      if (
        (COMMON_ANSWER_LENGTH <= index &&
          index < COMMON_ANSWER_LENGTH + COMMON_SHORT_ANSWER_LENGTH) ||
        index >= TOTAL_ANSWER_LENGTH - OPTIONAL_SHORT_ANSWER_LENGTH
      ) {
        console.log("주관식");
        // 주관식인 녀석은 공백을 0으로 처리
        // return answer.replace(/ /g, "0");

        return transformString(answer);

        // return answer;
      } else {
        // 객관식은 trim
        // return answer;
        return answer.trim();
      }
    });
  }

  if (grade === 2) {
    //
  }
  if (grade === 1) {
    //
  }

  return newAnswers;
};

export default fetchReplaceData;
