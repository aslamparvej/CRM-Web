export interface DashboardStats {
  totalLeads: number;

  activeLeads: number;

  wonLeads: number;

  lostLeads: number;

  followUps: number;

  users: number;

  revenue: number;

  conversionRate: number;
}

export interface MonthlyAnalytics {
  month: string;

  leads: number;

  sales: number;

  revenue: number;
}

export interface Activity {
  id: string;

  title: string;

  description: string;

  createdAt: string;

  type:
    | "LOGIN"
    | "LEAD"
    | "FOLLOWUP"
    | "USER"
    | "SYSTEM";
}