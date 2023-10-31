import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import Experience from "../types/experience";
import request from "../server";
import User from "../types/user";
import { LIMIT, USER } from "../constants";

interface ExperienceState {
  user: null | User;
  experience: Experience[];
  loading: boolean;
  total: number;
  page: number;
  isModalOpen: boolean;
  modalLoading: boolean;
  selected: null | string;
  search: string;
  getExperience: () => void;
  setPage: (page: number) => void;
  controlModal: (data: boolean) => void;
  showModal: () => void;
  setUser: (user: User) => void;
  setSelected: (selected: null | string) => void;
  setModalLoading: (data: boolean) => void;
  setSearch: (search: string) => void;
}

const userId = localStorage.getItem("PORTFOLIO_USER")
  ? JSON.parse(localStorage.getItem("PORTFOLIO_USER") || "")
  : null;

const useExperience = create<ExperienceState>()(
  devtools(
    immer((set, get) => ({
      user: localStorage.getItem(USER)
        ? JSON.parse(localStorage.getItem(USER) || "")
        : null,
      experience: [],
      loading: false,
      isModalOpen: false,
      modalLoading: false,
      selected: null,
      total: 0,
      page: 1,
      search: "",
      getExperience: async () => {
        try {
          set((state) => {
            state.loading = true;
          });
          const {
            data: { pagination, data },
          } = await request.get("experiences", {
            params: {
              page: get().page,
              limit: LIMIT,
              search: get().search,
              user: userId?._id,
            },
          });
          set((state) => {
            state.experience = data;
            state.total = pagination.total;
            state.loading = false;
          });
        } finally {
          set((state) => {
            state.loading = false;
          });
        }
      },
      setSearch: (search) => {
        set((state) => {
          state.search = search;
        });
        get().getExperience();
      },
      setPage: (page) => {
        set((state) => {
          state.page = page;
        });
        get().getExperience();
      },
      controlModal: (data) => {
        set((state) => {
          state.isModalOpen = data;
        });
      },
      showModal: () => {
        get().controlModal(true);
        get().setSelected(null);
      },
      setUser: (user) => {
        set((state) => {
          state.user = user;
        });
      },
      setSelected: (selected) => {
        set((state) => {
          state.selected = selected;
        });
      },
      setModalLoading: (data) => {
        set((state) => {
          state.modalLoading = data;
        });
      },
    }))
  )
);

export default useExperience;
