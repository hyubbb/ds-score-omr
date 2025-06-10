// 응시 코드 상태를 한글로 변환하는 유틸 함수
export const convertCodeStatusToKorean = (status: string): string => {
  const statusMap: Record<string, string> = {
    COMPLETED: "응시 완료",
    INCOMPLETE: "응시 미완",
    REVIEW_SUBMITTED: "제출자 검수 완료",
    GROUP_REVIEW_COMPLETED: "단체장 검수 완료",
    TRANSMITTED: "최종 제출 완료",
    REFUND_COMPLETED: "환불 완료",
    DISCARDED: "폐기",
    GENERATED: "발급",
  };

  return statusMap[status] || "알 수 없음"; // 만약 매칭되는 값이 없으면 "알 수 없음" 반환
};
