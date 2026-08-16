import axios from "@/lib/axios";

export type BillingPeriod = "monthly" | "yearly";
export type PlanVisibility = "public" | "draft";

export interface Plan {
  _id: string;
  name: string;
  description?: string;
  pricing: number;
  billingPeriod: BillingPeriod;
  currency: string;
  leadLimit: string; // "Unlimited" or a numeric string
  features: string[];
  visibility: PlanVisibility;
  isPopular: boolean;
  activeClients: number;
  createdAt: string;
  updatedAt: string;
}

export interface PlanResponse {
  success: boolean;
  data: Plan[];
  message: string;
}

export interface PlanCreationResponse {
  success: boolean;
  data: Plan;
  message: string;
}


export interface Limits {
  users: number;
  unlimitedUsers: boolean;
  leads: number;
  storageGB: number;
  messageTemplates: number;
}

export interface CreatePlanPayload {
  name: string;
  description?: string;
  pricing: number;
  currency: string;
  billingPeriod: BillingPeriod;
  limits: Limits;
  features: string[];
  trialDays: number;
  sortOrder: number;
  isPopular: boolean;
  visibility: PlanVisibility;
}

export type UpdatePlanPayload = Partial<CreatePlanPayload>;

const BASE_URL = "/plans";

export const planService = {
  /** GET /api/plans */
  async getPlans(): Promise<Plan[]> {
    const { data } = await axios.get<PlanResponse>(BASE_URL);
    return data.data;
  },

  /** GET /api/plans/:id */
  async getPlan(id: string): Promise<Plan> {
    const { data } = await axios.get<Plan>(`${BASE_URL}/${id}`);
    return data;
  },

  /** POST /api/plans */
  async createPlan(payload: CreatePlanPayload): Promise<Plan> {
    const { data } = await axios.post<PlanCreationResponse>(BASE_URL, payload);
    console.log(data);
    return data.data;
  },

  /** PATCH /api/plans/:id */
  async updatePlan(id: string, payload: UpdatePlanPayload): Promise<Plan> {
    const { data } = await axios.patch<Plan>(`${BASE_URL}/${id}`, payload);
    return data;
  },

  /** DELETE /api/plans/:id */
  async deletePlan(id: string): Promise<void> {
    await axios.delete(`${BASE_URL}/${id}`);
  },

  /** PATCH /api/plans/:id/visibility — quick publish/unpublish toggle */
  async setVisibility(id: string, visibility: PlanVisibility): Promise<Plan> {
    const { data } = await axios.patch<Plan>(`${BASE_URL}/${id}/visibility`, {
      visibility,
    });
    return data;
  },
};
