import React from "react";
import Container from "./_components/Container";
import NotFound from "./_components/NotFound";
import { cookies } from "next/headers";

const Page = () => {
  // 쿠키에 attemptId가 있나 없나 확인하고
  // 없으면, 시험정보가 없다고 알림창 띄우고, home으로 이동
  // 있으면, 시험정보 있으니까 데이터 가져오기

  // const attemptId = getCookie("attemptId");

  const cookieStore = cookies();
  const attemptId = cookieStore.get("attemptId");

  if (!attemptId) {
    return <NotFound />;
  }

  return <Container attemptId={attemptId.value} />;
};

export default Page;
