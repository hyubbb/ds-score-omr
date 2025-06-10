"use client";
import React, { useEffect, useState } from "react";
import ColTable from "./_components/Coltable";
import Button from "@/components/Commons/Form/Button/Button";
import Input from "@/components/Commons/Form/Input/Input";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAlert } from "@/libs/hooks/useAlert";
import { useModal } from "@/libs/hooks/useModal";
import { useRecoilState } from "recoil";
import { applyInfoData } from "@/atoms/online-mock-test/atom";
import PageTitle from "@/components/Manual/PageTitle";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "@/libs/utils/manageCookie";
import { userInfoState } from "@/atoms/user/atom";
import { setRecoil } from "recoil-nexus";
import { errorState } from "@/atoms/atom";

const memberNo = getAccessToken("memberNo"); // 쿠키에서 memberNo 가져오기

// 리스트 api에 응시 완료 api를 추가하기 위한 함수
const listAndStatusFunc = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/fo-user/mock-exam-attempt/list`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ memberNo: memberNo }),
      },
    );
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// [API] 모의고사 목록 조회
const fetchMockExam = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/fo-user/mock-exam-attempt/list`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ memberNo: memberNo }),
      },
    );
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// [API] 응시코드와 모의고사명이 매칭되는지 확인
const checkExamCodeMatch = async (code: string, id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/fo-user/mock-exam-code/validate-mock?registrationCode=${code}&mockId=${id}`,
    );

    // 500 에러(없는 응시코드)일 때 null 반환
    if (response.status === 500) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// [API] 응시하기(응시코드 입력후 제출할 때 사용)
const fetchSubmitMockExamCode = async (userCode: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/fo-user/mock-exam-attempt/submit-mock-exam-code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ examCode: userCode, memberNo: memberNo }),
      },
    );
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // console.log(error);
    return null;
  }
};

// [API] 이어서 응시
const fetchContinueApply = async (mockExamId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/fo-user/mock-exam-attempt/${memberNo}/${mockExamId}`,
    );

    // 응답이 204 No Content 또는 비어있는 경우 예외 처리
    if (!response.ok) {
      return null;
      // throw new Error(`${response.status} ${response.statusText}`);
    }

    // 응답 바디가 비었는지 체크 (길이가 0이면 빈 응답)
    const text = await response.text();
    if (!text) {
      console.warn("빈 응답을 받았습니다.");
      return null;
    }

    // 정상적인 JSON 응답이면 파싱
    return JSON.parse(text);
  } catch (error) {
    // console.error("fetchContinueApply 오류:", error);
    return null;
  }
};

