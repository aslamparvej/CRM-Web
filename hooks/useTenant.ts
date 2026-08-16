"use client";

import { useMemo } from "react";

import { useAuthStore } from "@/store/auth.store";

export function useTenant() {
  const { user } = useAuthStore();

  return useMemo(
    () => ({
      tenantId: user?.tenantId ?? null,

      companyName: user?.tenant?.companyName ?? "",

      plan: user?.tenant?.plan ?? "",

      subscriptionStatus:
        user?.tenant?.subscriptionStatus ?? "",

      logo: user?.tenant?.logo ?? "",

      isTrial:
        user?.tenant?.subscriptionStatus === "TRIAL",

      isActive:
        user?.tenant?.subscriptionStatus === "ACTIVE",

      isExpired:
        user?.tenant?.subscriptionStatus === "EXPIRED",

      hasTenant: !!user?.tenantId,
    }),
    [user]
  );
}