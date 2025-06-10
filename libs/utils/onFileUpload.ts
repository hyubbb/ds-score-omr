import UploadService from "../../service/upload/UploadService";

// 파일 업로드
const onFileUpload = async (
  files: any[],
  directory: string,
  directory_id: number,
) => {
  if (files.length === 0) return;

  const uploadPromises = files.map(async (file) => {
    if (file.hasOwnProperty("id")) return file;

    const formData = new FormData();
    formData.append("files", file);
    formData.append("directory", directory);
    formData.append("directory_id", `${directory_id}`);
    try {
      const {
        data: { data, status },
      } = await UploadService.postFile(formData);

      if (status === 200) {
        return data;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  });

  const results = await Promise.all(uploadPromises);
  return results.filter((result) => result !== null);
};

// 비디오 프리뷰 이미지 만들기
export const onFilePreview = (file: File, callback: (url: string) => void) => {
  const url = URL.createObjectURL(file);
  const video = document.createElement("video");
  video.muted = true;
  video.preload = "auto";
  video.addEventListener("loadeddata", () => {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const datauri = canvas.toDataURL();
      callback(datauri);
    }
  });

  video.src = url;
};

export default onFileUpload;
