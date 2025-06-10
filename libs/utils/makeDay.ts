// 날짜
export const today = new Date();
export const todayDate = today.getDate();
export const todayMonth = today.getMonth();
export const todayYear = today.getFullYear();
export const todayHours = today.getHours();
export const todayMinutes = today.getMinutes();
export const past1Month = new Date(todayYear, todayMonth - 1, todayDate);
export const future1Month = new Date(todayYear, todayMonth + 1, todayDate);
export const future3Month = new Date(todayYear, todayMonth + 3, todayDate);
export const weekday = ['일', '월', '화', '수', '목', '금', '토'];
export const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const makeDay = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedDay = day < 10 ? `0${day}` : `${day}`;
  return `${year}-${formattedMonth}-${formattedDay}`;
};

export const formatDateString = (date: string) => {
  const day = new Date(date);

  return `${monthNames[day.getMonth()]} ${day.getDate()}`;
};

export const formatMonthString = (date: string) => {
  const day = new Date(date);
  return `${monthNames[day.getMonth()]}`;
};
