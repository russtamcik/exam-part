import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import request from "../server";

import Accaunt from "../types/accaunt";

interface AccountState {
  accData: Accaunt[];
  loading: boolean;
  getAccData: () => void;
}

const useAccountMe = create<AccountState>()(
  devtools(
    immer((set) => ({
      accData: [],
      loading: false,
      getAccData: async () => {
        try {
          set((state) => {
            state.loading = true;
          });
          const { data } = await request.get("auth/me");
          set((state) => {
            state.accData = data;
            state.loading = false;
          });
        } finally {
          set((state) => {
            state.loading = false;
          });
        }
      },
    }))
  )
);

export default useAccountMe;
