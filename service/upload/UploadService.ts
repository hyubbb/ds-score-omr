import { http } from "@/libs/http/http.interceptors.request";

// 목록조회
const postFile = (formData: FormData) => {
  return http.post<any>(`/api/upload/file`, formData, {
    headers: { "Content-type": "multipart/form-data" },
  });
};

const UploadService = {
  postFile,
};

export default UploadService;
