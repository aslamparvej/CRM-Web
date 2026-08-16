import { create } from "zustand";

import type { User } from "@/types/user.types";
import { removeToken } from "@/services/storage.service";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;

  user: User | null;

  isAuthenticated: boolean;
  isLoading: boolean;

  login: (
    user: User,
    accessToken: string,
    refreshToken?: string
  ) => void;

  logout: () => void;

  setUser: (user: User) => void;

  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,

  user: null,

  isAuthenticated: false,
  isLoading: false,

  login: (user, accessToken, refreshToken) =>
    set({
      user,
      accessToken,
      refreshToken: refreshToken ?? null,
      isAuthenticated: true,
    }),

  logout: () => {
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    })
    removeToken();
  },

  setUser: (user) =>
    set({ user }),

  setLoading: (loading) =>
    set({ isLoading: loading }),
}));