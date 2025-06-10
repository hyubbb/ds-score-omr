"use client";

import Button from "@/components/Commons/Form/Button/Button";
import TabGroup from "@/components/Commons/SearchFilter/TabGroup/TabGroup";
import PageTitle from "@/components/Manual/PageTitle";
import { useModal } from "@/libs/hooks/useModal";
import React, { useState } from "react";

const MatchingContainer = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const { openModal } = useModal();

  const tabs = [{ label: "미매칭 답안" }, { label: "매칭완료 답안" }];

  // 현재 선택된 탭에 따라 tabBox 내용 변경
  const tabBoxContent = () => {
    switch (currentTab) {
      case 0:
        return <div>미매칭 답안, 여기에 모달이 있어야됨</div>;
      case 1:
        return <div>매칭답안</div>;

      default:
        return null;
    }
  };

  // const handleExamCodeStatus = () => {
  //   openModal({
  //     title: "응시코드 상태",
  //     content: <CodeStatusModal />,
  //     isBtn: false,
  //     canClose: true,
  //   });
  // };

  return (
    <div className="flex w-[1400px] flex-col gap-4 overflow-y-auto">
      <PageTitle>단체장 답안 검수</PageTitle>
      {/* currentTab 상태에 따라 tabBox 내용 변경 */}
      <TabGroup
        tabItems={tabs}
        current={currentTab}
        setCurrent={setCurrentTab}
        tabBox={tabBoxContent()}
      />

      <Button
        label="매칭 완료"
        variant="primaryFill"
        size="md"
        onClick={() => {}}
        disabled={currentTab !== 1}
      />
    </div>
  );
};

export default MatchingContainer;
