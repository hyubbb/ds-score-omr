"use client";
import Loading from "@/components/Commons/Loading/Loading";
import { useAlert } from "@/libs/hooks/useAlert";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const NotFound = () => {
  const router = useRouter();
  const { openAlert, closeAlert } = useAlert();
  useEffect(() => {
    openAlert({
      content: "시험정보가 존재 하지 않습니다.",
      callBack: () => {
        closeAlert();
        router.push("/online-mock-test");
      },
    });
  }, []);

  return <Loading />;
};

export default NotFound;
