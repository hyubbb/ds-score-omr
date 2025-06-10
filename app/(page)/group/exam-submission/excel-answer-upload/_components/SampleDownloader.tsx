"use client";

import Button from "@/components/Commons/Form/Button/Button";
import React from "react";

const SampleDownloader = () => {
  const handleDownLoad = () => {
    const fileName = "단체답파싱연습 샘플";
    const fileUrl = "/xlsx/단체답파싱연습.xlsx";

    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <Button
        label="양식 다운로드"
        variant="defaultGray"
        size="exlg"
        className="font-16 mb-[20px] mt-6 self-start"
        onClick={() => handleDownLoad()}
      />
      <div className="flex h-[500px] w-full flex-col items-start justify-center gap-4 bg-[var(--bg-gray)] p-5">
        <p className="font-16 mb-4 !font-bold">답안 작성 가이드</p>
        <p className="font-16">
          💡각 문항 별 답은 1개씩 입력해주세요.(2개 이상 입력 시 오류가 발생할
          수 있습니다.)
        </p>
        <p className="font-16">💡모든 문항의 답을 입력해주세요.</p>
        <p className="font-16">
          💡검토 페이지에서 입력된 답안을 꼭 확인해주세요. <br />
          (답안 미검토로 인해 오기입 혹은 미기입된 답안에 대한 책임은 모두
          응시자에게 있습니다.)
        </p>
        <p className="font-16">
          💡탐구영역 선택 과목 번호는 아래 리스트를 확인해주세요.
        </p>
        <p className="font-16">
          💡(사회탐구) 생활과 윤리:11/ 윤리와 사상:12 / 한국지리:13 /
          세계지리:14/ 동아시아사:15/ 세계사:16/ 경제:17/ 정치와 법:18/
          사회·문화:19/
          <br />
          💡(과학탐구) 물리학Ⅰ:20/ 화학Ⅰ:21/ 생명과학Ⅰ:22/ 지구과학Ⅰ:23/
          물리학Ⅱ:24/ 화학Ⅱ:25/ 생명과학Ⅱ:26/ 지구과학Ⅱ:27
        </p>
      </div>
    </>
  );
};

export default SampleDownloader;
