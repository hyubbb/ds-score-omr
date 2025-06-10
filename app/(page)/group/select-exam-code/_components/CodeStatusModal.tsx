import React from "react";

const CodeStatusModal = () => {
  return (
    <section className="mt-6 flex flex-col gap-3">
      <ul className="list-disc space-y-3 pl-5">
        <li>
          <strong>발급</strong> : 발급 완료 상태로 코드 미사용
        </li>
        <li>
          <strong>응시완료</strong> : 답안 입력 완료, 검수 미진행
        </li>
        <li>
          <strong>응시미완</strong> : 발급된 코드 중 일부 코드 응시 완료 시
          나머지 코드의 상태
        </li>
        <li>
          <strong>제출자검수완료</strong> : 답안 개별 입력 시 개별 입력자 검수
          완료
        </li>
        <li>
          <strong>단체장검수완료</strong> : 단체장 답안 검수 완료, 최종제출 가능
        </li>
        <li>
          <strong>최종제출완료</strong> : 답안 검수 및 최종 제출 완료
        </li>
        <li>
          <strong>환불완료</strong> : 미사용 코드에 대하여 관리자 환불 처리 완료
        </li>
        <li>
          <strong>폐기</strong> : 미사용 코드, 사용불가 상태
        </li>
      </ul>
    </section>
  );
};

export default CodeStatusModal;
