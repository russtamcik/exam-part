import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { LIMIT, USER } from "../constants";

import request from "../server";
import User from "../types/user";
import Education from "../types/education";

interface EducationState {
  user: null | User;
  education: Education[];
  loading: boolean;
  total: number;
  page: number;
  isModalOpen: boolean;
  modalLoading: boolean;
  selected: null | string;
  search: string;
  getEducation: () => void;
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

const useEducation = create<EducationState>()(
  devtools(
    immer((set, get) => ({
      user: localStorage.getItem(USER)
        ? JSON.parse(localStorage.getItem(USER) || "")
        : null,
      education: [],
      loading: false,
      isModalOpen: false,
      modalLoading: false,
      selected: null,
      total: 0,
      page: 1,
      search: "",

      getEducation: async () => {
        try {
          // set((state) => ({ ...state, loading: true }));
          set((state) => {
            state.loading = true;
          });
          const {
            data: { pagination, data },
          } = await request.get("education", {
            params: {
              page: get().page,
              limit: LIMIT,
              search: get().search,
              // user: "6537b00efd51940018b21314",
              user: userId?._id,
            },
          });
          // set((state) => ({
          //   ...state,
          //   skills: data,
          //   total: pagination.total,
          //   loading: false,
          // }));
          set((state) => {
            state.education = data;
            state.total = pagination.total;
            state.loading = false;
          });
        } finally {
          // set((state) => ({ ...state, loading: false }));
          set((state) => {
            state.loading = false;
          });
        }
      },
      setSearch: (search) => {
        // set((state) => ({ ...state, search }));
        set((state) => {
          state.search = search;
        });
        get().getEducation();
      },
      setPage: (page) => {
        // set((state) => ({ ...state, page }));
        set((state) => {
          state.page = page;
        });
        get().getEducation();
      },
      controlModal: (data) => {
        // set((state) => ({ ...state, isModalOpen: data }));
        set((state) => {
          state.isModalOpen = data;
        });
      },
      showModal: () => {
        get().controlModal(true);
        get().setSelected(null);
      },
      setUser: (user) => {
        // set((state) => ({ ...state, user }));
        set((state) => {
          state.user = user;
        });
      },
      setSelected: (selected) => {
        // set((state) => ({ ...state, selected }));
        set((state) => {
          state.selected = selected;
        });
      },
      setModalLoading: (data) => {
        // set((state) => ({ ...state, modalLoading: data }));
        set((state) => {
          state.modalLoading = data;
        });
      },
    }))
  )
);

export default useEducation;
