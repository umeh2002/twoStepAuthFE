import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const userState: any = atom({
  key: "userState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const user: any = atom({
  key: "user",
  default: "" || null || undefined,
  effects_UNSTABLE: [persistAtom],
});