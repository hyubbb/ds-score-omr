"use client";

import PageTitle from "@/components/Manual/PageTitle";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Birth from "../../../../../_components/Birth/Birth";
import Name from "../../../../../_components/Name/Name";
import Course from "../../../../../_components/Course/Course";
import { useRecoilState } from "recoil";
import { omrListDataState } from "@/atoms/manual/atom";
import Gender from "@/app/(page)/personal/omr/_components/Gender/Gender";
import KoreanComponent from "./Korean/KoreanComponent";
import MathComponent from "./Math/MathComponent";
import HistoryComponent from "./History/HistoryComponent";
import InquiryComponent from "./Inquiry/InquiryComponent";
import Button from "@/components/Commons/Form/Button/Button";
import { useAlert } from "@/libs/hooks/useAlert";
import { useRouter } from "next/navigation";
import { SUBJECT_KR } from "@/app/(page)/personal/omr/_utils/utils";
import Spinner from "@/components/Commons/Spinner/Spinner";
import EnglishComponent from "./English/EnglishComponent";
import ExamCode from "@/app/(page)/personal/omr/_components/ExamCode/ExamCode";
import { OMR_COLORS } from "../_utils/utils";

const Container = ({ subjectIndex }: { subjectIndex: number }) => {
  const router = useRouter();
  const [omrDataState, setOmrDataState] = useRecoilState(omrListDataState);
  const [omrData, setOmrData] = useState(omrDataState);
  const [isLoading, setIsLoading] = useState(true);
  const { openAlert, closeAlert } = useAlert();
  const methods = useForm({
    defaultValues:
      omrData.find((item) => +item.subjectCode === subjectIndex) || {},
    mode: "onChange",
  });
  const { watch, setValue, getValues } = methods;
  const isCourseSection =
    watch("subjectEn") == "korean" || watch("subjectEn") == "math";
  const isGenderSection = watch("subjectEn") == "english";
  const OMRColor = OMR_COLORS[watch("subjectEn") as keyof typeof OMR_COLORS];

  useEffect(() => {
    setIsLoading(false);
  }, []);

  // 국어, 수학 만 선택과목 섹션존재
  // 성별은 영어만 존재
  // 지망대학은 영어만 존재
  const renderComponent = () => {
    switch (watch("subjectEn")) {
      case "korean":
        return <KoreanComponent />;
      case "english":
        return <EnglishComponent />;
      case "math":
        return <MathComponent />;
      case "history":
        return <HistoryComponent />;
      case "inquiry":
        return <InquiryComponent />;
      default:
        return <div>과목을 찾을 수 없습니다.</div>;
    }
  };

  const handleSave = () => {
    const isQuestionEmpty = getValues("questions")
      .flat()
      .some((item: any) => item === " ");

    const isKoreanEmpty = getValues("koreanName")?.some(
      (item: any, index: number) => item == "" && index < 2,
    );
    const isNameEmpty = Object.values(getValues("name") || {})?.some(
      (item: any, index: number) => item.length == 0 && index < 2,
    );

    const isGenderEmpty = !getValues("gender");
    const isCourseEmpty = !getValues("course");

    if (isQuestionEmpty) {
      openAlert({
        content: "입력되지 않은 정답이 있습니다.",
        canClose: true,
        callBack: () => {
          closeAlert();
        },
      });
      return;
    }

    // 이거 수험번호나 생년월일 젤앞자리 0부터 시작해서 이거 문제있다. 이 문제를 해결할려면? 이건 신경안써야겠다.
    // 입력안된 부분만 신경쓰기로

    // 수험번호에 숫자가 없는경우 검증
    const isExamCodeEmpty = getValues("examCode").some(
      (item: any) => item === "",
    );

    // 생년월일에 숫자가 없는경우 검증
    const isBirthEmpty = getValues("birth").some((item: any) => item === "");

    // 생년월일도 월 일 나눠서 0보다 큰지 검증해야됨, 년은 00일경우가 존재하기 때문에.
    // 이것도 입력안된 부분만 신경쓰기로

    // 수동입력이 가능한 이름 검증
    if (isExamCodeEmpty || isBirthEmpty || isKoreanEmpty || isNameEmpty) {
      openAlert({
        content: "입력되지 않은 항목이 존재합니다.",
        canClose: true,
        callBack: () => {
          closeAlert();
        },
      });
      return;
    }

    // 둘 중에 하나만 있는 경우는 있지만 둘다 존재 하는경우는 한국사 말곤없다.
    // 둘의 상태가 같은 경우( 둘 다 값이 없는경우 )를 검증
    if (watch("subjectEn") !== "history" && isGenderEmpty == isCourseEmpty) {
      openAlert({
        content: "선택되지 않은 항목이 있습니다.",
        canClose: true,
        callBack: () => {
          closeAlert();
        },
      });
      return;
    }

    const koreanName = getValues("koreanName");
    const nameValue = getValues("name");

    // 답안입력 현황 상태 변경
    setValue("status", "true");

    // omrInput에 자음이 없는 경우 & omr체크를 자음없이 모음 받침만 입력했을때
    // 저장시에 해당 위치의 name을 null처리해야됨
    koreanName.forEach((item, index) => {
      if (item == "") {
        setValue(`name.${index}`, [null, null, null] as any);
      }

      if (nameValue?.[index]?.length == 0) {
        setValue(`koreanName.${index}`, "");
      }
    });

    setOmrDataState((prev) => {
      const newData = prev.map((item) =>
        item.subjectCode == subjectIndex + ""
          ? JSON.parse(JSON.stringify(getValues())) // 깊은 복사 적용
          : item,
      );
      return newData;
    });

    // router.push(`/personal/omr/list`);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="flex w-[1400px] flex-col gap-4 overflow-x-auto">
      <FormProvider {...methods}>
        <PageTitle>{SUBJECT_KR[subjectIndex]} 답안 OMR</PageTitle>
        <div className="flex justify-start gap-4">
          <Button
            type="button"
            label="뒤로가기"
            variant="defaultBlack"
            size="sm"
            onClick={() => router.back()}
          />
          <Button
            type="button"
            label="저장"
            variant="primaryFill"
            size="sm"
            onClick={handleSave}
          />
        </div>
        <form>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <ExamCode />
                <Birth />
              </div>
              <Name color={OMRColor} />
            </div>
            <div>
              {isCourseSection && <Course />}
              {isGenderSection && <Gender />}
            </div>
            {renderComponent()}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Container;
