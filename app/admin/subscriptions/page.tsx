import StatusBadge from "@/components/common/StatusBadge";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Subscriptions",
};

const subscriptions = [
  {
    client: "Northwind Traders",
    plan: "Growth",
    seats: 12,
    amount: "$348.00",
    renews: "Sep 2, 2026",
    status: "Active",
  },
  {
    client: "Basalt Labs",
    plan: "Scale",
    seats: 34,
    amount: "$2,686.00",
    renews: "Sep 1, 2026",
    status: "Active",
  },
  {
    client: "Ferro & Co",
    plan: "Starter",
    seats: 3,
    amount: "$0.00",
    renews: "Trial ends Aug 13, 2026",
    status: "Trial",
  },
  {
    client: "Kettlecorn",
    plan: "Growth",
    seats: 8,
    amount: "$232.00",
    renews: "Overdue since Jul 28, 2026",
    status: "Past due",
  },
  {
    client: "Vantage Point",
    plan: "Scale",
    seats: 21,
    amount: "$1,659.00",
    renews: "Aug 27, 2026",
    status: "Active",
  },
  {
    client: "Argus Systems",
    plan: "Growth",
    seats: 5,
    amount: "$0.00",
    renews: "Cancelled",
    status: "Cancelled",
  },
];

const statusTone = {
  Active: "success",
  Trial: "info",
  "Past due": "danger",
  Cancelled: "neutral",
} as const;

const summary = [
  { label: "Active", value: "1,196" },
  { label: "Trialing", value: "58" },
  { label: "Past due", value: "9" },
  { label: "Cancelled this month", value: "14" },
];

const AdminSubscriptionsPage = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {summary.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border bg-card p-4"
          >
            <p className="font-display text-xl font-semibold">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="px-5 py-3 font-medium">Client</th>
              <th className="px-5 py-3 font-medium">Plan</th>
              <th className="px-5 py-3 font-medium">Seats</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Renewal</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr
                key={sub.client}
                className="border-b border-border last:border-0 hover:bg-accent/50"
              >
                <td className="px-5 py-3.5 font-medium">{sub.client}</td>
                <td className="px-5 py-3.5 text-muted-foreground">
                  {sub.plan}
                </td>
                <td className="px-5 py-3.5 font-data text-xs text-muted-foreground">
                  {sub.seats}
                </td>
                <td className="px-5 py-3.5 font-data text-xs">{sub.amount}</td>
                <td className="px-5 py-3.5 text-xs text-muted-foreground">
                  {sub.renews}
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge
                    label={sub.status}
                    tone={statusTone[sub.status as keyof typeof statusTone]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSubscriptionsPage;
