"use client";

import Button from "@/components/Commons/Form/Button/Button";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/personal/omr/list");
  }, []);

  return (
    <div className="flex min-h-screen flex-1">
      <main className="mt-[200px] flex flex-1 flex-col items-center gap-4"></main>
    </div>
  );
};

export default page;
