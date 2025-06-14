import {
  CHARCODE_FIRST_NAME,
  CHARCODE_LAST_NAME,
  CHARCODE_MIDDLE_NAME,
} from "./Alphabet";

// 한글 초성, 중성, 종성을 유니코드로 변환
// 한글로 받아와서 OMR카드의 INDEX를 unicode용으로 변경해서 변환
export const getUnicodeFromKorean = (
  firstName: string,
  middleName: string,
  lastName: string,
) => {
  if (!middleName) {
    return "";
  }

  const firstIndex = CHARCODE_FIRST_NAME.indexOf(firstName) || 0;
  const middleIndex = CHARCODE_MIDDLE_NAME.indexOf(middleName) || 0;
  let lastIndex = CHARCODE_LAST_NAME.indexOf(lastName) || 0;

  // 받침이 없을수 있으니 받침이 없으면 0(공백)
  if (lastIndex === -1) {
    lastIndex = 0;
  }

  if (firstIndex === -1 || middleIndex === -1) {
    return "";
  }

  const unicode = 0xac00 + firstIndex * 588 + middleIndex * 28 + lastIndex;
  return String.fromCharCode(unicode);
};
