import StatusBadge from "@/components/common/StatusBadge";
import { AlertTriangle, Building2, DollarSign, TrendingUp } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

const stats = [
  {
    label: "Total clients",
    value: "1,284",
    delta: "+42 this month",
    icon: Building2,
  },
  { label: "MRR", value: "$91,420", delta: "+6.2%", icon: DollarSign },
  {
    label: "Active subscriptions",
    value: "1,196",
    delta: "+3.1%",
    icon: TrendingUp,
  },
  {
    label: "Failed payments",
    value: "9",
    delta: "Needs review",
    icon: AlertTriangle,
  },
];

const statusTone = {
  Active: "success",
  Trial: "info",
  "Past due": "danger",
  Suspended: "neutral",
} as const;

const recentClients = [
  {
    name: "Northwind Traders",
    plan: "Growth",
    status: "Active",
    joined: "Aug 2, 2026",
  },
  {
    name: "Basalt Labs",
    plan: "Scale",
    status: "Active",
    joined: "Aug 1, 2026",
  },
  {
    name: "Ferro & Co",
    plan: "Starter",
    status: "Trial",
    joined: "Jul 30, 2026",
  },
  {
    name: "Kettlecorn",
    plan: "Growth",
    status: "Past due",
    joined: "Jul 28, 2026",
  },
  {
    name: "Vantage Point",
    plan: "Scale",
    status: "Active",
    joined: "Jul 27, 2026",
  },
];

const AdminDashboardPage = () => {
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

      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-base font-semibold">
            Recent clients
          </h2>
          <a
            href="/admin/clients"
            className="text-sm font-medium text-[#8A5F06] hover:underline"
          >
            View all
          </a>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="px-5 py-3 font-medium">Client</th>
              <th className="px-5 py-3 font-medium">Plan</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {recentClients.map((client) => (
              <tr
                key={client.name}
                className="border-b border-border last:border-0"
              >
                <td className="px-5 py-3.5 font-medium">{client.name}</td>
                <td className="px-5 py-3.5 text-muted-foreground">
                  {client.plan}
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge
                    label={client.status}
                    tone={statusTone[client.status as keyof typeof statusTone]}
                  />
                </td>
                <td className="px-5 py-3.5 font-data text-xs text-muted-foreground">
                  {client.joined}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
