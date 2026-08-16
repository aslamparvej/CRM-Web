export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "FOLLOW_UP"
  | "QUALIFIED"
  | "WON"
  | "LOST";

export type LeadPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH";

export interface Lead {
  id: string;

  tenantId: string;

  assignedTo?: string;

  name: string;
  email?: string;
  phone: string;

  source?: string;

  category?: string;

  priority: LeadPriority;

  status: LeadStatus;

  notes?: string;

  createdAt: string;

  updatedAt: string;
}