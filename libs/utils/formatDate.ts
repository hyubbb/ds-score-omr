import moment from "moment";

// 날짜 형식 바꿔주는 함수
export const formatDate = (input: string) => {
  return moment(input).format("LL HH:mm");
};

//MM DD, YYYY HH:mm 형식으로 날짜 변환
export const formatDateUS = (input: string) => {
  // return moment(input).format('MM DD, YYYY HH:mm')
  // return moment(input).format('YYYY-MM-DD HH:mm');
  return moment(input).format("YYYY-MM-DD");
};

export const formatDateKR = (input: string) => {
  // return moment(input).format('MM DD, YYYY HH:mm')
  // return moment(input).format('YYYY-MM-DD HH:mm');
  const date = new Date(input);
  return moment(date).format("YYYY-MM-DD");
};

// 날짜 사이 기간 맞추는 함수
type PeriodType = "1Week" | "1Month" | "3Month" | "6Month" | "1Year" | "전체";

export const getPeriodType = (startDate: Date, endDate: Date): PeriodType => {
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const daysDiff = Math.round(
    (endDate.getTime() - startDate.getTime()) / millisecondsInDay,
  );

  if (daysDiff === 7) {
    return "1Week";
  } else if (daysDiff >= 28 && daysDiff <= 31) {
    return "1Month";
  } else if (daysDiff >= 84 && daysDiff <= 93) {
    return "3Month";
  } else if (daysDiff >= 168 && daysDiff <= 186) {
    return "6Month";
  } else if (daysDiff >= 365 && daysDiff <= 366) {
    return "1Year";
  } else {
    return "전체";
  }
};
