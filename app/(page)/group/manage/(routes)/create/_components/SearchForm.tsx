"use client";
import Button from "@/components/Commons/Form/Button/Button";
import Input from "@/components/Commons/Form/Input/Input";
import FormSelect from "@/components/Commons/Form/Select/Select";
import TextArea from "@/components/Commons/Form/TextArea/TextArea";
import { useAlert } from "@/libs/hooks/useAlert";
import { http } from "@/libs/http/http.interceptors.request";
import { createGroup } from "@/libs/utils/apis/api";
import { getSelectOption } from "@/libs/utils/getSelectOption";
import { REGION_LIST } from "@/libs/utils/region";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const SearchForm = () => {
  const router = useRouter();
  const { openAlert, closeAlert } = useAlert();
  const methods = useFormContext();
  const { formState, handleSubmit, trigger, getValues } = methods;
  // 중복 확인 여부 상태 관리
  const [isDuplicated, setIsDuplicated] = useState(false);

  const regionOptions = getSelectOption({
    ...REGION_LIST,
    기타학원: "기타학원",
  });

  // // errors가 변경될 때 alert 표시
  // useEffect(() => {
  //   if (Object.keys(formState.errors).length > 0) {
  //     openAlert({
  //       content: "필수항목을 입력해주세요.",
  //       canClose: true,
  //       callBack: closeAlert,
  //     });
  //   }
  // }, [formState.errors]);

  // 필수항목 누락체크
  const isRequired = (name: string) => {
    return formState.errors[name]?.type === "required";
  };

  // 버튼 클릭 시 유효성 검사 실행
  // 필수항목 누락체크 (수동 유효성 검사 실행)
  // 처음에 버튼을 눌렀을때 유효성 검사가 안되는 현상이 있었는데
  // formState.errors가 비동기적으로 어데이트 되기때문에 최신상태 반영이 안됨.
  // trigger를 사용하여 강제로 유효성 검사를 실행하여 최신상태 반영
  const handleCheckRequired = async () => {
    console.log(getValues());
    console.log(formState);

    const isValid = await trigger();
    // await trigger(); // 강제로 유효성 검사 실행
    console.log(isValid);
    // if (isRequired("groupName") || isRequired("region")) {
    if (!isValid) {
      openAlert({
        content: "필수항목을 입력해주세요.",
        canClose: true,
        callBack: closeAlert,
      });
      return;
    }

    // onSubmit(getValues());
  };

  // 단체명 중복 검사
  const handleCheckDuplicate = () => {
    const { groupName, region } = methods.getValues();
    if (!groupName || !region) {
      openAlert({
        content: "지역과 단체명을 입력 후 중복검사를 해주세요.",
        canClose: true,
        callBack: closeAlert,
      });
      return;
    }
    // 중복 검사 API 호출
    console.log("중복 검사 실행");
    setIsDuplicated(true); // 여기선 예시로 true 처리
  };

  const onSubmit1 = async () => {
    const data = getValues();

    const newData = {
      groupCode: Math.floor(10000 + Math.random() * 90000),
      ...data,
      status: false,
      count: 1,
    };

    openAlert({
      content: "단체 생성을 신청하시겠습니까?",
      canClose: true,
      isCancel: true,
      callBack: async () => {
        closeAlert();
        const response = await createGroup(newData);
        if (response.status === 200 || response.status === 201) {
          router.push("/group/manage/success");
        } else {
          openAlert({
            content: "단체 생성 실패, 다시 시도해주세요.",
            canClose: true,
            callBack: closeAlert,
          });
        }
      },
    });
  };

  // 폼 제출 처리
  const onSubmit = async (data: any) => {
    if (!isDuplicated) {
      openAlert({
        content: "단체명 중복검사를 먼저 진행해주세요.",
        canClose: true,
        callBack: closeAlert,
      });
      return;
    }

    // 임시 데이터
    const newData = {
      groupCode: Math.floor(10000 + Math.random() * 90000),
      ...data,
      status: false,
      count: 1,
    };

    openAlert({
      content: "단체 생성을 신청하시겠습니까?",
      canClose: true,
      isCancel: true,
      callBack: async () => {
        closeAlert();
        const response = await createGroup(newData);
        if (response.status === 200 || response.status === 201) {
          router.push("/group/manage/success");
        } else {
          openAlert({
            content: "단체 생성 실패, 다시 시도해주세요.",
            canClose: true,
          });
        }
      },
    });
  };

  const onInvalid = (errors: any) => {
    console.log("누락된 항목", errors);
    openAlert({
      content: "필수항목을 입력해주세요.",
      callBack: closeAlert,
      canClose: true,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <section className="flex w-fit flex-col gap-4 rounded-md border border-[var(--border-lightgray)] p-4 pr-10">
          <div className="flex items-center gap-4">
            <label
              className="text-md required-label w-24 font-bold"
              htmlFor="region"
            >
              지역
            </label>
            <FormSelect
              name="region"
              items={regionOptions}
              rules={{ required: true }}
              defaultLabel="선택"
            />
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-[40px] items-center gap-2">
              <label
                className="text-md required-label w-24 font-bold"
                htmlFor="groupName"
              >
                단체명
              </label>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Input
                  name="groupName"
                  max={10}
                  rules={{ required: true, maxLength: { value: 20 } }}
                />
                <Button
                  variant="defaultOutline"
                  label="중복검사"
                  size="md"
                  onClick={handleCheckDuplicate}
                />
              </div>
              <span className="text-red-500">
                동일 지역 내 동일 단체명이 존재합니다.
              </span>
              <span className="text-green-500">사용 가능한 단체명입니다.</span>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-[40px] items-center gap-2">
              <label className="text-md w-24 font-bold" htmlFor="image">
                사업자등록증
              </label>
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="defaultBlack" label="첨부" size="md" />
              <span>
                <small>
                  * 사업자등록증을 첨부하지 않고 신청한 단체의 단체코드의
                  유효기간은
                  <br /> 당해년도로 제한됩니다.(추후 첨부 시 갱신 가능)
                </small>
              </span>
            </div>
          </div>
        </section>
        <div className="mt-20 flex justify-center">
          <span>
            <small>*항목은 필수입력 항목입니다.</small>
          </span>
        </div>
        <div className="mt-10 flex justify-center">
          <Button
            label="신청"
            variant="primaryFill"
            size="sm"
            type="submit"
            // onClick={handleCheckRequired}
          />
        </div>
      </form>
    </>
  );
};

export default SearchForm;
