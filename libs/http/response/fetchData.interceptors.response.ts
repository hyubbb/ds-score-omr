const fetchDataResponse =
  (axiosInstance: any) =>
  async (error: {
    config: any;
    response?: {
      status: number;
      statusText: string;
    };
  }) => {
    const originalRequest = error.config;

    if (!error.response) {
      console.error("❌ 네트워크 오류:", error);
      alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
      return Promise.reject(error);
    }

    // console.log("전체 에러 응답:", error.response); // 디버깅용 로그
    // console.log("응답 데이터:", error.response.status); // 디버깅용 로그

    // HTTP 상태 코드로 먼저 체크
    if (error.response.status === 404) {
      console.warn(`🔍 데이터 없음 (HTTP 404)`, originalRequest);
      // 빈 배열을 포함한 성공 응답으로 처리
      return Promise.resolve({
        data: [],
        status: 200,
        statusText: "OK",
      });
    }

    if (!error.response.status) {
      console.error("❌ 응답 데이터 형식 오류:", error);
      return Promise.reject(error);
    }

    // 서버 커스텀 코드로 체크
    const code = error.response.status;
    const message =
      error.response.statusText || "알 수 없는 오류가 발생했습니다.";

    if (code === 200) {
      return axiosInstance(originalRequest);
    }

    if (code === 400) {
      console.warn(`🚫 잘못된 요청: ${message}`);
      alert(message);
      return Promise.reject(error);
    }
    if (code === 401) {
      console.warn(`🚫 인증 실패: ${message}`);
      alert(message);
      return Promise.reject(error);
    }

    if (code === 403) {
      console.warn(`🚫 접근 권한 없음: ${message}`);
      alert("접근 권한이 없습니다.");
      return Promise.reject(error);
    }

    if (code === 500) {
      console.error(`💥 서버 오류: ${message}`);
      alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      return Promise.reject(error);
    }

    console.error("❌ API 요청 실패:", message);
    alert("❌ API 요청 실패");
    return Promise.reject(error);
  };

export default fetchDataResponse;
