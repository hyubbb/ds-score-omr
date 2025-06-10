import "@/app/globals.css";
import { Footer } from "@/components/Commons/Footer/Footer";
import { Header } from "@/components/Commons/Header/Header";
import GlobalErrorHandler from "@/libs/providers/GlobalErrorHandler";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <GlobalErrorHandler />
      <div className="flex w-full justify-center">
        <div className="flex min-h-[calc(100vh-300px)] w-[1400px] justify-center px-10">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}
