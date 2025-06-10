"use client";
import React, { useState, useRef } from "react";
import { RowTable } from "./_components/RowTable";
import { FormProvider, useForm } from "react-hook-form";
import { useAlert } from "@/libs/hooks/useAlert";
import { useRouter } from "next/navigation";
import Input from "@/components/Commons/Form/Input/Input";
import Button from "@/components/Commons/Form/Button/Button";
import PageTitle from "@/components/Manual/PageTitle";

const Page = () => {
  const methods = useForm();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { openAlert, closeAlert } = useAlert();
  const [searchData, setSearchData] = useState({
    groupName: "",
    groupCode: "",
  });

  // 단체검색 Btn
  const handleSearchGroup = async () => {
    const isValid = await methods.trigger(["groupName", "groupCode"]); // 필드 유효성 검사 실행
    if (!isValid) return; // 유효성 검사 실패 시 검색 중단

    const getSearchValue = methods.getValues();
    if (!getSearchValue.groupName || !getSearchValue.groupCode) {
      openAlert({
        content: "검색할 단체의 정보를 모두 입력해주세요.",
        canClose: true,
        callBack: closeAlert,
      });
      return;
    } else {
      // 1. 존재하지 않는 단체라면
      //  openAlert({
      //   content: "일치하는 단체 정보가 없습니다.",
      //   canClose: true,
      //   callBack: closeAlert,
      // });
      // return;

      // 2. 존재하는 단체라면
      setSearchData({
        groupName: getSearchValue.groupName,
        groupCode: getSearchValue.groupCode,
      });
    }
  };

  // 사업자등록증 첨부 <Button/>
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // 사업자등록증 첨부 <Input/>
  const handleBusinessFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/gif",
    ];
    if (!file) return;
    if (!allowedTypes.includes(file.type)) {
      openAlert({
        content: "사업자등록증 첨부에 실패했습니다.",
        canClose: true,
        callBack: closeAlert,
      });
      return;
    }

    // if(file){
    //   사업자등록증 저장하는 로직 추가 예정
    // }
    router.push("/offline-groups/upload-success");
  };

  const data = [
    {
      title: "단체명",
      value: (
        <Input
          name="groupName"
          type="text"
          rules={{
            pattern: {
              value:
                /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~ㄱ-ㅎ가-힣]{1,20}$/,
              message:
                "국문, 영문, 숫자, 특수문자를 포함하여 20자 까지만 입력 가능합니다.",
            },
          }}
        />
      ),
    },
    {
      title: "단체코드",
      value: (
        <Input
          name="groupCode"
          rules={{
            pattern: {
              value: /^[0-9]{6}$/,
              message: "숫자 6자리를 입력해주세요.", // 무조건 6자리여야만 함 (1자리 안됌, 7자리ㅇ;)
            },
          }}
        />
      ),
    },
  ];

  // 검색결과
  const resultData = [
    { title: "단체명", value: searchData.groupName },
    { title: "단체코드", value: searchData.groupCode },
    {
      title: "사업자등록증",
      value: (
        <>
          <Button
            label="첨부"
            variant="defaultOutline"
            size="sm"
            className="w-48"
            onClick={handleButtonClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleBusinessFileUpload}
          />
        </>
      ),
    },
  ];

  return (
    <div className="flex w-[1400px] flex-col gap-4 overflow-x-auto">
      <PageTitle>기존 단체 관리</PageTitle>
      <div>
        <p>
          기존 오프라인 특약점을 통해 단체코드를 발급받은 단체를 위한
          페이지입니다.
        </p>
        <p>
          단체명 및 단체코드를 통해 기존 단체 검색 후 사업자 등록증을 제출하여
          주시면 관리자 확인 이후 단체장 권한이 부여됩니다.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <FormProvider {...methods}>
          <section>
            <RowTable data={data} />
          </section>
          <Button
            label="검색"
            variant="defaultOutline"
            size="md"
            className="w-48"
            onClick={() => handleSearchGroup()}
          />
          {searchData.groupName && (
            <section>
              <RowTable data={resultData} />
            </section>
          )}
        </FormProvider>
      </div>
    </div>
  );
};

export default Page;
