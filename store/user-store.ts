import {create} from "zustand";
import {UserSafe} from "@/src/components/user/model";

type UserStoreState = {
  user: UserSafe | null;
  setUser: (user: UserSafe | null) => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  setUser: (user) => set({user}),
}))
