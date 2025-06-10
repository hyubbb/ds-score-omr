import { useRef, useEffect } from 'react';

/**
 * useEffect에서 첫번째 렌더링(마운트) 시에는
 * 콜백함수를 호출하지 않도록 하기 위해, 로직을 추가할 때 사용
 */
export const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};
