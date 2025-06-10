//  값을 전송할때,
// 주관식은 0의 숫자는 공백으로 처리하고, 객관식은 뒤에 공백2칸 추가,
// 값이 없을경우에는 공백3칸으로 처리한다.

const postReplaceData = ({
  data,
  grade,
  subject = "notMath",
  type = "manual",
}: {
  data: any[];
  grade: number;
  subject?: string;
  type?: string;
}) => {
  let newAnswers;
  // const newAnswers = data.map((answer) => {
  //   return answer.trim();
  // });

  if (subject !== "math") {
    // 수학이아님면 객관식은 뒤에 공백2칸 추가, 값이 없을경우에는 공백3칸으로 처리한다.
    console.log(subject, type, data[0]);
    if (type == "omr" && (subject == "society" || subject == "science")) {
      //   const combineData = data.map((answer) => answer.join(""));
      //   const processedData = combineData.map((answer) =>
      //     !answer ? "   " : answer + "  ",
      //   );
      return data[0].map((answer: any) => (!answer ? "   " : answer + "  "));
      //   return [...processedData[0], ...processedData[1]];
    }

    return data.map((answer) => (!answer ? "   " : answer + "  "));
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
        //  주관식일때
        // 저장할때는 주관식인 녀석은 0은 공백으로 처리 2글자일때는 앞에 공백 1칸 , 1글자일떄는 공백2칸 앞에 추가

        if (!answer) {
          answer = "   ";
        } else if (answer.length === 3) {
          answer;
        } else if (answer.length === 2) {
          answer = " " + answer;
        } else if (answer.length === 1) {
          answer = "  " + answer;
        }

        // newAnswers = newAnswers.trim();
        return answer.replace(/^0+/, " ");
      } else {
        // 객관식은 값이있으면 뒤에 공백 두칸 , 값이 없으면 세칸
        if (!answer) {
          return "   ";
        } else {
          return answer + "  ";
        }
        // return answer.trim();
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

export default postReplaceData;
