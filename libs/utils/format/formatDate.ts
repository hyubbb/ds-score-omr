import moment from "moment-timezone";

// 날짜 형식 바꿔주는 함수
export const formatDate = (input: string | Date) => {
  return moment(input).tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
};
export const formatHHMMDate = (input: string | Date) => {
  return moment(input).tz("Asia/Seoul").format("YYYY-MM-DD HH:mm");
};
export const formatYYMMDDate = (input: string | Date) => {
  return moment(input).tz("Asia/Seoul").format("YYMMDD");
};

export const formatEndDate = (input: string | Date) => {
  return moment(input).tz("Asia/Seoul").format("YYYY-MM-DD 23:59:59");
};

export const formatDateUser = (input: string | Date) => {
  return moment(input).tz("Asia/Seoul").format("YYYY-MM-DD");
};

export const formatDateDot = (input: string | Date) => {
  return moment(input).tz("Asia/Seoul").format("YYYY.MM.DD");
};
// 엑셀다운로드시
export const formatDateExcel = (input: string | Date) => {
  return moment(input).tz("Asia/Seoul").format("YYMMDDHHmmss");
};
// 차트 월일
export const formatDateString = (date: string) => {
  const day = new Date(date);

  return `${day.getMonth() + 1}월 ${day.getDate()}일`;
};

// 차트 월
export const formatMonthString = (date: string) => {
  const day = new Date(date);
  return `${day.getMonth() + 1}월`;
};

export const today = new Date();
export const todayDate = today.getDate();
export const todayMonth = today.getMonth();
export const todayYear = today.getFullYear();
export const past1Week = new Date(todayYear, todayMonth, todayDate - 7);
export const past1Month = new Date(todayYear, todayMonth - 1, todayDate);
export const future1Month = new Date(todayYear, todayMonth + 1, todayDate);

// 가장 가까운 10분뒤
const nearestTenMinutes = Math.ceil(new Date().getMinutes() / 10) * 10;
const defaultTime = new Date();
defaultTime.setMinutes(nearestTenMinutes);

// 기본 값에서 1시간 뒤의 시간 구하기
const defaultTimePlusOneHour = new Date(defaultTime.getTime());
defaultTimePlusOneHour.setHours(defaultTimePlusOneHour.getHours() + 1);

export const PlusOneHour = (defaultTime: Date) => {
  const defaultTimePlusOneHour = new Date(defaultTime.getTime());
  defaultTimePlusOneHour.setHours(defaultTimePlusOneHour.getHours() + 1);
  return defaultTimePlusOneHour;
};

// 1년 전
export const OneYearAgo = () => {
  const oneYearAgo = new Date(todayYear - 1, todayMonth, todayDate);
  return oneYearAgo;
};

// 날짜에서 일수 더하거나 빼기
export const CalculateDay = (
  defaultTime: Date,
  cal: "add" | "sub",
  val: number,
) => {
  const defaultTimePlusOneDay = new Date(defaultTime?.getTime());
  defaultTimePlusOneDay.setDate(
    cal === "add"
      ? defaultTimePlusOneDay.getDate() + val
      : defaultTimePlusOneDay.getDate() - val,
  );
  return defaultTimePlusOneDay;
};

// 생일날짜로 만 나이 구하기
export const getAge = (birthday: Date) => {
  const ageDifMs = Date.now() - new Date(birthday).getTime(); // 밀리초 차이 계산
  const ageDate = new Date(ageDifMs); // 날짜 객체로 변환
  return Math.abs(ageDate.getUTCFullYear() - 1970).toString(); // 연도 계산
};

export function getTimeFromDate(date: Date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function getIsPastTime(date: Date) {
  const currentDate = new Date();
  return date.getTime() < currentDate.getTime();
}

// 생년월일로 년생 구하기
export const getBirthYear = (birth: Date): string => {
  const date = new Date(birth);
  const year = date.getFullYear();
  const shortYear = year % 100;
  const formattedYear = shortYear < 10 ? `0${shortYear}` : shortYear;
  return `${formattedYear}년생`;
};

// 며칠이상 차이나는지 구하는 함수
export const getBetweenDate = (date: Date): boolean => {
  // 현재 날짜를 가져옵니다.
  const currentDate = new Date();
  // 날짜 간의 차이를 밀리초 단위로 계산
  const diffTime = Math.abs(currentDate.getTime() - date.getTime());
  // 7일을 밀리초로 환산
  // TODO: 나중에 며칠이 기준인지 받을 것
  const sevenDaysInMillis = 7 * 24 * 60 * 60 * 1000;
  // 7일 이상 차이나면 false 반환, 그렇지 않으면 true 반환
  return diffTime <= sevenDaysInMillis;
};

// 한달이상 차이나는지 확인하는 함수
export const isDifferenceOneMonthOrMore = (
  start: Date | string,
  end: Date | string,
): boolean => {
  // 시작날짜와 마감날짜
  const startDate = new Date(start);
  const endDate = new Date(end);

  // 날짜 간의 연도 차이
  const yearDiff = endDate.getFullYear() - startDate.getFullYear();

  // 날짜 간의 월 차이
  const monthDiff = endDate.getMonth() - startDate.getMonth();

  // 월 단위로 비교하기 위해 보정된 차이 계산
  const diffInMonths = yearDiff * 12 + monthDiff;

  // 한 달 이상 차이나는지 확인
  return (
    diffInMonths > 1 ||
    (diffInMonths === 1 && endDate.getDate() > startDate.getDate())
  );
};

export { defaultTime, defaultTimePlusOneHour };