// [API] 샵바이 회원 프로필 조회
const getProfile = async (token: string) => {
  try {
    const response = await fetch(`https://shop-api.e-ncp.com/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "shop-by-authorization": `Bearer ${token}`,
        accesstoken: token,
        clientId: "L1ssjmbNZD2dBY+HZw8BMQ==",
        Version: "1.0",
        platform: "PC",
      },
    });

    // 상태 코드가 200이 아닌 경우 에러로 처리
    if (!response.ok) {
      const errorData = await response.json();
      // console.error("API 요청 중 오류 발생:", errorData);
      throw new Error();
    }
    const data = await response.json();
    return data;
  } catch (error) {
    setRecoil(errorState, {
      isError: true,
      message: "세션이 만료되었습니다. 다시 로그인을 진행해 주세요.",
      type: "shop",
    });
    // console.error("만료된 SSID 확인");
  }
};

const Page = () => {
  const methods = useForm();
  const router = useRouter();
  const { setValue } = methods;
  const { openAlert, closeAlert } = useAlert();
  const { openModal, closeModal } = useModal();
  const [mockExamList, setMockExamList] = useState<any[]>([]); // API 데이터를 저장할 상태
  const [applyInfo, setApplyInfo] = useRecoilState(applyInfoData);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    const loadMockExams = async () => {
      const data = await fetchMockExam();
      setMockExamList(data.data); // 받아온 데이터를 상태에 저장
    };

    const listAndStatus = async () => {
      const { status, data } = await listAndStatusFunc();
      if (status === 200) {
        const newData = await Promise.all(
          data.map(async (item: any) => {
            const continueData = await fetchContinueApply(item.id + "");
            return { ...item, ...continueData };
          }),
        );
        console.log(newData);

        setMockExamList(newData); // 받아온 데이터를 상태에 저장
      }
    };

    listAndStatus();

    // loadMockExams();
  }, []);

  // 프로필 정보 미리 저장
  useEffect(() => {
    const fetchProfile = async () => {
      const token = getAccessToken("SHOPBY_SSID"); // 샵바이 토큰 가져오기

      try {
        if (!token) throw new Error();

        const data = await getProfile(token);
        setUserInfo((prev) => ({
          ...prev,
          attemptId: 0,
          userName: data.memberName,
          birthday: data.birthday,
          phoneNumber: data.mobileNo,
          gender: data.sex,
          memberNo: data.memberNo,
        }));
      } catch (error) {
        // 이때 오류가 발생하면, ssid가 만료된거니까
        // userinfostate에 userinfo가 있으면 그거사용, 아니면
        // 쿠키에 ssid값지우고 쇼핑몰로 이동
        if (userInfo.attemptId) return;
        return setRecoil(errorState, {
          isError: true,
          message: "세션이 만료되었습니다. 다시 로그인을 진행해 주세요.",
          type: "shop",
        });
        // return null;

        // console.error("프로필 정보를 불러오는 중 오류 발생:", error);
      }
    };
    fetchProfile();
  }, [setValue]);

  // 개인응시 Btn
  const personalApply = async (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as Element;
    const parentForm = target.closest("tr");
    if (!parentForm) return;
    const mockName = parentForm.querySelector(".mockExamName")?.textContent;
    const mockGrade = parentForm.querySelector(".grade")?.textContent?.slice(1);
    setAccessToken("mockExamId", parentForm.id);
    methods.reset();
    openModal({
      title: "응시코드 입력",
      content: (
        <FormProvider {...methods}>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div>응시코드</div>
              <Input
                name="user-code"
                placeholder="응시코드를 입력하세요"
                rules={{ required: "응시코드는 필수 항목입니다." }}
                color="white"
              />
            </div>
            <div>
              [마이페이지]에서 &quot;주문번호&quot;를 클릭하여 모의고사
              응시코드를 확인하세요.
            </div>
          </div>
        </FormProvider>
      ),
      isBtn: true,
      canClose: true,
      btnName: "확인",
      callback: async () => {
        const userCode = methods.watch("user-code");
        const isMatching = await checkExamCodeMatch(userCode, parentForm.id); // 응시코드와 모의고사명이 일치하는지 확인, null이면 없는 응시코드

        // 존재하지 않는 응시코드인 경우
        if (isMatching === null) {
          openAlert({
            content: "존재하지 않는 응시코드 입니다.",
            canClose: true,
            callBack: closeAlert,
          });
          return;
        }

        // 응시코드와 모의고사명이 일치하지 않는 경우
        if (!isMatching) {
          openAlert({
            content: "해당 모의고사에 발급받은 응시코드를 입력해주세요.",
            canClose: true,
            callBack: closeAlert,
          });
          return;
        }

        // 응시코드와 모의고사명이 일치하는 경우
        if (isMatching) {
          const data = await fetchSubmitMockExamCode(userCode);

          //  잘못된 응시코드일 경우
          if (data.status === 400) {
            openAlert({
              content: "응시코드를 다시 확인해주세요.",
              canClose: true,
              callBack: closeAlert,
            });
            return;
          }

          setApplyInfo((prev) => ({
            ...prev,
            memberNo: data.data.memberNo,
            mockExamName: mockName as string,
            grade: mockGrade as string,
          }));
          router.push(`/online-mock-test/info/personal?code=${userCode}`);
          closeModal();
          return;
        }
      },
    });

    return;
  };

  // 단체응시 Btn
  const groupApply = (e: React.MouseEvent<HTMLElement>) => {
    openAlert({
      content: "추후 서비스 오픈 예정입니다.",
      canClose: true,
      callBack: closeAlert,
    });
    return;

    const target = e.target as Element;
    const parentForm = target.closest("tr");
    if (!parentForm) return;
    const mockName = parentForm.querySelector(".mockExamName")?.textContent;
    const mockGrade = parentForm.querySelector(".grade")?.textContent;
    methods.reset();
    openModal({
      title: "응시코드 입력",
      content: (
        <FormProvider {...methods}>
          <div>
            <div className="flex items-center gap-2">
              <div>단체코드</div>
              <Input
                name="group-code"
                placeholder="응시코드를 입력하세요"
                rules={{ required: "응시코드는 필수 항목입니다." }}
                color="white"
              />
            </div>
            <div>소속 단체의 단체코드를 입력해주세요.</div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div>응시코드</div>
              <Input
                name="user-code"
                placeholder="응시코드를 입력하세요"
                rules={{ required: "응시코드는 필수 항목입니다." }}
                color="white"
              />
            </div>
            <div>
              더 프리미엄 모의고사 구매 시 부여받은 응시코드를 입력해주세요.
            </div>
          </div>
        </FormProvider>
      ),
      isBtn: true,
      canClose: true,
      btnName: "확인",
      callback: async () => {
        const userCode = methods.watch("user-code");
        const groupCode = methods.watch("group-code");
        // const data = await fetchSubmitMockExamCode(userCode);
        // 응시코드 잘못 입력 > 오류 알럿
        if (!userCode || userCode !== validUserCode) {
          openAlert({
            content: "응시코드를 다시 확인해주세요.",
            canClose: true,
            callBack: closeAlert,
          });
          return;
        }
        // 단체코드 잘못 입력 > 오류 알럿
        if (!groupCode || groupCode !== validGroupCode) {
          openAlert({
            content: "단체코드를 다시 확인해주세요.",
            canClose: true,
            callBack: closeAlert,
          });
          return;
        }
        // 응시코드 + 단체코드 잘못 입력 > 오류 알럿
        if (
          (!userCode || userCode !== validUserCode) &&
          (!validGroupCode || groupCode !== validGroupCode)
        ) {
          openAlert({
            content: "응시코드를 다시 확인해주세요.",
            canClose: true,
            callBack: closeAlert,
          });
          return;
        }

        // --------------- 수정중 ---------------
        // // 존재하는 응시코드일 경우
        // if (data.status === 200) {
        //   setApplyInfo((prev) => ({
        //     ...prev,
        //     memberNo: data.data.memberNo,
        //     mockName: mockName,
        //     grade: mockGrade,
        //   }));
        // --------------- 수정중 ---------------

        // 응시코드 + 단체코드 정상입력 > 단체 응시 정보 입력 페이지로 이동
        router.push(
          `/online-mock-test/info/group?code=${userCode}&groupCode=${groupCode}`,
        );
        closeModal();
      },
    });
    return;
  };

  // 이어서 응시 Btn
  const continueApply = async (
    e: React.MouseEvent<HTMLElement>,
    type: string,
  ) => {
    const target = e.target as Element;
    const parentForm = target.closest("tr");
    if (!parentForm) return;
    const continueApplyInfo = await fetchContinueApply(parentForm.id);
    // [개인] 이어서 응시 -> 쿠키에 attemptId 저장, 답안 입력 페이지로 이동
    if (type === "personal") {
      setAccessToken("attemptId", continueApplyInfo.attemptId);
      setAccessToken("mockExamId", parentForm.id);
      router.push(
        continueApplyInfo.answerMethod === "INPUT_TEXT"
          ? `/personal/manual`
          : `/personal/omr`,
      );
    }

    // [단체] 이어서 응시 -> 쿠키에 attemptId 저장, 답안 입력 페이지로 이동
    if (type === "group") {
      setAccessToken("attemptId", continueApplyInfo.attemptId);
      router.push(
        continueApplyInfo.answerMethod === "INPUT_TEXT"
          ? `/personal/manual`
          : `/personal/omr`,
      );
    }
  };

  // 저장된 데이터 여부에 따른 응시하기 Btn
  const checkedSaveData = (
    personalContinue: boolean,
    groupContinue: boolean,
    examStatus: string,
    codeStatus: string,
  ) => {
    const isExamPending = examStatus === "응시불가능";
    console.log(codeStatus);
    if (codeStatus == "TRANSMITTED") {
      return (
        <div className="flex h-[40px] items-center justify-center">
          응시완료
        </div>
      );
    }

    if (personalContinue) {
      // [개인] 임시저장 정보가 있다면
      return (
        <span>
          <Button
            label="이어서 응시"
            variant="defaultOutline"
            size="md"
            className="w-48"
            disabled={isExamPending}
            onClick={(e) => continueApply(e, "personal")}
          />
        </span>
      );
    } else if (groupContinue) {
      // [그룹] 임시저장 정보가 있다면
      return (
        <span>
          <Button
            label="이어서 응시"
            variant="defaultOutline"
            size="md"
            className="w-48"
            onClick={(e) => continueApply(e, "group")}
          />
        </span>
      );
    } else {
      // 임시저장 정보가 없다면
      return (
        <span className="flex justify-center gap-2">
          <Button
            label="개인응시"
            variant="defaultBlack"
            size="md"
            className="w-24"
            disabled={isExamPending}
            onClick={(e) => personalApply(e)}
          />
          <Button
            label="단체응시"
            variant="defaultBlack"
            size="md"
            className="w-24"
            disabled={isExamPending}
            onClick={(e) => groupApply(e)}
          />
        </span>
      );
    }
  };

  // 응시가능 or 응시대기 상태
  const checkedStatus = React.useMemo(
    () => (status: string) => {
      return status === "응시가능" ? status : "응시대기";
    },
    [],
  );

  // 임시 개인응시 코드 (더미)
  const validUserCode = "1111";
  // 임시 단체응시 코드 (더미)
  const validGroupCode = "2222";

  // 테이블 제목
  const columns = [
    { header: "모의고사명", name: ["name"] },
    { header: "학년", name: ["grade"] },
    { header: "상태", name: ["status"] },
    { header: "응시하기", name: ["apply"] },
  ];

  // 테이블 데이터
  const items = mockExamList?.map((exam) => ({
    name: `${exam.productName}`, // 모의고사명
    status: checkedStatus(exam.examStatus), // 상태
    grade: `고${exam.mockExamGrade}`, // 학년
    saveData: checkedSaveData(
      exam.personalContinue,
      exam.groupContinue,
      exam.examStatus,
      exam.codeStatus,
    ), // 임시저장 데이터 여부, 모의고사 응시 가능 여부
    id: exam.id, // 어떤 모의고사를 선택했는지 알기 위한 id
  }));

  return (
    <div className="flex w-[1400px] flex-col gap-4 overflow-x-auto">
      <FormProvider {...methods}>
        <PageTitle>모의고사 응시</PageTitle>
        <section>
          <ColTable
            columns={columns}
            items={items}
            isNumber={true}
            emptyMessage="데이터가 존재하지 않습니다."
          />
        </section>
      </FormProvider>
    </div>
  );
};

export default Page;
