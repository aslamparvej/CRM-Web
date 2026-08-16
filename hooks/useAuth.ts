"use client";

import { useMemo } from "react";

import { useAuthStore } from "@/store/auth.store";

export function useAuth() {
  const {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    login,
    logout,
    setUser,
  } = useAuthStore();

  return useMemo(
    () => ({
      user,
      accessToken,
      isAuthenticated,
      isLoading,

      login,
      logout,
      setUser,

      isSuperAdmin: user?.role === "SUPER_ADMIN",
      isAdmin: user?.role === "ADMIN",
      isSubAdmin: user?.role === "SUB_ADMIN",
      isExecutive: user?.role === "EXECUTIVE",
      isDeveloper: user?.role === "DEVELOPER",
    }),
    [
      user,
      accessToken,
      isAuthenticated,
      isLoading,
      login,
      logout,
      setUser,
    ]
  );
}