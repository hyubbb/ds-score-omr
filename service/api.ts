export const fetchApi = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`API 요청 실패: ${error}`);
    throw error;
  }
};
