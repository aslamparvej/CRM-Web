"use client";

import { cn } from "@/lib/utils";
import {
    ArrowLeft,
  Building2,
  CreditCard,
  Layers,
  LayoutDashboard,
  type LucideIcon,
  Receipt,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuthStore } from "@/store/auth.store";
import { ROLE } from "@/utils/Role";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Clients", href: "/admin/clients", icon: Building2 },
  { label: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
  { label: "Plans", href: "/admin/plans", icon: Layers },
  { label: "Invoices", href: "/admin/invoices", icon: Receipt },
  { label: "Users", href: "/admin/users", icon: UserCog },
];

const Sidebar = () => {
  const pathname = usePathname();
  const {user} = useAuthStore();
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col bg-[#15130B] text-white">
      <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
        <div className="leading-tight">
          <p className="font-display text-sm font-semibold tracking-tight">
            AFS <span className="text-primary">Desk</span>
          </p>
          <p className="font-data text-[10px] uppercase tracking-wider text-white/40">
            {ROLE[user?.role?.toUpperCase() as keyof typeof ROLE] || "Unknown Role"}
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <p className="px-3 font-data text-[11px] uppercase tracking-wider text-white/30">
          Platform
        </p>
        <div className="mt-2 space-y-0.5">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg border-l-2 border-transparent px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "border-l-[#EEB30D] bg-white/6 font-medium text-[#EEB30D]"
                    : "text-white/60 hover:bg-white/4 hover:text-white",
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-white/10 p-4">
        <Link
          href="/app/dashboard"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/50 hover:bg-white/4 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to CRM
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
