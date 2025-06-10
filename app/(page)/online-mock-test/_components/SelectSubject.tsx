"use client";
import React, { useEffect } from "react";
import { useFormContext, useWatch, Controller } from "react-hook-form";
import { CommonItems } from "@/types/interface/common";
import { useAlert } from "@/libs/hooks/useAlert";
import FormSelect from "@/components/Commons/Form/Select/Select";
import classNames from "classnames";
import { COURSE_LIST } from "../../personal/omr/_utils/utils2";

type Subject = "국어" | "수학" | "영어" | "한국사" | "탐구";
const subjects: Subject[] = ["국어", "수학", "영어", "한국사", "탐구"];

const koreanOption = [
  { label: "화법과작문", value: "SPEECH_WRITING" },
  { label: "언어와매체", value: "LANGUAGE_MEDIA" },
];
const mathOption = [
  { label: "확률과통계", value: "PROBABILITY_STATISTICS" },
  { label: "미적분", value: "CALCULUS" },
  { label: "기하", value: "GEOMETRY" },
];
const inquiryOption = [
  { label: "생활과윤리", value: "LIFE_ETHICS" },
  { label: "윤리와사상", value: "ETHICS_IDEAS" },
  { label: "한국지리", value: "KOREAN_GEOGRAPHY" },
  { label: "세계지리", value: "WORLD_GEOGRAPHY" },
  { label: "동아시아사", value: "EAST_ASIAN_HISTORY" },
  { label: "세계사", value: "WORLD_HISTORY" },
  { label: "경제", value: "ECONOMICS" },
  { label: "정치와법", value: "POLITICS_LAW" },
  { label: "사회·문화", value: "SOCIAL_CULTURE" },
  { label: "물리학I", value: "PHYSICS_I" },
  { label: "물리학II", value: "PHYSICS_II" },
  { label: "화학I", value: "CHEMISTRY_I" },
  { label: "화학II", value: "CHEMISTRY_II" },
  { label: "생명과학I", value: "BIOLOGY_I" },
  { label: "생명과학II", value: "BIOLOGY_II" },
  { label: "지구과학I", value: "EARTH_SCIENCE_I" },
  { label: "지구과학II", value: "EARTH_SCIENCE_II" },
];

// 3학년 선택과목
const baseOptions: Record<Subject, CommonItems[]> = {
  국어: koreanOption,
  수학: mathOption,
  탐구: inquiryOption,
  영어: [],
  한국사: [],
};
// 2학년 선택과목
const secondGradeOptions: Record<Subject, CommonItems[]> = {
  ...baseOptions,
  국어: [],
  수학: [],
};
// 1학년 선택과목
const firstGradeOptions: Record<Subject, CommonItems[]> = {
  ...secondGradeOptions,
  탐구: [],
};

type Props = {
  grade?: string;
};

const SelectSubject = ({ grade }: Props) => {
  const { openAlert, closeAlert } = useAlert();
  const { control, setValue } = useFormContext(); // 폼의 control : 복잡한 정보 저장에 사용
  const examStatus = useWatch({ control }); //  폼의 실시간 상태를 관찰
  const subjectOptions =
    grade === "3"
      ? baseOptions
      : grade === "2"
        ? secondGradeOptions
        : firstGradeOptions;
  const renderRadioButtons = (subject: Subject, field: any) => (
    <>
      {/* 응시 */}
      <input
        type="radio"
        name={subject}
        value="yes"
        checked={field.value === true}
        onChange={() => field.onChange(true)}
        className={classNames(SizeCommonConfig, HiddenInputConfig)}
      />
      <label
        htmlFor={subject}
        className={classNames(
          SizeCommonConfig,
          TriggerCommonConfig,
          "cursor-pointer hover:bg-[url('/icons/icon_radio-hover.svg')]",
        )}
        onClick={() => field.onChange(true)}
      ></label>
      <label htmlFor={subject} className={classNames("cursor-pointer")}>
        응시
      </label>

      {/* 미응시 */}
      <input
        type="radio"
        name={subject}
        value="no"
        checked={field.value === false}
        onChange={() => field.onChange(false)}
        className={classNames(
          SizeCommonConfig,
          HiddenInputConfig,
          "cursor-pointer hover:bg-[url('/icons/icon_radio-hover.svg')]",
        )}
      />
      <label
        htmlFor={subject}
        className={classNames(
          SizeCommonConfig,
          TriggerCommonConfig,
          "cursor-pointer hover:bg-[url('/icons/icon_radio-hover.svg')]",
        )}
        onClick={() => field.onChange(false)}
      ></label>
      <label htmlFor={subject} className={classNames("cursor-pointer")}>
        미응시
      </label>
    </>
  );

  // 탐구과목 옵션 중복 선택 방지
  useEffect(() => {
    if (
      examStatus["탐구0"] &&
      examStatus["탐구1"] &&
      examStatus["탐구0"] === examStatus["탐구1"]
    ) {
      openAlert({
        content: "동일한 과목을 선택할 수 없습니다.",
        canClose: true,
        callBack: closeAlert,
      });
      setValue("탐구1", "");
    }
  }, [examStatus, openAlert, closeAlert, setValue]);

  return (
    <>
      {subjects.map((subject) => (
        <div key={subject}>
          <h3 className="font-semibold">{subject}</h3>
          <div key={subject} className={classNames(ContainerCommonConfig)}>
            <Controller
              control={control}
              name={subject}
              render={({ field }) => renderRadioButtons(subject, field)}
            />
          </div>
          {examStatus[subject] && subjectOptions[subject].length > 0 && (
            <>
              {subject !== "탐구" ? (
                <>
                  <FormSelect
                    name={`${subject}0`}
                    defaultLabel="선택"
                    items={baseOptions[subject]}
                    rules={{ required: "응시과목을 선택하세요" }}
                  />
                </>
              ) : (
                <>
                  <FormSelect
                    name={`${subject}0`}
                    defaultLabel="선택"
                    items={COURSE_LIST.inquiry}
                    rules={{ required: "응시과목을 선택하세요" }}
                  />
                  <FormSelect
                    name={`${subject}1`}
                    defaultLabel="선택"
                    items={COURSE_LIST.inquiry}
                    rules={{ required: "응시과목을 선택하세요" }}
                  />
                </>
              )}
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default SelectSubject;

const ContainerCommonConfig = "flex items-center gap-2";

const HiddenInputConfig =
  "hidden [&:checked+label]:bg-[url('/icons/icon_radio-focus.svg')]";

const SizeCommonConfig = "w-[16px] h-[16px]";

const TriggerCommonConfig = " bg-[url('/icons/icon_radio-default.svg')]";
