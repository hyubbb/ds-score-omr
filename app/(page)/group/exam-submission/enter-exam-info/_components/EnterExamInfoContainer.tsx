"use client";

import Button from "@/components/Commons/Form/Button/Button";
import Input from "@/components/Commons/Form/Input/Input";
import Radio from "@/components/Commons/Form/Radio/Radio";
import { RowTable } from "@/components/Commons/Table/RowTable";
import PageTitle from "@/components/Commons/Title/PageTitle";
import React from "react";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { examCodeState, groupDetailState } from "@/atoms/group/atom";
import { useAlert } from "@/libs/hooks/useAlert";
import { useRouter } from "next/navigation";
import ExcelUploadSection from "./ExcelUploadSection";
import { getAccessToken } from "@/libs/utils/manageCookie";

const answerMethodOptions = [
  { label: "직접입력", value: "INPUT_TEXT" },
  { label: "OMR 이미지 업로드", value: "INPUT_OMR" },
  { label: "Excel 업로드", value: "INPUT_EXCEL" },
];

// 할 작업 ⭐️
// 1. 응시자 정보 입력 (수기용) API 요청
// 2. 응시자 정보 입력 엑셀, omr API 요청을 위한 전역관리 (리코일)

const EnterExamInfoContainer = () => {
  // (전역값)응시코드 개수에 따라 응시자 폼 렌더링,
  // 응시코드 임의로 매칭
  const { count, codes } = useRecoilValue(examCodeState);

  const methods = useForm({
    defaultValues: {
      mockExamName: "",
      grade: "",
      answerMethod: "",
      participants: Array.from({ length: count }, (_, index) => ({
        registrationCode: codes[index]?.registrationCode || "", // codes 배열에서 examCode를 가져옴
        userName: "",
        phoneNumber: "",
        classNumber: "",
        className: "",
      })),
    },
    mode: "onBlur",
  });

  const { control, handleSubmit, watch } = methods;
  const { fields, update } = useFieldArray({
    control,
    name: "participants",
  });
  const { openAlert, closeAlert } = useAlert();
  const router = useRouter();

  const groupDetail = useRecoilValue(groupDetailState);

  // console.log("groupDetail", JSON.stringify(groupDetail, null, 2));
  // groupDetail {
  //   "mrgCd": "32132",
  //   "mockExamId": 7,
  //   "mockExamName": "더프 4월 모의고사",
  //   "grade": "1"
  // }

  const onSubmit = (data: any) => {
    // ✅ 1. 유효성 검사: 답안 입력 방식 선택 여부 확인
    if (!data.answerMethod) {
      openAlert({
        content: "답안 입력 방식을 선택해주세요.",
        isCancel: false,
        canClose: true,
        callBack: closeAlert,
      });
      return;
    }

    // ✅ 2. 유효성 검사: 모든 입력 필드가 채워졌는지 확인
    const isAllFilled = data.participants.every(
      (p: any) => p.userName && p.phoneNumber && p.class && p.studentNumber,
    );

    if (!isAllFilled) {
      openAlert({
        content: "모든 응시자의 정보를 입력해주세요.",
        isCancel: false,
        canClose: true,
        callBack: closeAlert,
      });
      return;
    }

    // ✅ 3. 중복 검사: 반(class) + 번호(studentNumber)가 중복되었는지 확인
    const uniqueEntries = new Set(
      data.participants.map((p: any) => `${p.class}-${p.studentNumber}`),
    );

    if (uniqueEntries.size !== data.participants.length) {
      openAlert({
        content: "동일한 반과 번호를 가진 응시자가 있습니다. 확인해주세요.",
        isCancel: false,
        canClose: true,
        callBack: closeAlert,
      });
      return;
    }

    // const memberNo = getAccessToken("memberNo");
    const memberNo = "99587215"; // 임시로 넣어둠

    // ✅ 4. 데이터 변환
    const formattedData = data.participants.map(
      (participant: any, index: number) => ({
        registrationCode: codes[index]?.registrationCode || "", // 응시코드 (Recoil에서 가져옴)
        mrgCd: groupDetail.mrgCd, // 단체코드 (Recoil에서 가져옴)
        grade:
          groupDetail.grade === "1"
            ? "FRESHMAN"
            : groupDetail.grade === "2"
              ? "SOPHOMORE"
              : "SENIOR", // 학년 변환
        answerMethod: data.answerMethod, // 답변 입력 방식
        userName: participant.userName, // 응시자 이름
        phoneNumber: participant.phoneNumber, // 전화번호
        classNumber: participant.classNumber, // 반
        className: participant.className, // 번호
        memberNo: memberNo, // 단체장 아이디 (쿠키에서 가져옴)
      }),
    );

    // ✅ 5. 전송 데이터 확인
    console.log("전송 데이터:", JSON.stringify(formattedData, null, 2));

    // ✅ 6. 답안 입력 방식에 따라 라우팅
    // if (data.answerMethod === "INPUT_TEXT") {
    //   router.push("");
    // } else if (data.answerMethod === "INPUT_OMR") {
    //   router.push("");
    // } else if (data.answerMethod === "INPUT_EXCEL") {
    //   router.push("/group/exam-submission/excel-answer-upload");
    // }

    // TODO: 백엔드 api 연동 (수기만 이때 보낸다고 한듯)
    // 엑셀 omr은 전역관리 해야될 듯 ----리코일에 저장 하고 업로드 페이지로 넘어가기

    // console.log("데이터:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-[1400px] flex-col gap-4 overflow-y-auto">
          <PageTitle>단체 시험 응시 정보 입력</PageTitle>
          <p className="mt-[30px] text-xl font-semibold">시험정보</p>
          {/* 현재 치는 시험정보 recoil에서 값 가져오기  */}
          <RowTable
            data={[
              {
                title: "시험명",
                value: groupDetail.mockExamName || "시험명을 불러오는 중...",
              },
              {
                title: "학년",
                value: groupDetail.grade || "학년을 불러오는 중...",
              },
              {
                title: "답안입력 방식",
                value: (
                  <Radio name="answerMethod" items={answerMethodOptions} />
                ),
              },
            ]}
            isLoading={false}
          />

          <ExcelUploadSection count={count} setValue={methods.setValue} />
          <p className="mt-[30px] text-xl font-semibold">응시자 정보</p>
          {fields.map((field, index) => (
            <RowTable
              key={field.id}
              data={[
                {
                  title: "이름",
                  value: (
                    <Input
                      name={`participants[${index}].userName`}
                      placeholder="이름을 입력하세요"
                      rules={{
                        maxLength: {
                          value: 4,
                          message: "이름은 최대 4자까지 입력 가능합니다.",
                        },
                        pattern: {
                          value: /^[가-힣]{1,5}$/,
                          message: "이름은 한글로만 입력 가능합니다.",
                        },
                      }}
                    />
                  ),
                },

                {
                  title: "휴대폰 번호",
                  value: (
                    <Input
                      name={`participants[${index}].phoneNumber`}
                      placeholder="ex) 01012345678"
                      rules={{
                        maxLength: {
                          value: 12,
                          message:
                            "휴대폰 번호는 최대 8자까지 입력 가능합니다.",
                        },
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "숫자만 입력 가능합니다.",
                        },
                      }}
                    />
                  ),
                },
                {
                  title: "반",
                  value: (
                    <Input
                      name={`participants[${index}].classNumber`}
                      placeholder="ex) 2"
                      rules={{
                        maxLength: {
                          value: 2,
                          message: "반는 최대 2자까지 입력 가능합니다.",
                        },
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "숫자만 입력 가능합니다.",
                        },
                      }}
                    />
                  ),
                },
                {
                  title: "번호",
                  value: (
                    <Input
                      name={`participants[${index}].className`}
                      placeholder="ex) 4"
                      rules={{
                        maxLength: {
                          value: 4,
                          message: "번호는 최대 4자까지 입력 가능합니다.",
                        },
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "숫자만 입력 가능합니다.",
                        },
                      }}
                    />
                  ),
                },
              ]}
              isLoading={false}
            />
          ))}
          <div className="flex justify-center">
            <Button
              type="submit"
              label="응시하기"
              variant="primaryFill"
              size="md"
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default EnterExamInfoContainer;

