"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import AppSidebar from "@/components/common/AppSidebar";
import Header from "@/components/common/Header";
import { X } from "lucide-react";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const data = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-data",
  weight: ["400", "500"],
  display: "swap",
});

const titles: Record<string, string> = {
  "/app/dashboard": "Dashboard",
  "/app/leads": "Leads",
  "/app/customers": "Customers",
  "/app/followups": "Follow-ups",
  "/app/activities": "Activities",
  "/app/calendar": "Calendar",
  "/app/users": "Team",
  "/app/roles": "Roles & Permissions",
  "/app/notifications": "Notifications",
  "/app/settings": "Settings",
  "/app/profile": "Profile",
};

function resolveTitle(pathname: string | null) {
  if (!pathname) return "MyCRM";
  const match = Object.keys(titles).find((key) => pathname.startsWith(key));
  return match ? titles[match] : "MyCRM";
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className={cn(display.variable, data.variable, "flex min-h-screen")}>
      <div className="hidden lg:block">
        <AppSidebar />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative flex">
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="absolute -right-10 top-4 rounded-md p-1.5 text-white/80 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <AppSidebar />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          title={resolveTitle(pathname)}
          onMenuClick={() => setMobileOpen(true)}
        />
        <main className="flex-1 overflow-y-auto bg-background p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
