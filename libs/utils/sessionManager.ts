// 검색파라미터 세션에 저장
const setSearchSession = (value: Object) => {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem('SEARCH', JSON.stringify(value));
  }
};
// 검색파라미터 세션에서 가져오기
const getSearchSession = () => {
  if (typeof sessionStorage !== 'undefined') {
    return JSON.parse(sessionStorage.getItem('SEARCH') as string);
  }
  return null;
};
// 검색파라미터 세션에서 제거
const removeSearchSession = () => {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.removeItem('SEARCH');
  }
};

// 특정 검색 제외 모두 제거
const removeExceptKey = (keyToKeep: string): void => {
  const obj = getSearchSession();

  if (obj !== null && keyToKeep in obj) {
    for (let key in obj) {
      if (key !== keyToKeep) {
        delete obj[key];
      }
    }
  } else {
    removeSearchSession();
  }
};

export { setSearchSession, getSearchSession, removeSearchSession, removeExceptKey };
