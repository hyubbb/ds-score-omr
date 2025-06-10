import Button from "@/components/Commons/Form/Button/Button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex min-h-screen flex-1">
      <main className="mt-[200px] flex flex-1 flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">대성 시험성적 입력 프로그램</h1>
        {/* 본인페이지 만들어 쓰셔도됩니다. */}
        {/* 개인 답안 입력페이지 */}
        <div className="flex flex-col gap-4">
          <section className="flex gap-4">
            <Link href="/online-mock-test">
              <Button
                label="모의고사 응시페이지"
                variant="defaultOutlineLight"
                size="lg"
              />
            </Link>
            <Link href="/group/manage">
              <Button
                label="단체 관리"
                variant="defaultOutlineLight"
                size="lg"
              />
            </Link>
            <Link href="/offline-groups">
              <Button
                label="기존 단체 관리(검색)"
                variant="defaultOutlineLight"
                size="lg"
              />
            </Link>
          </section>
          <section className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Link href="/personal/manual">
                <Button
                  label="개인 답안 입력페이지"
                  variant="defaultOutlineLight"
                  size="lg"
                />
              </Link>
              <Link href="/personal/omr">
                <Button
                  label="OMR 답안 입력페이지"
                  variant="defaultOutlineLight"
                  size="lg"
                />
              </Link>
            </div>
            <div className="flex gap-4">
              <Link href="/group/select-exam-code">
                <Button
                  label="단체 응시코드 선택"
                  variant="defaultOutlineLight"
                  size="lg"
                />
              </Link>
            </div>
            <div className="flex gap-4">
              <Link href="/group/manual">
                <Button
                  label="단체 수기입력"
                  variant="defaultOutlineLight"
                  size="lg"
                />
              </Link>
              <Link href="/group/omr">
                <Button
                  label="단체 OMR 입력"
                  variant="defaultOutlineLight"
                  size="lg"
                />
              </Link>
            </div>
            <div className="flex gap-4">
              <Link href="/result/personal">
                <Button
                  label="개인 성적확인"
                  variant="defaultOutlineLight"
                  size="lg"
                />
              </Link>
              <Link href="/result/group">
                <Button
                  label="단체 성적확인"
                  variant="defaultOutlineLight"
                  size="lg"
                />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default page;
