"use client";
import Button from "@/components/Commons/Form/Button/Button";
import Input from "@/components/Commons/Form/Input/Input";
import FormSelect from "@/components/Commons/Form/Select/Select";
import PageTitle from "@/components/Manual/PageTitle";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ResultDownload from "./ResultDownload";
import { useAlert } from "@/libs/hooks/useAlert";
import { fetchWrapper } from "@/libs/utils/fetchWrapper";
import { getAccessToken } from "@/libs/utils/manageCookie";
import Spinner from "@/components/Commons/Spinner/Spinner";
import { getCookie, setCookie } from "cookies-next";
import { userInfoState } from "@/atoms/user/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { setRecoil } from "recoil-nexus";
import { errorState } from "@/atoms/atom";

const Container = ({ params }: { params: { page: string } }) => {
  const currentPage = params.page as "personal" | "group";
  const methods = useForm({
    defaultValues: {
      examType: null,
      personalCode: null,
      groupCode: null,
      personalPhone: null,
      groupPhone: null,
    },
  });
  const { handleSubmit, getValues, setValue } = methods;
  const { openAlert, closeAlert } = useAlert();

  const [mockExamList, setMockExamList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  // 삭제할 테스트용 플래그
  const [resultBtn, setResultBtn] = useState(false);
  const [mockExamId, setMockExamId] = useState(null);
  const memberNo = getCookie("memberNo");
  const userAttemptId = getCookie("attemptId");
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const fetchResult = async () => {
    console.log(userInfo);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/socket/number/request-score`,
        // `${process.env.NEXT_PUBLIC_API_URL}/api/v1/socket/receive/personal/record`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // attemptId: userAttemptId,
            // mockExamId: getValues("examType") + "",
            // memberNo: getCookie("memberNo"),
            username: userInfo?.userName,
            phoneNumber: userInfo?.phoneNumber,
            mockExamId: getValues("examType"),
          }),
        },
      );

      if (!res.ok) {
        const errorMessage = await res.text(); // 오류 메시지 가져오기
        return { ok: false, message: errorMessage };
      }

      // JSON이 아니라 PDF 데이터를 받기 때문에 `blob()` 사용
      const blob = await res.blob();
      return { ok: true, blob };
    } catch (error) {
      console.error("fetchResult 오류:", error);
      return { ok: false, message: "네트워크 오류 발생" };
    }
  };

  const handleDownload = async () => {
    const examType = getValues("examType");

    if (!examType) {
      openAlert({
        content: "모의고사를 선택해주세요.",
        callBack: () => {
          closeAlert();
        },
      });
      return;
    }
    setDownloadLoading(true);

    try {
      const res = await fetchResult();

      if (!res.ok) {
        console.log(res.message);

        if (res.message.includes("아직 성적 처리")) {
          openAlert({
            content: `성적 처리 중입니다. \n 성적 처리 완료 후 성적표 다운로드가 가능합니다.`,
            callBack: () => {
              closeAlert();
            },
          });
        } else {
          // openAlert({
          //   content: `응시 이력 조회에 실패했습니다. \n 응시 코드를 확인해주세요.`,
          //   callBack: () => {
          //     closeAlert();
          //   },
          // });
          setResultBtn(true);
        }
        return;
      }

      // PDF 다운로드 처리
      const url = window.URL.createObjectURL(res.blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "성적표.pdf"; // 다운로드할 파일 이름 설정
      document.body.appendChild(a);
      a.click();

      // 메모리 정리
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("다운로드 중 오류 발생:", error);
    } finally {
      setDownloadLoading(false); // 무조건 실행되도록 finally 블록 사용
    }
  };

  const handleSearch = () => {
    openAlert({
      content: `응시 이력 조회에 실패했습니다. \n 응시 코드를 확인해주세요.`,
      callBack: () => {
        closeAlert();
      },
    });
  };

  // const fetchExamList = async () => {
  //   const response = await fetchWrapper.get("/fo-user/mock-exam-attempt/list");
  //   console.log(response);
  // };

  // [API] 모의고사 목록 조회
  const fetchMockExam = async () => {
    const { data } = await fetchWrapper.post(
      "/fo-user/mock-exam-attempt/list",
      {
        memberNo: memberNo,
      },
    );

    console.log(data);
    const newData = data.map((item: any) => ({
      label: `${item.productName} (고${item.mockExamGrade})`,
      value: item.id,
    }));

    setMockExamList(newData);
  };

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

  const handleChangeExamType = (item: any) => {
    setResultBtn(false);

    const mockExam = mockExamList.filter((m: any) => m.id == item)[0];
    setCookie("attemptId", mockExam.attemptId);
    setCookie("mockExamId", mockExam.id);
    setMockExamId(item);
  };

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

  useEffect(() => {
    // fetchMockExam();
    const listAndStatus = async () => {
      const { status, data } = await listAndStatusFunc();
      if (status == 200) {
        const newData = await Promise.all(
          data.map(async (item: any) => {
            const continueData = await fetchContinueApply(item.id + "");
            return { ...item, ...continueData };
          }),
        );

        const newListData = newData.map((item: any) => ({
          ...item,
          label: `${item.productName} (고${item.mockExamGrade})`,
          value: item.id,
        }));

        setMockExamList(newListData); // 받아온 데이터를 상태에 저장
      }
    };

    listAndStatus();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex w-full flex-col gap-4 overflow-x-auto">
      <PageTitle>성적조회</PageTitle>
      <div className="flex flex-col gap-6 pl-[20px] pt-[2ㅊ0px]">
        <FormProvider {...methods}>
          <section>
            <FormSelect
              name="examType"
              items={mockExamList}
              defaultLabel="모의고사 선택"
              onSubmit={handleChangeExamType}
              sizeW="L"
              className="w-[300px]"
            />
          </section>

          <section className="flex flex-col gap-2">
            {!resultBtn && (
              <span className="text-lg">
                아래버튼을 통해 성적표를 다운로드 받으실 수 있습니다.
              </span>
            )}
            <ResultDownload
              type={currentPage}
              handleDownload={handleDownload}
              resultBtn={resultBtn}
              mockExamId={mockExamId}
            />
          </section>

          {/* <section className="flex flex-col gap-2">
            <span>
              온라인 응시 이력이 없습니다.
              <br />
            //     오프라인 응시자의 경우 오프라인 인증 코드를 입력해서 성적표
            //     조회가 가능합니다.
            //   </span>
            //   <div className="flex items-center gap-2">
            //     <Input
            //       name="code"
            //       className="w-[100px]"
            //       placeholder="오프라인 인증 코드를 입력해주세요."
            //     />
            //     <Button
            //       variant="primaryOutline"
            //       size="sm"
            //       label="조회"
            //       type="button"
            //       onClick={handleSearch}
            //     />
            //   </div>
            // </section> */}
        </FormProvider>
      </div>
      {downloadLoading && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white opacity-50">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Container;
