import { create } from "zustand";

import type { Lead } from "@/types/lead.types";

interface LeadStore {
  leads: Lead[];

  setLeads: (leads: Lead[]) => void;

  addLead: (lead: Lead) => void;

  updateLead: (lead: Lead) => void;

  deleteLead: (id: string) => void;
}

export const useLeadStore = create<LeadStore>((set) => ({
  leads: [],

  setLeads: (leads) =>
    set({ leads }),

  addLead: (lead) =>
    set((state) => ({
      leads: [...state.leads, lead],
    })),

  updateLead: (lead) =>
    set((state) => ({
      leads: state.leads.map((l) =>
        l.id === lead.id ? lead : l
      ),
    })),

  deleteLead: (id) =>
    set((state) => ({
      leads: state.leads.filter((l) => l.id !== id),
    })),
}));