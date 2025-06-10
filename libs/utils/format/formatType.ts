// 파일 이름에서 확장자만 추출
export const removeFileName = (originalFileName: string): string => {
  const lastIndex = originalFileName?.lastIndexOf('.');
  if (lastIndex < 0) {
    return '';
  }
  return originalFileName?.substring(lastIndex + 1).toLowerCase();
};

// 확장자 모음
export const FILE_EXTENSION = [
  'jpeg',
  'jpg',
  'png',
  'gif',
  'webp',
  'ppt',
  'pptx',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'pdf',
  'hwp',
  'txt',
  'mp4',
  'hevc',
  'avi',
  'mov',
  'webm',
  'zip',
];
export const VIDEO_EXTENSION = ['mov', 'hevc', 'mp4', 'avi', 'webm'];
export const IMG_EXTENSION = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
export const DOC_EXTENSION = ['ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'hwp', 'txt', 'zip'];

// 파일이름으로 타입 추출
export const formatFileType = (fileName: string) => {
  const extension = removeFileName(fileName)?.toLowerCase();

  if (VIDEO_EXTENSION.includes(extension)) {
    switch (extension) {
      case 'mov':
        return 'video/mp4';
      case 'hevc':
        return 'video/hevc';
      case 'mp4':
        return 'video/mp4';
      case 'avi':
        return 'video/x-msvideo';
      case 'webm':
        return 'video/webm';
      default:
        return 'video/mp4';
    }
  } else if (IMG_EXTENSION.includes(extension)) {
    return `image/${extension}`;
  } else if (DOC_EXTENSION.includes(extension)) {
    switch (extension) {
      case 'doc':
        return 'application/msword';
      case 'docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case 'ppt':
        return 'application/vnd.ms-powerpoint';
      case 'pptx':
        return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
      case 'txt':
        return 'text/plain';
      case 'xls':
        return 'application/vnd.ms-excel';
      case 'xlsx':
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      case 'hwp':
        return 'application/x-hwp';
      default:
        return `application/${extension}`;
    }
  }
  return '';
};
