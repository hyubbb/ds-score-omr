import { JSX } from "react";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "recoil-persist-atom",
  storage: sessionStorage,
});

export const downloadModeState = atom<{
  mode: string;
}>({
  key: "downloadModeState",
  default: {
    mode: "exam",
  },
  effects_UNSTABLE: [persistAtom],
});
