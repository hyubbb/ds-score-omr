"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import PageTitle from "@/components/Manual/PageTitle";
import Button from "@/components/Commons/Form/Button/Button";
import { useRouter } from "next/navigation";

const Container = () => {
  const router = useRouter();
  const methods = useForm();
  const { handleSubmit } = methods;
  const onSubmit = (e: any) => {
    return router.push("/group/omr/list");
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
            <div className="flex justify-center">
              <Button
                type="submit"
                variant="defaultOutlineBold"
                size="md"
                label="업로드"
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Container;
