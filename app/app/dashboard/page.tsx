import StatusBadge from "@/components/common/StatusBadge";
import { Clock, DollarSign, TrendingUp, UserPlus } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const stats = [
  {
    label: "Open pipeline",
    value: "$212,400",
    delta: "+12%",
    icon: DollarSign,
  },
  { label: "Active leads", value: "184", delta: "+8%", icon: UserPlus },
  { label: "Win rate (30d)", value: "31%", delta: "+3pt", icon: TrendingUp },
  { label: "Due today", value: "7", delta: "3 overdue", icon: Clock },
];

const pipelineStages = [
  { label: "New", sublabel: "42 leads" },
  { label: "Contacted", sublabel: "28 leads" },
  { label: "Qualified", sublabel: "16 leads" },
  { label: "Proposal", sublabel: "9 leads" },
  { label: "Won", sublabel: "$84,200" },
];

const attention = [
  {
    name: "Acme Co",
    note: "Proposal sent 6 days ago, no reply",
    status: "Stalled",
  },
  {
    name: "J. Alvarez",
    note: "Demo scheduled, follow-up due today",
    status: "Due today",
  },
  {
    name: "Bright Robotics",
    note: "Stalled in Qualified for 11 days",
    status: "Stalled",
  },
  { name: "Kettlecorn", note: "Invoice overdue by 3 days", status: "Overdue" },
];

const statusTone = {
  Stalled: "warning",
  "Due today": "info",
  Overdue: "danger",
} as const;

const AppDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <stat.icon className="h-4 w-4 text-[#8A5F06]" />
              <span className="font-data text-xs text-muted-foreground">
                {stat.delta}
              </span>
            </div>
            <p className="mt-4 font-display text-2xl font-semibold">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <p className="font-data text-xs uppercase tracking-wider text-muted-foreground">
          Your pipeline
        </p>
        {/* <PipelineRail
          stages={pipelineStages}
          activeIndex={3}
          className="mt-6"
        /> */}
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h2 className="font-display text-base font-semibold">
            Needs attention
          </h2>
        </div>
        <div className="divide-y divide-border">
          {attention.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between px-5 py-4"
            >
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.note}</p>
              </div>
              <StatusBadge
                label={item.status}
                tone={statusTone[item.status as keyof typeof statusTone]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppDashboard;
