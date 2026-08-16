export type BillingPeriod = "monthly" | "yearly";
export type PlanVisibility = "public" | "draft";

export interface Plan {
  id: string;
  name: string;
  code: string;
  price: number;
  billingCycle: "monthly" | "yearly";
  maxUsers: number;
  maxLeads: number;
  storage: number;
  features: string[];
  isPopular: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  visibility: PlanVisibility;
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