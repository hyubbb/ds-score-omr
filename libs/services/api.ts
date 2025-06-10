import { fetchWithQuery } from "../utils/query/fetchWithQuery";

export const fetchManualAnswer = async (url: string, options: RequestInit) => {
  const res = await fetchWithQuery(url, options);
  console.log(res);
  return res;
};
