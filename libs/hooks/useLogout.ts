import { useRouter } from 'next/navigation';

import { removeAccessToken } from '../utils/manageCookie';

export const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    removeAccessToken('accessToken');
    router.push('/');
  };

  return { logout };
};
