import { userInfoState } from "@/atoms/user/atom";
import Button from "@/components/Commons/Form/Button/Button";
import Spinner from "@/components/Commons/Spinner/Spinner";
import { useAlert } from "@/libs/hooks/useAlert";
import { fetchWrapper } from "@/libs/utils/fetchWrapper";
import { getCookie } from "cookies-next";
import Image from "next/image";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ClimbingBoxLoader } from "react-spinners";
import { useRecoilValue } from "recoil";

const ResultDownload = ({
  type,
  handleDownload,
  resultBtn,
  mockExamId,
}: {
  type: "personal" | "group";
  handleDownload: () => void;
  resultBtn: boolean;
  mockExamId: number;
}) => {
  const userInfo = useRecoilValue(userInfoState);
  const { openAlert, closeAlert } = useAlert();
  const [testCode, setTestCode] = useState(true);
  const [codeView1, setCodeView1] = useState(false);
  const [codeView2, setCodeView2] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const methods = useFormContext();
  const { getValues, register } = methods;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ["/images/exam002.png", "/images/exam001.png"];

  const fetchResult = async () => {
    setDownloadLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/socket/cert-code/request-score`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            certCd: getValues("personalCode").replace(/-/g, ""),
            username: userInfo?.userName,
            mockExamId: mockExamId,
            phoneNumber: userInfo?.phoneNumber,
            // certCd: getValues("personalCode").replace(/-/g, ""),
            // username: "김서연",
            // mockExamId: mockExamId,
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

  const fetchGroupCodeResult = async () => {
    setDownloadLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/socket/cert-code/request-group-score`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            certCd: getValues("groupCode").replace(/-/g, ""),
            username: "",
            mockExamId: mockExamId,
            phoneNumber: "",
            // certCd: getValues("personalCode").replace(/-/g, ""),
            // username: "김서연",
            // mockExamId: mockExamId,
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

  const handlePersonalSearch = async () => {
    const value = getValues("personalCode");
    if (!value) {
      openAlert({
        content: "인증코드를 입력해주세요.",
        callBack: () => {
          closeAlert();
        },
      });
      return;
    }

    const text =
      testCode === true ? (
        <div>
          응시자 성명과 다르거나 입력하신 인증코드로 조회되는 성적이 없습니다.
          인증코드를 확인해주세요.
        </div>
      ) : (
        <div>해당 인증코드는 단체용 인증코드로 조회해주세요.</div>
      );

    setTestCode(!testCode);

    // fetchWrapper.post("api/v1/socket/cert-code/request-score", {
    //   certCd: value,
    //   username: userInfo?.userName,
    //   mockExamId: mockExamId,
    // });

    try {
      const res = await fetchResult();
      console.log(res);
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
          openAlert({
            content: `응시 이력 조회에 실패했습니다. \n 응시 코드를 확인해주세요.`,
            callBack: () => {
              closeAlert();
            },
          });
        }
        return;
      }

      // PDF 다운로드 처리
      const url = window.URL.createObjectURL(res.blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "개인용 성적레포트.pdf"; // 다운로드할 파일 이름 설정
      document.body.appendChild(a);
      a.click();

      // 메모리 정리
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("다운로드 중 오류 발생:", error);
      openAlert({
        content: `해당 인증코드로 조회되는 성적이 없습니다.\n 인증코드를 확인해주세요.`,
        callBack: () => {
          closeAlert();
        },
      });
    } finally {
      setDownloadLoading(false); // 무조건 실행되도록 finally 블록 사용
    }
  };

  const handleGroupSearch = async () => {
    const value = getValues("groupCode");
    if (!value) {
      openAlert({
        content: "인증코드를 입력해주세요.",
        callBack: () => {
          closeAlert();
        },
      });
      return;
    }

    const text =
      testCode === true ? (
        <div>
          응시자 성명과 다르거나 입력하신 인증코드로 조회되는 성적이 없습니다.
          인증코드를 확인해주세요.
        </div>
      ) : (
        <div>해당 인증코드는 단체용 인증코드로 조회해주세요.</div>
      );

    setTestCode(!testCode);

    try {
      const res = await fetchGroupCodeResult();
      console.log(res);
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
          openAlert({
            content: `응시 이력 조회에 실패했습니다. \n 응시 코드를 확인해주세요.`,
            callBack: () => {
              closeAlert();
            },
          });
        }
        return;
      }

      // PDF 다운로드 처리
      const url = window.URL.createObjectURL(res.blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "단체용 성적레포트.zip"; // 다운로드할 파일 이름 설정
      document.body.appendChild(a);
      a.click();

      // 메모리 정리
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("다운로드 중 오류 발생:", error);
      openAlert({
        content: `해당 인증코드로 조회되는 성적이 없습니다.\n 인증코드를 확인해주세요.`,
        callBack: () => {
          closeAlert();
        },
      });
    } finally {
      setDownloadLoading(false); // 무조건 실행되도록 finally 블록 사용
    }
  };

  const handleCodeView1 = () => {
    setCodeView1(!codeView1);
  };

  const handleCodeView2 = () => {
    setCodeView2(!codeView2);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex items-center gap-4">
      {/* {type === "personal" ? ( */}
      {!resultBtn ? (
        <Button
          variant="primaryFill"
          size="sm"
          label="성적표 다운로드"
          type="button"
          className="w-[150px]"
          onClick={handleDownload}
        />
      ) : (
        <section className="flex flex-col gap-8">
          {/* <Button
            variant="primaryFill"
            size="sm"
            label="단체 성적표 다운로드"
            type="button"
            className="w-[150px]"
            onClick={handleDownload}
          />
          <Button
            variant="primaryFill"
            size="sm"
            label="반 별 성적표 다운로드"
            type="button"
            className="w-[150px]"
            onClick={handleDownload}
          /> */}

          <div className="flex gap-2">
            <span className="inline-block">
              {userInfo?.userName}님의 휴대폰번호로 조회 가능한 성적표가
              없습니다.
              <br />
              성적표 인증코드를 입력해주세요.
            </span>
          </div>

          <div className="flex flex-col items-start gap-2">
            <span>
              개인용 성적표 인증코드{" "}
              <div
                className="relative mb-1 inline-block h-[16px] w-[16px] cursor-pointer rounded-full border bg-zinc-600 text-center text-[10px] text-white"
                onClick={handleCodeView1}
              >
                ?
                {codeView1 && (
                  <>
                    <div
                      className="fixed inset-0 z-50 bg-black bg-opacity-50"
                      onClick={handleCodeView1}
                    />
                    <div className="fixed left-1/2 top-1/2 z-50 w-[1000px] -translate-x-1/2 -translate-y-1/2">
                      <Image
                        src={"/images/codeCheck.png"}
                        alt="인증코드 확인"
                        width={1000}
                        height={1000}
                        quality={100}
                        priority={true}
                        className="w-[1000px]"
                      />
                    </div>
                  </>
                )}
              </div>
            </span>
            <div className="flex items-start gap-2">
              <input
                {...register("personalCode")}
                type="text"
                placeholder="인증코드를 입력 해주세요."
                className="h-[40px] w-[200px] rounded-md border-2 border-zinc-600 pl-2"
              />
              <Button
                variant="primaryFill"
                size="sm"
                label="조회"
                onClick={handlePersonalSearch}
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-2">
            <span>
              단체용 성적표 인증코드 (학교용/담임용)
              <div
                className="relative mb-1 inline-block h-[16px] w-[16px] cursor-pointer rounded-full border bg-zinc-600 text-center text-[10px] text-white"
                onClick={handleCodeView2}
              >
                ?
                {codeView2 && (
                  <>
                    <div
                      className="fixed inset-0 z-50 bg-black bg-opacity-50"
                      onClick={handleCodeView2}
                    />
                    <div className="fixed left-1/2 top-1/2 z-50 w-[1000px] -translate-x-1/2 -translate-y-1/2">
                      <div className="relative text-3xl">
                        <Image
                          src={images[currentImageIndex]}
                          alt="인증코드 확인"
                          width={1000}
                          height={1000}
                          quality={100}
                          priority={true}
                          className="w-[1000px]"
                        />

                        {currentImageIndex !== 0 ? (
                          <button
                            onClick={handlePrevImage}
                            className="absolute left-[0px] top-1/2 ml-5 flex h-[50px] w-[50px] -translate-y-1/2 items-center justify-center rounded-full bg-[#000000b3] p-2 leading-tight text-white hover:bg-opacity-75"
                          >
                            {`<`}
                          </button>
                        ) : (
                          <button
                            onClick={handleNextImage}
                            className="absolute right-[0px] top-1/2 mr-5 flex h-[50px] w-[50px] -translate-y-1/2 items-center justify-center rounded-full bg-[#000000b3] p-2 leading-tight text-white hover:bg-opacity-75"
                          >
                            {`>`}
                          </button>
                        )}
                        <div className="absolute bottom-4 left-1/2 flex h-[50px] w-[400px] -translate-x-1/2 justify-center bg-black text-3xl text-xl text-white">
                          {/* {currentImageIndex + 1} / {images.length} */}
                          <span className="flex items-center justify-center">
                            {currentImageIndex == 0
                              ? "학교용 성적표"
                              : "담임용 성적표"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </span>
            <div className="flex items-start gap-2">
              {/* <input
                {...register("groupPhone")}
                type="text"
                placeholder="휴대폰번호를 입력 해주세요."
                className="h-[40px] w-[200px] rounded-md border-2 border-zinc-600 pl-2"
              /> */}
              <input
                {...register("groupCode")}
                type="text"
                placeholder="인증코드를 입력 해주세요."
                className="h-[40px] w-[200px] rounded-md border-2 border-zinc-600 pl-2"
              />
              <Button
                variant="primaryFill"
                size="sm"
                label="조회"
                onClick={handleGroupSearch}
              />
            </div>
          </div>
        </section>
      )}
      {downloadLoading && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white opacity-50">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default ResultDownload;
