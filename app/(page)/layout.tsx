import "@/app/globals.css";
import { Footer } from "@/components/Commons/Footer/Footer";
import { Header } from "@/components/Commons/Header/Header";
import GlobalErrorHandler from "@/libs/providers/GlobalErrorHandler";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <GlobalErrorHandler />
      <div className="scrollbar-none w-full overflow-x-auto">
        <div className="mx-auto flex min-w-max justify-center">
          <div className="mx-10 flex min-h-[calc(100vh-300px)] w-full justify-center">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
