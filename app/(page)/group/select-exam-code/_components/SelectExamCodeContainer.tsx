"use client";

import Button from "@/components/Commons/Form/Button/Button";
import { useModal } from "@/libs/hooks/useModal";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import CodeStatusModal from "./CodeStatusModal";
import PageTitle from "@/components/Commons/Title/PageTitle";
import { Icon } from "@/components/Commons/Icons/Icon";
import { useAlert } from "@/libs/hooks/useAlert";
import { useExamCode } from "@/libs/hooks/group/useExamCode";
import ColTable from "@/components/Commons/Table/Coltable";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetExamCodeList } from "../../../../../querys/group/ExamCodeQuerys";
import Spinner from "@/components/Commons/Spinner/Spinner";
import { convertCodeStatusToKorean } from "../utils/examCode";
import { parseSearchParamsToObject } from "@/libs/utils/QueryString";

type ExamCode = {
  id: number;
  registrationCode: string;
  codeStatus: string;
  codeType: string;
};

const SelectExamCodeContainer = ({ params }: { params: { num?: string } }) => {
  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      selectedExamCodes: [],
    },
  });
  const { openAlert, closeAlert } = useAlert();
  const { openModal } = useModal();
  const { addExamCodes } = useExamCode(); //recoil
  const router = useRouter();

  const queryBody = parseSearchParamsToObject(params);

  const { data: examCodesList, isPending } = useGetExamCodeList(queryBody);

  if (isPending) return <Spinner />;

  // console.log("mockExamCodes JSON: ", JSON.stringify(examCodesList, null, 2));

  //응시하기 버튼 눌렀을 때
  const handleExamTake = () => {
    const selectedExamCodes = methods.getValues(
      "selectedExamCodes",
    ) as ExamCode[];

    console.log("선택된 코드 개수", selectedExamCodes.length);
    console.log(
      "selectedExamCodes",
      JSON.stringify(selectedExamCodes, null, 2),
    );
    // -체크박스 미선택 후 버튼 클릭 시 (A2)미선택 오류 알럿
    if (!selectedExamCodes || selectedExamCodes.length === 0) {
      openAlert({
        content: "응시 코드를 선택해주세요.",
        isCancel: false,
        canClose: true,
        callBack: closeAlert,
      });
      return;
    }

    //응시코드 상태 유효성 검사
    //발급, 응시미완 이어야지만 응시가능
    const validStatuses = ["응시 미완", "발급"]; // 응시 가능 상태 목록
    const isAllValid = selectedExamCodes.every((exam: any) =>
      validStatuses.includes(exam.codeStatus),
    );
    // 응시 불가능한 상태 포함 시 경고 알럿
    if (!isAllValid) {
      openAlert({
        content: "응시코드 상태를 확인해주세요.",
        isCancel: false,
        canClose: true,
        callBack: closeAlert,
      });
      return;
    }

    // -버튼 클릭 시 (A1)응시 갯수 확인 알럿
    if (selectedExamCodes.length !== 0) {
      openAlert({
        content: `총 ${selectedExamCodes.length}개의 시험을 응시하시겠습니까?`,
        // 전역(recoil)에 응시코드 개수랑, 응시코드, 응시코드상태 저장하는
        callBack: () => {
          addExamCodes(selectedExamCodes);
          router.push("/group/exam-submission/enter-exam-info");
          closeAlert();
        },
        isCancel: true,
        canClose: true,
        btnLabel: "응시",
      });
      return;
    }
  };

  const handleGroupLeaderReview = () => {
    // 단체장 검수
    // 단체장 검수버튼 클릭 가능한 상태:  응시완료, 제출자 검수완료
    // 선택된 응시코드 상태 가져와서 응시코드 상태가 응시완료랑 제출자 검수완료이면 라우팅 아니면 알럿
    openAlert({
      content:
        "응시완료 및 제출자검수완료 상태에 한하여 단체장 검수 진행이 가능합니다",
      isCancel: false,
      canClose: true,
      callBack: closeAlert,
    });
  };

  const handleFinalSubmit = () => {
    console.log("최종제출");
  };

  const handleOpenExamCodeStatusModal = () => {
    openModal({
      title: "응시코드 상태",
      content: <CodeStatusModal />,
      isBtn: false,
      canClose: true,
    });
  };

  const formattedExamCodes = examCodesList?.map((exam: any) => ({
    ...exam,
    codeStatus: convertCodeStatusToKorean(exam.codeStatus), // 상태 한글 변환 적용
  }));

  return (
    <FormProvider {...methods}>
      <div className="flex w-[1400px] flex-col gap-4 overflow-y-auto">
        <PageTitle>단체 시험 응시</PageTitle>

        <ColTable
          name="selectedExamCodes"
          columns={[
            { header: "응시코드", name: ["registrationCode"] },
            {
              header: (
                <div className="flex items-center justify-center gap-3">
                  <span>상태</span>
                  <Icon
                    title="help-circle"
                    onClick={handleOpenExamCodeStatusModal}
                    size={20}
                  />
                </div>
              ),
              name: ["codeStatus"],
            },
          ]}
          items={formattedExamCodes}
          emptyMessage="데이터가 없습니다."
          isNumber={false}
          isCheckBox={true}
          checkboxId="id"
          checkWithFullData={true}
        />

        <div className="mt-10 flex justify-center gap-8">
          <Button
            label="응시"
            variant="primaryFill"
            size="md"
            onClick={handleExamTake}
          />
          <Button
            label="단체장 검수"
            variant="primaryFill"
            size="md"
            onClick={handleGroupLeaderReview}
          />
          <Button
            label="최종제출"
            variant="primaryFill"
            size="md"
            onClick={handleFinalSubmit}
          />
        </div>
      </div>
    </FormProvider>
  );
};

export default SelectExamCodeContainer;
// 응시코드 상태
// 발급 → GENERATED
// 응시완료 → COMPLETED
// 응시미완 → INCOMPLETE
// 제출자검수완료 →REVIEW_SUBMITTED
// 단체장검수완료 → GROUP_REVIEW_COMPLETED
// 최종제출완료 → TRANSMITTED
// 환불완료 → REFUND_COMPLETED
// 폐기 → DISCARDED
