import { cookies } from "next/headers";

import type { Tenant } from "@/types/organization.types";
import { getCurrentUser } from "./auth";

export async function getTenantId(): Promise<string | null> {
  const user = await getCurrentUser();

  return user?.tenantId ?? null;
}

export async function getTenant(): Promise<Tenant | null> {
  const user = await getCurrentUser();

  return user?.tenant ?? null;
}

export async function getTenantName() {
  const tenant = await getTenant();

  return tenant?.companyName ?? null;
}

export async function getTenantPlan() {
  const tenant = await getTenant();

  return tenant?.plan ?? null;
}

export async function isTenantActive() {
  const tenant = await getTenant();

  return tenant?.subscriptionStatus === "ACTIVE";
}

export async function isTrialTenant() {
  const tenant = await getTenant();

  return tenant?.subscriptionStatus === "TRIAL";
}

export async function isExpiredTenant() {
  const tenant = await getTenant();

  return tenant?.subscriptionStatus === "EXPIRED";
}

export async function setTenantCookie(
  tenantId: string
) {
  const cookieStore = await cookies();

  cookieStore.set("tenantId", tenantId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function getTenantCookie() {
  const cookieStore = await cookies();

  return cookieStore.get("tenantId")?.value ?? null;
}

export async function removeTenantCookie() {
  const cookieStore = await cookies();

  cookieStore.delete("tenantId");
}