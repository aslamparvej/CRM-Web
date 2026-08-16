import { create } from "zustand";

import type { DashboardStats } from "@/types/dashboard.types";

interface DashboardStore {
  stats: DashboardStats | null;

  setStats: (stats: DashboardStats) => void;
}

export const useDashboardStore =
  create<DashboardStore>((set) => ({
    stats: null,

    setStats: (stats) =>
      set({ stats }),
  }));