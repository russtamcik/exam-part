import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import request from "../server";
import User from "../types/user";
import { LIMIT, USER } from "../constants";
import Messages from "../types/messages";

interface MessagesState {
  user: null | User;
  messages: Messages[];
  loading: boolean;
  total: number;
  page: number;
  isModalOpen: boolean;
  modalLoading: boolean;
  selected: null | string;
  search: string;
  getMessages: () => void;
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

const useMessages = create<MessagesState>()(
  devtools(
    immer((set, get) => ({
      user: localStorage.getItem(USER)
        ? JSON.parse(localStorage.getItem(USER) || "")
        : null,
      messages: [],
      loading: false,
      isModalOpen: false,
      modalLoading: false,
      selected: null,
      total: 0,
      page: 1,
      search: "",

      getMessages: async () => {
        try {
          set((state) => {
            state.loading = true;
          });
          const {
            data: { pagination, data },
          } = await request.get("messages", {
            params: {
              page: get().page,
              limit: LIMIT,
              search: get().search,
              user: userId?._id,
            },
          });
          set((state) => {
            state.messages = data;
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
        get().getMessages();
      },
      setPage: (page) => {
        set((state) => {
          state.page = page;
        });
        get().getMessages();
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

export default useMessages;
