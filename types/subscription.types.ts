export interface Subscription {
  id: string;

  tenantId: string;

  planId: string;

  planName: string;

  billingCycle:
    | "MONTHLY"
    | "YEARLY";

  amount: number;

  currency: string;

  status:
    | "ACTIVE"
    | "TRIAL"
    | "EXPIRED"
    | "CANCELLED";

  startedAt: string;

  expiresAt: string;

  nextBillingDate?: string;
}