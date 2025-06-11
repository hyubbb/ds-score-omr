import type { Metadata } from "next";
import "./globals.css";
import RecoilRootProvider from "@/components/Commons/RecoilProvider/RecoilProvider";
import { PopupComponent } from "@/components/Commons/PopupComponent";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const metadata: Metadata = {
  title: "시험성적 입력 프로그램",
  description: "시험성적 입력 프로그램",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <meta
        name="viewport"
        content="initial-scale=1.0; maximum-scale=1.0; minimum-scale=1.0; user-scalable=no;"
      />
      <RecoilRootProvider>
        <body>
          <PopupComponent />
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </body>
      </RecoilRootProvider>
    </html>
  );
}
