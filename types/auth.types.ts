export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "SUB_ADMIN"
  | "EXECUTIVE"
  | "DEVELOPER";

export interface LoginPayload {
  email: string;
  password: string;
  remember: boolean;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  companyName: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken?: string;
    user: import("./user.types").User;
  };
}
