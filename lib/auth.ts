import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  SUB_ADMIN = "SUB_ADMIN",
  EXECUTIVE = "EXECUTIVE",
  DEVELOPER = "DEVELOPER",
}

export interface AuthUser {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  role: UserRole;
}

interface JwtPayload extends AuthUser {
  exp: number;
  iat: number;
}

export async function getAccessToken() {
  const cookieStore = await cookies();

  return cookieStore.get("accessToken")?.value;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const token = await getAccessToken();

  if (!token) return null;

  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();

  return !!user;
}

export async function hasRole(...roles: UserRole[]) {
  const user = await getCurrentUser();

  if (!user) return false;

  return roles.includes(user.role);
}

export async function isSuperAdmin() {
  return hasRole(UserRole.SUPER_ADMIN);
}

export async function isAdmin() {
  return hasRole(UserRole.ADMIN);
}

export async function isSubAdmin() {
  return hasRole(UserRole.SUB_ADMIN);
}

export async function isExecutive() {
  return hasRole(UserRole.EXECUTIVE);
}

export async function isDeveloper() {
  return hasRole(UserRole.DEVELOPER);
}