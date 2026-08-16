import { create } from "zustand";

import {
  planService,
  Plan,
  CreatePlanPayload,
  UpdatePlanPayload,
} from "@/services/plan.service";

interface PlanStore {
  plans: Plan[];
  selectedPlan: Plan | null;
  loading: boolean;
  error: string | null;

  fetchPlans: () => Promise<void>;
  fetchPlan: (id: string) => Promise<void>;
  createPlan: (payload: CreatePlanPayload) => Promise<Plan>;
  updatePlan: (id: string, payload: UpdatePlanPayload) => Promise<Plan>;
  deletePlan: (id: string) => Promise<void>;
  setVisibility: (id: string, visibility: Plan["visibility"]) => Promise<void>;
  setSelectedPlan: (plan: Plan | null) => void;
  clearError: () => void;
}

export const usePlanStore = create<PlanStore>((set, get) => ({
  plans: [],
  selectedPlan: null,
  loading: false,
  error: null,

  async fetchPlans() {
    set({ loading: true, error: null });
    try {
      const plans = await planService.getPlans();
      set({ plans, loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err instanceof Error ? err.message : "Failed to load plans",
      });
    }
  },

  async fetchPlan(id) {
    set({ loading: true, error: null });
    try {
      const plan = await planService.getPlan(id);
      set({ selectedPlan: plan, loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err instanceof Error ? err.message : "Failed to load plan",
      });
    }
  },

  async createPlan(payload) {
    set({ loading: true, error: null });
    try {
      const plan = await planService.createPlan(payload);
      console.log(plan);
      set((state) => ({ plans: [...state.plans, plan], loading: false }));
      return plan;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create plan";
      set({ loading: false, error: message });
      throw err;
    }
  },

  async updatePlan(id, payload) {
    set({ loading: true, error: null });
    try {
      const updated = await planService.updatePlan(id, payload);
      set((state) => ({
        plans: state.plans.map((p) => (p._id === id ? updated : p)),
        selectedPlan:
          state.selectedPlan?. _id === id ? updated : state.selectedPlan,
        loading: false,
      }));
      return updated;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update plan";
      set({ loading: false, error: message });
      throw err;
    }
  },

  async deletePlan(id) {
    const previous = get().plans;
    // optimistic removal
    set({ plans: previous.filter((p) => p._id !== id) });
    try {
      await planService.deletePlan(id);
    } catch (err) {
      // roll back on failure
      set({
        plans: previous,
        error: err instanceof Error ? err.message : "Failed to delete plan",
      });
    }
  },

  async setVisibility(id, visibility) {
    const previous = get().plans;
    set({
      plans: previous.map((p) => (p._id === id ? { ...p, visibility } : p)),
    });
    try {
      await planService.setVisibility(id, visibility);
    } catch (err) {
      set({
        plans: previous,
        error:
          err instanceof Error ? err.message : "Failed to update visibility",
      });
    }
  },

  setSelectedPlan(plan) {
    set({ selectedPlan: plan });
  },

  clearError() {
    set({ error: null });
  },
}));
