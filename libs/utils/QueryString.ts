// 쿼리 스트링 만들어주는 함수
export const createQueryStringFromObject = (queryParams: any) => {
  const queryString = Object.entries(queryParams)
    .filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return queryString ? `?${queryString}` : "";
};

type queryParamsType = {
  [key: string]: string | number | boolean;
};
// 쿼리스트링을 객체로 만들어주는 함수
export const parseSearchParamsToObject = (searchParams: any) => {
  const queryParams: queryParamsType = {};
  const params = new URLSearchParams(searchParams);

  for (const [key, value] of params) {
    let parsedValue: string | number | boolean = value;

    // 값이 숫자로만 이루어진 문자열인 경우 숫자 타입으로 변환
    if (/^\d+$/.test(value)) {
      parsedValue = parseInt(value);
    }
    // 값이 "true" 또는 "false"인 경우 불리언 타입으로 변환
    else if (value === "true" || value === "false") {
      parsedValue = value === "true";
    }

    queryParams[key] = parsedValue;
  }

  return queryParams;
};

// 객체 얕은 비교하는 함수
export const shallowEqual = (objA: any, objB: any) => {
  if (objA === objB) {
    return true;
  }

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let key of keysA) {
    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
};
