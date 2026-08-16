"use client";

import { useMemo } from "react";

import { useAuthStore } from "@/store/auth.store";

export function usePermission() {
  const { user } = useAuthStore();

  const role = user?.role;

  return useMemo(
    () => ({
      role,

      canAccessAdminPanel: role === "SUPER_ADMIN",

      canManageClients: role === "SUPER_ADMIN",

      canManagePlans: role === "SUPER_ADMIN",

      canManageSubscriptions: role === "SUPER_ADMIN",

      canViewAnalytics: [
        "SUPER_ADMIN",
        "ADMIN",
        "SUB_ADMIN",
      ].includes(role ?? ""),

      canManageUsers: [
        "SUPER_ADMIN",
        "ADMIN",
      ].includes(role ?? ""),

      canManageLeads: [
        "ADMIN",
        "SUB_ADMIN",
        "EXECUTIVE",
      ].includes(role ?? ""),

      canDeleteLeads: [
        "ADMIN",
        "SUB_ADMIN",
      ].includes(role ?? ""),

      canAssignLeads: [
        "ADMIN",
        "SUB_ADMIN",
      ].includes(role ?? ""),

      canManageSettings: [
        "SUPER_ADMIN",
        "ADMIN",
      ].includes(role ?? ""),

      canViewReports: [
        "SUPER_ADMIN",
        "ADMIN",
        "SUB_ADMIN",
      ].includes(role ?? ""),

      canManageTemplates: [
        "SUPER_ADMIN",
        "ADMIN",
      ].includes(role ?? ""),

      canSendWhatsApp: [
        "ADMIN",
        "SUB_ADMIN",
        "EXECUTIVE",
      ].includes(role ?? ""),

      canSendSMS: [
        "ADMIN",
        "SUB_ADMIN",
        "EXECUTIVE",
      ].includes(role ?? ""),

      canCreateFollowup: [
        "ADMIN",
        "SUB_ADMIN",
        "EXECUTIVE",
      ].includes(role ?? ""),

      canViewOwnLeads: role === "EXECUTIVE",
    }),
    [role]
  );
}