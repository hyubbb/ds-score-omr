"use client";

import React, { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { omrListDataState } from "@/atoms/manual/atom";
import { userAttemptIdState, userInfoState } from "@/atoms/user/atom";
import { omrAnswerState } from "@/atoms/omr/atom";
import { SUBMISSION_TYPE } from "@/libs/utils/subjectChange";
import { COURSE_LIST_EN } from "@/app/(page)/personal/omr/_utils/utils2";
import Spinner from "@/components/Commons/Spinner/Spinner";
import OmrHeader from "./Omr/OmrHeader";
import OmrContent from "./Omr/OmrContent";
import OmrFooter from "./Omr/OmrFooter";
import { useOmrForm } from "./hooks/useOmrForm";
import { setRecoil } from "recoil-nexus";
import { errorState } from "@/atoms/atom";

const Container = ({ subjectIndex }: { subjectIndex: number }) => {
  const [omrDataState, setOmrDataState] = useRecoilState(omrListDataState);
  const [omrData, setOmrData] = useState(omrDataState);
  const [isLoading, setIsLoading] = useState(true);
  const userAttemptId = useRecoilValue(userAttemptIdState);
  const userManualData = useRecoilValue(omrAnswerState);
  const userInfo = useRecoilValue(userInfoState);

  const {
    methods,
    watch,
    getValues,
    setValue,
    validateForm,
    updateNameValues,
    updateInquiryAnswers,
    handleSubmit,
  } = useOmrForm({
    omrData,
    subjectIndex,
    userAttemptId,
    userManualData,
  });

  const currentSubject = watch("subjectEn");
  const isCourseSection = ["korean", "math"].includes(currentSubject);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (currentSubject !== "inquiry") {
      const submission = userInfo[SUBMISSION_TYPE[currentSubject]];
      submission && setValue("course", submission);
    } else {
      const [submission1, submission2] = [
        userInfo.subFirstSubject,
        userInfo.subSecondSubject,
      ];
      setValue(
        "course1",
        COURSE_LIST_EN.inquiry.find((item) => item.label === submission1)
          ?.value + "",
      );
      setValue(
        "course2",
        COURSE_LIST_EN.inquiry.find((item) => item.label === submission2)
          ?.value + "",
      );
    }
  }, [currentSubject, userInfo, setValue]);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    if (!validateForm()) return;

    setValue("status", "true");
    updateNameValues();

    if (currentSubject === "inquiry") {
      updateInquiryAnswers();
    }

    handleSubmit(e);
  };

  useEffect(() => {
    if (!getValues("answers")?.length) {
      console.log("데이터 없다");
      setRecoil(errorState, {
        isError: true,
        message: "데이터가 없습니다. 다시 접속 해주세요.",
        type: "home",
      });
    }
  }, [getValues, setRecoil]);

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <FormProvider {...methods}>
        <OmrHeader subjectIndex={subjectIndex} />
        <form>
          <OmrContent
            currentSubject={currentSubject}
            isCourseSection={isCourseSection}
          />
        </form>
      </FormProvider>
      <OmrFooter onSave={handleSave} />
    </div>
  );
};

export default Container;
