"use client";

import { useEffect, useState } from "react";

import { useAuthStore } from "@/store/auth.store";
import authService from "@/services/auth.service";
import { getToken } from "@/services/storage.service";

import Loader from "../common/Loader";

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const [loading, setLoading] = useState(true);

  const { login, logout } = useAuthStore();

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = getToken();

        if (!accessToken) {
          setLoading(false);
          return;
        }

        const response = await authService.me(accessToken);
        console.log("AuthProvider response:", response);

        if (!response.success) {
          logout();
          return;
        }

        login(response.data, accessToken);
      } catch (error) {
        console.error("Error during authentication:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [login, logout]);

  if (loading) {
    return <Loader />;
  }

  return children;
}
