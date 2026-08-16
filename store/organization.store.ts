import { create } from "zustand";

import organizationService from "@/services/organization.service";
import type {
  Organization,
  CreateOrganizationPayload,
  UpdateOrganizationPayload,
} from "@/types/organization.types";

interface OrganizationState {
  organizations: Organization[];

  loading: boolean;
  error: string | null;

  createOrganization: (
    payload: CreateOrganizationPayload,
  ) => Promise<Organization | null>;

  getOrganizations: () => void;
  updateOrganization: (
    id: string,
    payload: UpdateOrganizationPayload,
  ) => Promise<Organization | null>;
  deleteOrganization: (id: string) => Promise<boolean>;
  setLoading: (loading: boolean) => void;
  clearError: () => void;
}

const initialState = {
  organizations: [],
  loading: false,
  error: null,
};

export const useOrganizationStore = create<OrganizationState>((set) => ({
  ...initialState,

  /**
   * Create organization
   */
  createOrganization: async (payload) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const organization =
        await organizationService.create(payload);

      set((state) => ({
        organizations: [organization, ...state.organizations],
        currentOrganization: organization,
        creating: false,
      }));

      return organization;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create organization";

      set({
        loading: false,
        error: message,
      });

      return null;
    }
  },

  /**
   * Get all organizations
   */
  getOrganizations: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await organizationService.getAll();

      console.log(response.data);

      set({
        organizations: response.data,
        loading: false,
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch organizations";

      set({
        loading: false,
        error: message,
      });
    }
  },

  /**
   * Update organization
   */
  updateOrganization: async (id, payload) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const updatedOrganization = await organizationService.update(
        id,
        payload,
      );

      set((state) => ({
        organizations: state.organizations.map((organization) =>
          organization._id === id ? updatedOrganization : organization,
        ),
        loading: false,
      }));

      return updatedOrganization;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update organization";

      set({
        loading: false,
        error: message,
      });

      return null;
    }
  },

  /**
   * Delete organization
   */
  deleteOrganization: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      await organizationService.delete(id);

      set((state) => {
        const organizations = state.organizations.filter(
          (organization) => organization._id !== id,
        );


        return {
          organizations,
          loading: false,
        };
      });

      return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete organization";

      set({
        loading: false,
        error: message,
      });
      return false;
    }
  },

  /**
   * Set loading
   */
  setLoading: (loading) => {
    set({
      loading
    });
  },

  /**
   * Clear error
   */
  clearError: () => {
    set({
      error: null,
    });
  },
}));
