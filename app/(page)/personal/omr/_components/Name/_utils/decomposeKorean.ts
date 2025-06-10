import {
  CHARCODE_FIRST_NAME,
  CHARCODE_MIDDLE_NAME,
  CHARCODE_LAST_NAME,
} from "./Alphabet";

// 입력된 한글을 초성 중성 종성으로 분리
export const decomposeKorean = (char: string) => {
  const charCode = char.charCodeAt(0);

  if (charCode < 0xac00 || charCode > 0xd7a3) {
    return [];
  }

  const base = charCode - 0xac00;

  const choIndex = Math.floor(base / 588);
  const jungIndex = Math.floor((base % 588) / 28);
  const jongIndex = base % 28;

  return [
    CHARCODE_FIRST_NAME[choIndex],
    CHARCODE_MIDDLE_NAME[jungIndex],
    CHARCODE_LAST_NAME[jongIndex],
  ];
};
