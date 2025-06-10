export const formatNumber = (num: number) => {
  if (num === null || num === undefined) {
    return 0;
  }

  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num;
};

export function countWords(htmlString: string): number {
  // HTML 태그 제거
  const textWithoutTags = htmlString?.replace(/<[^>]*>/g, ' ');

  // HTML 엔터티를 일반 문자열로 변환
  const plainText = new DOMParser().parseFromString(textWithoutTags, 'text/html').body.textContent || '';

  // 공백을 기준으로 단어 분리 후 단어 수 반환
  const englishWords = plainText
    .trim()
    .split(/\s+/)
    .filter((word) => /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!@#$%^&*()-=_+[\]{}|;':",./<>?]+$/.test(word));

  const wordCount = englishWords.length;

  return wordCount;
}

// 첫글자만 대문자로
export const formatStringFirst = (input: string) => {
  if (input) {
    return input?.charAt(0)?.toUpperCase() + input?.slice(1)?.toLowerCase();
  } else {
    return '';
  }
};

// 3자리마다 , 찍음
export function addCommasToNumber(number: number | string): string {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