// 응시자 정보 입력 (수기용) API 요청
// {{root-path}}/api/v1/fo-user/mock-exam-attempt/submission-exam/list
// application/json
// [
//   {
//     registrationCode: "466B642452", // 응시코드  --> 리코일에서 가져오기

//     mrgCd: "32132", // 단체코드  --> 리코일에서 가져오기
//     grade: "SENIOR", // 학년    --> 리코일에서 가져오기  FRESHMAN: 1, SOPHOMORE: 2학년, SENIOR: 3학년

//     answerMethod: "INPUT_TEXT", // 답변 입력 방식
//     userName: "홍길동", // 응시자 이름
//     phoneNumber: "01012341234", // 전화번호
//     classNumber: "01", // 반
//     className: "0001", // 번호

//     memberNo: "99587215", // 단체장 아이디 (로그인한 사람) --> 쿠키에서 가져오기
//   },
//   {
//     registrationCode: "466B642452", // 응시코드  --> 리코일에서 가져오기

//     mrgCd: "32132", // 단체코드  --> 리코일에서 가져오기
//     grade: "SENIOR", // 학년    --> 리코일에서 가져오기  FRESHMAN: 1, SOPHOMORE: 2학년, SENIOR: 3학년

//     answerMethod: "INPUT_TEXT", // 답변 입력 방식
//     userName: "홍길동", // 응시자 이름
//     phoneNumber: "01012341234", // 전화번호
//     classNumber: "01", // 반
//     className: "0001", // 번호

//     memberNo: "99587215", // 단체장 아이디 (로그인한 사람) --> 쿠키에서 가져오기
//   },
// ];
