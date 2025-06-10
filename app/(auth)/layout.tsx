"use client";
import RecoilRootProvider from "@/components/Commons/RecoilProvider/RecoilProvider";
import { Header } from "./isbn/_components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="mx-auto flex min-h-[calc(100vh-400px)] w-[1200px] justify-center">
        {children}
      </div>
    </div>
  );
}
