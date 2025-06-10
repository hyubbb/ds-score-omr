"use client";
import React, { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PageTitle from "../../../../components/Manual/PageTitle";
import Button from "@/components/Commons/Form/Button/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";

const page = () => {
  const router = useRouter();
  const methods = useForm();
  const { handleSubmit } = methods;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const onSubmit = (e: any) => {
    router.push("/personal/omr/list");
  };

  // 버튼 클릭 시 파일 선택 창 열기
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // 파일 선택 시 리스트에 추가
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]); // 기존 파일 유지 + 새 파일 추가
    }
  };

  // 선택한 파일 삭제
  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="flex w-[1400px] flex-col gap-4 overflow-x-auto">
      <FormProvider {...methods}>
        <PageTitle>OMR 답안 업로드</PageTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col items-center gap-6">
            <section className="mt-[80px] flex h-[300px] w-[1100px] flex-col gap-8 rounded-md bg-[var(--bg-gray)] p-6">
              <div className="mb-5 flex justify-center">
                <span className="text-xl font-bold">
                  OMR 이미지 업로드 가이드
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <span>
                  💡(이미지 형식 확인) 형식, (용량 확인) 이하 이미지만 업로드
                  가능합니다.
                </span>
                <span>
                  💡귀퉁이를 포함한 OMR 카드의 모든 부분이 나오도록 이미지를
                  올려주세요.
                </span>
                <span>
                  💡빛 반사, 그림자로 인해 답안이 인식되지 않을 수 있으니 검토
                  페이지에서 꼭 검토를 진행해주세요.
                  <br /> (답안 미검토로 인해 오기입 혹은 미기입된 답안에 대한
                  책임은 모두 응시자에게 있습니다.)
                </span>
                <span>💡상하, 좌우 반전된 이미지는 인식이 불가합니다.</span>
              </div>
            </section>
            <div className="flex flex-col items-center justify-center">
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }} // 기본 파일 입력 필드를 숨김
              />
              {selectedFiles.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h4 className="text-center">
                    선택된 파일 {selectedFiles.length}개 파일 선택
                  </h4>
                  <div className="h-[100px] overflow-y-auto">
                    <ul>
                      {selectedFiles.map((file, index) => (
                        <li key={index} className="flex items-center">
                          {file.name}{" "}
                          <button
                            className="border-1 mx-3 cursor-pointer rounded-full border-gray-300 p-1"
                            onClick={() => handleRemoveFile(index)}
                          >
                            <Image
                              src={`/icons/icon_close.svg`}
                              alt="close"
                              width={16}
                              height={16}
                            />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {selectedFiles.length > 0 ? (
                <Button
                  type="button"
                  variant="defaultOutlineBold"
                  size="md"
                  onClick={onSubmit}
                  label="전송"
                />
              ) : (
                <Button
                  type="button"
                  variant="defaultOutlineBold"
                  size="md"
                  onClick={handleButtonClick}
                  label="업로드"
                />
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default page;
