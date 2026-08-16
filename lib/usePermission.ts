/**
 * Two independent role systems:
 *  - Platform roles: staff who work in /admin (the SaaS operator's own team)
 *  - Tenant roles: end users who work in /app (a client's CRM users)
 *
 * A session belongs to exactly one scope. A platform session never has a
 * tenantId; a tenant session always does.
 */

export type PlatformRole = "super_admin" | "billing" | "support";
export type TenantRole = "owner" | "manager" | "agent";

export type SessionScope = "platform" | "tenant";

const platformHierarchy: PlatformRole[] = ["support", "billing", "super_admin"];
const tenantHierarchy: TenantRole[] = ["agent", "manager", "owner"];

/** True if `role` is at least as privileged as `minimum` within its hierarchy. */
export function hasAtLeastRole(
  role: PlatformRole | TenantRole,
  minimum: PlatformRole | TenantRole
): boolean {
  const hierarchy = platformHierarchy.includes(role as PlatformRole)
    ? platformHierarchy
    : tenantHierarchy;

  const roleIndex = hierarchy.indexOf(role as never);
  const minIndex = hierarchy.indexOf(minimum as never);

  if (roleIndex === -1 || minIndex === -1) return false;
  return roleIndex >= minIndex;
}

/**
 * Section-level access rules for the admin portal. Extend this as you add
 * more admin pages — it's the single source of truth for "who can see what."
 */
export const adminSectionAccess: Record<string, PlatformRole[]> = {
  "/admin/dashboard": ["support", "billing", "super_admin"],
  "/admin/clients": ["support", "billing", "super_admin"],
  "/admin/subscriptions": ["billing", "super_admin"],
  "/admin/plans": ["super_admin"],
  "/admin/invoices": ["billing", "super_admin"],
  "/admin/users": ["super_admin"],
};

export function canAccessAdminSection(role: PlatformRole, pathname: string): boolean {
  const rule = Object.entries(adminSectionAccess).find(([prefix]) =>
    pathname.startsWith(prefix)
  );
  if (!rule) return true; // no explicit rule = not restricted beyond being platform staff
  return rule[1].includes(role);
}