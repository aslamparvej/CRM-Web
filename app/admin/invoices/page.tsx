"use client";

import SearchInput from "@/components/common/SearchInput";
import StatusBadge from "@/components/common/StatusBadge";
import { Download } from "lucide-react";
import { useState } from "react";

const invoices = [
  {
    id: "INV-2408",
    client: "Northwind Traders",
    amount: "$348.00",
    status: "Paid",
    date: "Aug 2, 2026",
  },
  {
    id: "INV-2407",
    client: "Basalt Labs",
    amount: "$2,686.00",
    status: "Paid",
    date: "Aug 1, 2026",
  },
  {
    id: "INV-2406",
    client: "Vantage Point",
    amount: "$1,659.00",
    status: "Paid",
    date: "Jul 27, 2026",
  },
  {
    id: "INV-2405",
    client: "Kettlecorn",
    amount: "$232.00",
    status: "Overdue",
    date: "Jul 28, 2026",
  },
  {
    id: "INV-2404",
    client: "Argus Systems",
    amount: "$180.00",
    status: "Refunded",
    date: "Jul 20, 2026",
  },
  {
    id: "INV-2403",
    client: "Ferro & Co",
    amount: "$0.00",
    status: "Pending",
    date: "Jul 15, 2026",
  },
];

const statusTone = {
  Paid: "success",
  Overdue: "danger",
  Pending: "warning",
  Refunded: "neutral",
} as const;

const AdminInvoicesPage = () => {
  const [query, setQuery] = useState("");

  const filtered = invoices.filter(
    (inv) =>
      inv.client.toLowerCase().includes(query.toLowerCase()) ||
      inv.id.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="space-y-6">
      {/* <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search invoices or clients..."
        containerClassName="w-full max-w-xs"
      /> */}

      <div className="rounded-xl border border-border bg-card">
        {filtered.length === 0 ? (
          <div className="p-6">
            {/* <EmptyState
              icon={Receipt}
              title="No invoices found"
              description="Try a different search term."
            /> */}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="px-5 py-3 font-medium">Invoice</th>
                <th className="px-5 py-3 font-medium">Client</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-b border-border last:border-0 hover:bg-accent/50"
                >
                  <td className="px-5 py-3.5 font-data text-xs font-medium">
                    {inv.id}
                  </td>
                  <td className="px-5 py-3.5">{inv.client}</td>
                  <td className="px-5 py-3.5 font-data text-xs">
                    {inv.amount}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge
                      label={inv.status}
                      tone={statusTone[inv.status as keyof typeof statusTone]}
                    />
                  </td>
                  <td className="px-5 py-3.5 font-data text-xs text-muted-foreground">
                    {inv.date}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      aria-label="Download invoice"
                      className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminInvoicesPage;
