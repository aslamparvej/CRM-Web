import type { UserRole } from "./auth.types";

export interface User {
  _id: string;
  organizationId?: string;

  name: string;
  email: string;
  phone?: string;

  avatar?: string;
  role: UserRole;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  designation: string | null;
}

export interface UserQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
}

