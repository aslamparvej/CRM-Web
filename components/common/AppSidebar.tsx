import { cn } from "@/lib/utils";
import { Activity, BarChart3, Bell, Calendar, CheckSquare, Clock, KanbanSquare, LayoutDashboard, MessageSquare, Plug, Settings, ShieldCheck, UserCog, UserPlus, Users, Workflow, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const groups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Sales",
    items: [
      { label: "Leads", href: "/app/leads", icon: UserPlus },
      { label: "Customers", href: "/app/customers", icon: Users },
      { label: "Pipeline", href: "/app/pipeline", icon: KanbanSquare },
      { label: "Follow-ups", href: "/app/followups", icon: Clock },
      { label: "Tasks", href: "/app/tasks", icon: CheckSquare },
      { label: "Activities", href: "/app/activities", icon: Activity },
      { label: "Calendar", href: "/app/calendar", icon: Calendar },
    ],
  },
  {
    label: "Insights",
    items: [{ label: "Reports", href: "/app/reports", icon: BarChart3 }],
  },
  {
    label: "Automation",
    items: [
      { label: "Automation", href: "/app/automation", icon: Workflow },
      {
        label: "Message templates",
        href: "/app/message-templates",
        icon: MessageSquare,
      },
      { label: "Notifications", href: "/app/notifications", icon: Bell },
    ],
  },
  {
    label: "Admin",
    items: [
      { label: "Users", href: "/app/users", icon: UserCog },
      { label: "Roles", href: "/app/roles", icon: ShieldCheck },
      { label: "Integrations", href: "/app/integrations", icon: Plug },
      { label: "Settings", href: "/app/settings", icon: Settings },
    ],
  },
];

const AppSidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border bg-background">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#EEB30D]">
          <span className="font-display text-sm font-bold text-[#15130B]">
            M
          </span>
        </span>
        <span className="font-display text-lg font-semibold tracking-tight">
          MyCRM
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <div className="space-y-6">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="px-3 font-data text-[11px] uppercase tracking-wider text-muted-foreground">
                {group.label}
              </p>
              <div className="mt-2 space-y-0.5">
                {group.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    pathname?.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border-l-2 border-transparent px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "border-l-[#EEB30D] bg-[#FDF3D9] font-medium text-[#8A5F06]"
                          : "text-foreground/70 hover:bg-accent hover:text-foreground",
                      )}
                    >
                      <item.icon
                        className="h-4 w-4 shrink-0"
                        strokeWidth={1.75}
                      />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-accent">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEB30D] font-data text-xs font-semibold text-[#15130B]">
            JD
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Jane Doe</p>
            <p className="truncate text-xs text-muted-foreground">
              jane@company.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
