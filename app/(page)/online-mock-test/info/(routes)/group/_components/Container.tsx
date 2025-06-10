// 단체응시 페이지
"use client";
import React, { useEffect, useState } from "react";
import Radio from "@/components/Commons/Form/Radio/Radio";
import Button from "@/components/Commons/Form/Button/Button";
import Input from "@/components/Commons/Form/Input/Input";
import { useAlert } from "@/libs/hooks/useAlert";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { applyInfoData } from "@/atoms/online-mock-test/atom";
import PageTitle from "@/components/Manual/PageTitle";
import { getAccessToken, setAccessToken } from "@/libs/utils/manageCookie";
import SearchUniversity from "@/app/(page)/online-mock-test/_components/SearchUniversity";
import SelectSubject from "@/app/(page)/online-mock-test/_components/SelectSubject";
import ApplyInfo from "@/app/(page)/online-mock-test/_components/ApplyInfo";
import { FormDataType } from "../../personal/_components/Container";
import { userInfoState } from "@/atoms/user/atom";

// [API] 응시정보제출
const fetchSubmissionExam = async (formData: FormDataType) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/fo-user/mock-exam-attempt/submission-exam`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    );
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const attemptId = data.data;
    setAccessToken("attemptId", attemptId);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const Container = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const methods = useForm({
    defaultValues: {
      국어: true,
      국어0: "SPEECH_WRITING",
      수학: true,
      수학0: "PROBABILITY_STATISTICS",
      영어: true,
      한국사: true,
      탐구: true,
      탐구0: "LIFE_ETHICS",
      탐구1: "ETHICS_IDEAS",
      firstChoiceUniversity: {
        universityName: "",
        universityCode: "",
        departmentName: "",
        departmentCode: "",
      },
      secondChoiceUniversity: {
        universityName: "",
        universityCode: "",
        departmentName: "",
        departmentCode: "",
      },
      track: "IN",
      gender: "",
    },
  });
  const { setValue } = methods;
  const { handleSubmit } = methods;
  const { openAlert, closeAlert } = useAlert();
  const [applyInfo, setApplyInfo] = useRecoilState(applyInfoData);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [selectedUniversity, setSelectedUniversity] = useState<string[]>([
    "",
    "",
  ]);
  const [mockExamName, setMockExamName] = useState("");
  const [grade, setGrade] = useState("");
  const [profile, setProfile] = useState({
    userName: "",
    birthday: "",
    phoneNumber: "",
    gender: "",
    memberNo: "",
  });

  const [examCode, setExamCode] = useState<string | null>(null);

  const { searchUniversity } = SearchUniversity({
    methods,
    setSelectedUniversity,
  });
  const router = useRouter();

  // 응시코드
  useEffect(() => {
    setExamCode(searchParams?.code);
  }, [searchParams]);

  //  hydration mismatch 방지 (모의고사이름, 모의고사학년, 샵바이유저정보)
  useEffect(() => {
    if (applyInfo) {
      setMockExamName(applyInfo.mockExamName);
      setGrade(applyInfo.grade);
    }
    if (userInfo) {
      setProfile({
        userName: userInfo.userName,
        birthday: userInfo.birthday,
        phoneNumber: userInfo.phoneNumber,
        gender: userInfo.gender,
        memberNo: userInfo.memberNo as string,
      });
      setValue("gender", userInfo.gender === "M" ? "MALE" : "FEMALE");
    }
  }, []);

  // 화면 새로고침시 지망대학 초기화
  useEffect(() => {
    setApplyInfo((prev) => ({
      ...prev,
      firstChoiceUniversity: {
        universityName: "",
        universityCode: "",
        departmentName: "",
        departmentCode: "",
      },
      secondChoiceUniversity: {
        universityName: "",
        universityCode: "",
        departmentName: "",
        departmentCode: "",
      },
    }));
  }, []);

  // 응시하기 Btn
  const onSubmit = (data: any) => {
    const subjects = ["국어", "수학", "영어", "한국사", "탐구"];
    const gradeMap: Record<string, string> = {
      "1": "FRESHMAN",
      "2": "SOPHOMORE",
      "3": "SENIOR",
    };
    const mockGrade = gradeMap[grade];
    const formData = {
      registrationCode: examCode as string,
      hakcd: "", // 단체코드 [추후 수정 필요]
      track: data.track,
      koreanSubject: data["국어"]
        ? grade === "3"
          ? data["국어0"]
          : "ATTEMPTED_COMMON"
        : null,
      koreanSubjectStatus: data["국어"] ? "ATTEMPTED" : "NOT_ATTEMPTED",
      mathSubject: data["수학"]
        ? grade === "3"
          ? data["수학0"]
          : "ATTEMPTED_COMMON"
        : null,
      mathSubjectStatus: data["수학"] ? "ATTEMPTED" : "NOT_ATTEMPTED",
      englishSubjectStatus: data["영어"] ? "ATTEMPTED" : "NOT_ATTEMPTED",
      koreanHistorySubjectStatus: data["한국사"]
        ? "ATTEMPTED"
        : "NOT_ATTEMPTED",
      subFirstSubject: data["탐구"]
        ? grade === "1"
          ? "COMMON_SCIENCE"
          : data["탐구0"]
        : null,
      subFirstSubjectStatus: data["탐구"] ? "ATTEMPTED" : "NOT_ATTEMPTED",
      subSecondSubject: data["탐구"]
        ? grade === "1"
          ? "COMMON_SOCIETY"
          : data["탐구1"]
        : null,
      subSecondSubjectStatus: data["탐구"] ? "ATTEMPTED" : "NOT_ATTEMPTED",
      firstUniversityCode:
        data.firstChoiceUniversity.universityCode &&
        data.firstChoiceUniversity.departmentCode
          ? data.firstChoiceUniversity.universityCode
          : "   ", // 대학코드와 학과코드 모두 존재하는지 체크 필요
      firstDepartmentCode: data.firstChoiceUniversity.departmentCode
        ? data.firstChoiceUniversity.departmentCode
        : "    ",
      secondUniversityCode:
        data.secondChoiceUniversity.universityCode &&
        data.secondChoiceUniversity.departmentCode
          ? data.secondChoiceUniversity.universityCode
          : "   ", // 대학코드와 학과코드 모두 존재하는지 체크 필요
      secondDepartmentCode: data.secondChoiceUniversity.departmentCode
        ? data.secondChoiceUniversity.departmentCode
        : "    ",
      answerMethod: data.answerMethod,
      mockExamName: mockExamName,
      grade: mockGrade,
      userName: profile.userName,
      birthday: profile.birthday.replace(
        /^(\d{0,4})(\d{0,2})(\d{0,2})$/g,
        "$1-$2-$3",
      ),
      phoneNumber: profile.phoneNumber,
      gender: data.gender,
      memberNo: String(profile.memberNo),
    };
    const requiredFields = [data.gender, data.track, data.answerMethod];

    if (
      subjects.some((subject) => data[subject] === undefined) ||
      requiredFields.some((field) => !field)
    ) {
      openAlert({
        content: <div>모든 정보를 입력해주세요.</div>,
        canClose: true,
        callBack: closeAlert,
      });
      return;
    }

    openAlert({
      content: (
        <div>
          응시정보 수정 및 답안입력 방식 다시 선택이 불가능하니 유의해주세요.
          해당정보로 응시를 진행하시겠습니까?
        </div>
      ),
      isCancel: true,
      canClose: true,
      callBack: async () => {
        const data = await fetchSubmissionExam(formData);
        // [추후 수정 필요]
        // if (data.message === "응시코드가 존재하지 않습니다.") {
        //   openAlert({
        //     content: <div>응시코드가 존재하지 않습니다.</div>,
        //     canClose: true,
        //     callBack: closeAlert,
        //   });
        //   return;
        // } else if (data.message === "이미 사용된 코드입니다.") {
        //   openAlert({
        //     content: <div>이미 사용된 코드입니다.</div>,
        //     canClose: true,
        //     callBack: closeAlert,
        //   });
        //   return;
        // }
        if (data.stats === 200) {
          // 응시정보 recoil 저장
          setApplyInfo((prev) => ({
            ...prev,
            registrationCode: formData.registrationCode,
            hakcd: formData.hakcd,
            track: formData.track,
            koreanSubject: formData.koreanSubject,
            mathSubject: formData.mathSubject,
            englishSubject: formData.englishSubjectStatus,
            koreanHistory: formData.koreanHistorySubjectStatus,
            subFirstSubject: formData.subFirstSubject,
            subSecondSubject: formData.subSecondSubject,
            answerMethod: formData.answerMethod,
            mockExamName: formData.mockExamName,
            grade: formData.grade,
            userName: formData.userName,
            birthday: formData.birthday,
            phoneNumber: formData.phoneNumber,
            gender: formData.gender,
            memberNo: formData.memberNo,
            firstChoiceUniversity: {
              universityName: formData.firstDepartmentCode
                ? prev.firstChoiceUniversity.universityName
                : "",
              universityCode: formData.firstUniversityCode,
              departmentName: formData.firstDepartmentCode
                ? prev.firstChoiceUniversity.departmentName
                : "",
              departmentCode: formData.firstDepartmentCode,
            },
            secondChoiceUniversity: {
              universityName: formData.secondDepartmentCode
                ? prev.secondChoiceUniversity.universityName
                : "",
              universityCode: formData.secondUniversityCode,
              departmentName: formData.secondDepartmentCode
                ? prev.secondChoiceUniversity.departmentName
                : "",
              departmentCode: formData.secondDepartmentCode,
            },
            // classNumber:"", // [추후 수정 필요]
            // studentNumber: "", // [추후 수정 필요]
          }));
          closeAlert();
          openAlert({
            content: <div>응시정보가 저장되었습니다. 페이지를 이동합니다.</div>,
            canClose: true,
            callBack: () => {
              closeAlert();
              router.push(
                formData.answerMethod === "INPUT_TEXT"
                  ? `/personal/manual`
                  : `/personal/omr`,
              );
            },
          });
        } else {
          closeAlert();
          openAlert({
            content: (
              <div>응시정보 저장에 실패하였습니다. 다시 시도해주세요.</div>
            ),
            canClose: true,
            callBack: closeAlert,
          });
        }
      },
    });
  };

  // 시험정보
  const testInfo = [
    {
      title: "시험명",
      value: mockExamName,
    },
    {
      title: "학년",
      value: `고${grade}`,
    },
  ];

  // 개인정보
  const personalData = [
    {
      title: "이름",
      value: profile ? profile.userName : "loading...",
    },
    {
      title: "생년월일",
      value: profile
        ? profile.birthday.replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1-$2-$3")
        : "loading...",
    },
    {
      title: "휴대폰 번호",
      value: profile
        ? profile.phoneNumber.replace(
            /^(\d{0,3})(\d{0,4})(\d{0,4})$/g,
            "$1-$2-$3",
          )
        : "loading...",
    },
    {
      title: "성별",
      value: (
        <Radio
          name="gender"
          items={[
            { label: "남자", value: "MALE" },
            { label: "여자", value: "FEMALE" },
          ]}
        />
      ),
    },
    {
      title: "반",
      value: (
        <div className="inline-flex items-center gap-2">
          <Input
            name="classNumber"
            type="text"
            placeholder="숫자 2자리 입력"
            rules={{
              pattern: {
                value: /^[0-9]{2}$/, // 숫자만 허용, 2자리
                message: "숫자 2자리만 입력 가능합니다.",
              },
            }}
            max={99} // 최대값 설정
            min={0} // 최소값 설정
          />
          <span className="text-[10px] text-gray-500">
            *자릿수에 맞추어 표기해주세요. (1반 → 01)
          </span>
        </div>
      ),
    },
    {
      title: "번호",
      value: (
        <div className="inline-flex items-center gap-2">
          <Input
            name="studentNumber"
            type="text"
            placeholder="숫자 4자리 입력"
            rules={{
              pattern: {
                value: /^[0-9]{4}$/, // 숫자만 허용, 최대 4자리
                message: "숫자 4자리만 입력 가능합니다.",
              },
            }}
            max={9999} // 최대값 설정
            min={0} // 최소값 설정
          />
          <span className="text-[10px] text-gray-500">
            *자릿수에 맞추어 표기해주세요. (1번 → 0001)
          </span>
        </div>
      ),
    },
  ];

  // 단체정보 (더미)
  const groupData = [
    {
      title: "단체명",
      value: "노량진 학원",
    },
    {
      title: "단체 관리자명",
      value: "홍길순",
    },
  ];

  // 응시정보
  const testData = [
    {
      title: "계열 선택",
      value: (
        <Radio
          name="track"
          items={[
            { label: "인문", value: "IN" },
            { label: "자연", value: "JA" },
          ]}
        />
      ),
    },
    {
      title: "응시영역",
      value: <SelectSubject grade={grade} />,
    },
    {
      title: <div>1지망 대학(학과) </div>,
      value: (
        <div className="inline-flex items-center gap-5">
          {selectedUniversity[0] ? (
            <>
              {selectedUniversity[0]}
              <Button
                label="수정"
                variant="defaultOutline"
                size="md"
                onClick={() => searchUniversity(1)}
              />
            </>
          ) : (
            <Button
              label="검색"
              variant="defaultOutline"
              size="md"
              onClick={() => searchUniversity(1)}
            />
          )}
        </div>
      ),
    },
    {
      title: "2지망 대학(학과)",
      value: (
        <div className="inline-flex items-center gap-5">
          {selectedUniversity[1] ? (
            <>
              {selectedUniversity[1]}
              <Button
                label="수정"
                variant="defaultOutline"
                size="md"
                onClick={() => searchUniversity(2)}
              />
            </>
          ) : (
            <Button
              label="검색"
              variant="defaultOutline"
              size="md"
              onClick={() => searchUniversity(2)}
            />
          )}
        </div>
      ),
    },
    {
      title: "답안입력 방식",
      value: (
        <Radio
          name="answerMethod"
          items={[
            { label: "답안 수기 입력", value: "INPUT_TEXT" },
            { label: "OMR 이미지 업로드", value: "INPUT_OMR" },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="flex w-[1400px] flex-col gap-4 overflow-x-auto">
      <FormProvider {...methods}>
        <PageTitle>온라인 응시 정보 입력</PageTitle>
        <section>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <ApplyInfo title="시험정보" data={testInfo} />
            <ApplyInfo title="개인정보" data={personalData} />
            <ApplyInfo title="응시정보" data={testData} />
            <ApplyInfo title="단체정보" data={groupData} />
            {/* <div className="noticeText">
              임시 저장된 답안은 24시간 동안만 유효합니다. 꼭 24시간 이내에
              제출을 완료해주세요.
            </div> */}
            <Button
              type="submit"
              variant="defaultOutline"
              size="md"
              label="응시하기"
            />
          </form>
        </section>
      </FormProvider>
    </div>
  );
};

export default Container;
