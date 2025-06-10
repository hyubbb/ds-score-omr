"use client";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IColumns } from "@/types/interface/common";
import { useQuery } from "@tanstack/react-query";
import {
  fetchGroupManageDetailData,
  fetchGroupRelationData,
} from "@/libs/utils/apis/api";
import Spinner from "@/components/Commons/Spinner/Spinner";
import { IData, RowTable } from "@/components/Commons/Table/RowTable";
import { SectionTitle } from "@/components/Manual/SectionTitle";
import ListTable from "./ListTable";
import Button from "@/components/Commons/Form/Button/Button";
import { useRouter } from "next/navigation";
import { useModal } from "@/libs/hooks/useModal";
import { examStateList } from "./dummyData";
import ModalContainer from "./ModalContainer";
import { useSetRecoilState } from "recoil";
import { groupDetailState } from "@/atoms/group/atom";

interface IGroupRelation {
  examName: string;
  codeState: string;
  examCount: number;
  confirmCount: number;
  examState: string;
}

const Container = ({ groupId }: { groupId: string }) => {
  // 응시현황 전체 몇명인지 데이터도 넘어오겠지만 임시로 지정
  const MAX_CNT = 20;
  const mrgCd = "32132";
  const mockExamId = 7;
  const mockExamName = "더프 4월 모의고사";
  const grade = "1";
  const router = useRouter();

  const methods = useForm({
    defaultValues: {
      groupList: [],
      pageNum: 1,
    },
  });

  const { openModal, closeModal } = useModal();
  const setGroupDetail = useSetRecoilState(groupDetailState);

  const { data, isLoading } = useQuery<IData[]>({
    queryKey: ["groupDetail"],
    queryFn: () => fetchGroupManageDetailData(groupId),
    initialData: [],
  });

  const { data: relationData } = useQuery<IGroupRelation[]>({
    queryKey: ["groupRelation"],
    queryFn: () => fetchGroupRelationData(groupId),
    initialData: [],
  });

  const handleDetail = () => {
    openModal({
      title: "응시현황 상세",
      canClose: true,
      content: (
        <ModalContainer examStateList={examStateList} closeModal={closeModal} />
      ),
    });
  };

  const columns: IColumns[] = [
    { header: "모의고사명", name: ["examName"], width: "250", align: "center" },
    { header: "학년", name: ["grade"], width: "100", align: "center" },
    {
      header: "응시코드 상태",
      name: ["codeState"],
      width: "160",
      align: "center",
      editor: (value: boolean) => (value ? "전송완료" : "발급"),
    },
    {
      header: "응시현황",
      name: ["examCount"],
      width: "180",
      align: "center",
      editor: (value: number) => (
        <div className="flex items-center justify-center gap-2">
          <div>
            {value} / {MAX_CNT}
          </div>
          <Button
            label="상세보기"
            variant="defaultGray"
            size="xs"
            onClick={handleDetail}
          />
        </div>
      ),
    },
    {
      header: "검수현황",
      name: ["confirmCount"],
      width: "120",
      align: "center",
      editor: (value: number) => `${value} / ${MAX_CNT}`,
    },
    {
      header: "응시하기",
      name: ["examState"],
      width: "150",
      align: "center",
      editor: (value: boolean) => (
        <Button
          label="응시하기"
          variant="defaultGray"
          size="sm"
          disabled={value}
          onClick={() => {
            setGroupDetail({
              mrgCd: mrgCd,
              mockExamId: mockExamId,
              mockExamName: mockExamName,
              grade: grade,
            });
            router.push(
              `/group/select-exam-code?mrgCd=${mrgCd}&mockExamId=${mockExamId}`,
            );
          }}
        />
      ),
    },
    /*
    {
      header: "성적조회",
      name: ["examState"],
      width: "150",
      align: "center",
      editor: (value: boolean) => (
        <Button
          label="성적조회"
          variant="defaultGray"
          size="sm"
          disabled={value ? false : true} // 이부분 최종제출 상태일때만 되어야 하기 때문에 수정해야됨
        />
      ),
    },
    */
  ];

  return (
    <section className="flex flex-col gap-6">
      <FormProvider {...methods}>
        <section>
          <SectionTitle>응시정보</SectionTitle>
          <RowTable data={data} className="max-w-[600px] border-black" />
        </section>
        {isLoading ? (
          <div className="flex h-full w-screen items-center justify-center text-center">
            <Spinner />
            <p>로딩중입니다.</p>
          </div>
        ) : (
          <>
            <ListTable items={relationData} columns={columns} />
          </>
        )}
        <div className="flex justify-center">
          <Button
            label="목록"
            variant="primaryFill"
            size="sm"
            type="button"
            onClick={() => router.push("/group/manage")}
          />
        </div>
      </FormProvider>
    </section>
  );
};

export default Container;
