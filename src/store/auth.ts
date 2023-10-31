import { create } from "zustand";
import Cookies from "js-cookie";

import User from "../types/user";
import { devtools } from "zustand/middleware";
import { TOKEN, USER } from "../constants";
import request from "../server";
import SingUp from "../types/signup";
import { NavigateFunction } from "react-router-dom";

interface AuthState {
  isAuthenticated: boolean;
  user: null | User;
  login: (values: User) => void;
  register: (values: SingUp, navigate: NavigateFunction) => void;
}

const useAuth = create<AuthState>()(
  devtools((set) => ({
    isAuthenticated: Boolean(Cookies.get(TOKEN)),
    user: localStorage.getItem(USER)
      ? JSON.parse(localStorage.getItem(USER) || "")
      : null,
    login: (user) => {
      set((state) => ({ ...state, isAuthenticated: true, user }));
    },
    register: async (values, navigate) => {
      const {
        data: { token, user },
      } = await request.post("auth/register", values);
      Cookies.set(TOKEN, token);
      localStorage.setItem(USER, JSON.stringify(user));
      set((state) => ({ ...state, isAuthenticated: true, user }));
      navigate("/login");
    },
  }))
);

export default useAuth;
