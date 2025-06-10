"use client";

import { RecoilRoot } from "recoil";

import {
  dehydrate,
  HydrationBoundary,
  QueryClientProvider,
} from "@tanstack/react-query";
import { queryClient } from "@/libs/utils/query/queryClient";
import RecoilNexus from "recoil-nexus";
export default function RecoilRootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [queryClient] = useState(() => new QueryClient());
  const dehydratedState = dehydrate(queryClient);
  return (
    <RecoilRoot>
      <RecoilNexus />
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          {children}
        </HydrationBoundary>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
