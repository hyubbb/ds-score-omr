"use client";
import Image from "next/image";
import Link from "next/link";

export interface IFooter {
  src: string;
  // description: {
  //   main: string;
  //   sub: string;
  //   contact?: string;
  // };
}

const Title = ({ children }: { children: React.ReactNode }) => {
  return <span className="font-bold">{children}</span>;
};

export const Footer = () => {
  return (
    <>
      <footer className="border-t-grayDB mt-[50px] flex h-[330px] w-full min-w-full items-center justify-center border-t-[1px] bg-[var(--gray)] py-[65px] text-[15px] leading-6 text-white text-opacity-80">
        <div className="flex min-w-[1400px] flex-row items-center justify-between text-sm">
          {/* <div className="flex h-[180px] flex-col gap-2 text-[#AAAAAA]">
            <div className="mb-[20px]">
              <img
                src={`/icons/footerLogo.svg`}
                alt="footerLogo"
                width={240}
                height={40}
              />
            </div>
            <div className="flex gap-1">
              <Title>COMPANY </Title> <span> (주)대성학력개발연구소</span>
              <strong>I</strong>
              <Title>대표이사 </Title>
              <strong>I</strong> <span>김석규 </span>
              <strong>I</strong>
              <Title>TEL </Title> <span>02)812-8001</span>
            </div>
            <div className="flex gap-1">
              <Title>ADDRESS</Title>
              <span>서울시 동작구 노량진로 120 (주)대성학력개발연구소</span>
            </div>
            <div className="flex gap-1">
              <Title>help@dsdo.co.kr</Title>
            </div>
            <div className="flex gap-1">
              <Title>통신판매신고번호</Title>
              <span>
                제2015-서울동작-0020호{" "}
                <Link href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=1088166057">
                  <strong> {"[정보조회]"}</strong>
                </Link>
              </span>
            </div>
            <div className="flex gap-1">
              <Title>사업자등록번호</Title>
              <strong>I</strong>
              <Title>개인정보관리 책임자 김재현</Title>
            </div>
          </div>
          <div className="flex h-[180px] flex-col justify-between gap-1 text-right">
            <div className="text-[#AAAAAA])] mb-[40px] flex gap-[35px] text-[15px] font-bold">
              <span>
                <Link href="https://dsdo.co.kr/pages/service/company-introduce.html">
                  회사소개
                </Link>
              </span>
              <span>
                <Link href="https://dsdo.co.kr/pages/service/use-terms.html">
                  이용약관
                </Link>
              </span>
              <span>
                <Link href="https://dsdo.co.kr/pages/service/privacy-policy.html">
                  개인정보처리방침
                </Link>
              </span>
              <span>
                <Link href="https://m.mimacstudy.com/mimac/reportMain.ds">
                  불법이용신고
                </Link>
              </span>
            </div>
            <div className="mb-[25px] flex flex-col gap-1">
              <span>
                <strong>[모의고사 구입 및 시행 문의]</strong> 02.812.8001~2
              </span>
              <span>
                <strong>[상담 시간]</strong> 평일09:30~11:30 / 12:30~16:30
              </span>
            </div>
            <div className="">
              <span>Copyright ⓒ 대성학력개발연구소, All rights reserved.</span>
            </div> */}
          {/* </div> */}
        </div>
      </footer>
    </>
  );
};
