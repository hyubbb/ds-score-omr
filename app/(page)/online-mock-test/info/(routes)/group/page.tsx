import React from "react";
import Container from "./_components/Container";
import { setRecoil } from "recoil-nexus";
import { errorState } from "@/atoms/atom";
import LoadingPage from "@/components/LoadingPage";

const page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  // console.log(searchParams);
  if (!searchParams.code) {
    return (
      <LoadingPage message="응시코드가 존재하지 않습니다." type="notCode" />
    );
  }

  return <Container searchParams={searchParams} />;
};

export default page;
