"use client";

import EmptyState from "@/components/common/EmptyState";
import SearchInput from "@/components/common/SearchInput";
import StatusBadge from "@/components/common/StatusBadge";
import { MoreHorizontal, Users } from "lucide-react";
import { useState } from "react";

const customers = [
  {
    name: "M. Duarte",
    company: "Argus Systems",
    value: "$18,200",
    status: "Active",
    owner: "Marco Diehl",
    lastActivity: "Today",
  },
  {
    name: "L. Fenwick",
    company: "Northwind Traders",
    value: "$9,400",
    status: "Active",
    owner: "Priya Nair",
    lastActivity: "Yesterday",
  },
  {
    name: "P. Serrano",
    company: "Basalt Labs",
    value: "$42,600",
    status: "Active",
    owner: "Aisha Rahman",
    lastActivity: "2 days ago",
  },
  {
    name: "H. Okonkwo",
    company: "Ferro & Co",
    value: "$3,100",
    status: "At risk",
    owner: "Marco Diehl",
    lastActivity: "14 days ago",
  },
  {
    name: "C. Bianchi",
    company: "Vantage Point",
    value: "$27,800",
    status: "Active",
    owner: "Priya Nair",
    lastActivity: "5 days ago",
  },
];

const statusTone = {
  Active: "success",
  "At risk": "warning",
  Churned: "danger",
} as const;

const CustomerPage = () => {
  const [query, setQuery] = useState("");

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.company.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="space-y-6">
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search customers..."
        containerClassName="w-full max-w-xs"
      />

      <div className="rounded-xl border border-border bg-card">
        {filtered.length === 0 ? (
          <div className="p-6">
            <EmptyState
              icon={Users}
              title="No customers found"
              description="Customers appear here automatically once a lead is marked Won."
            />
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Company</th>
                <th className="px-5 py-3 font-medium">Lifetime value</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Owner</th>
                <th className="px-5 py-3 font-medium">Last activity</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer) => (
                <tr
                  key={customer.name}
                  className="border-b border-border last:border-0 hover:bg-accent/50"
                >
                  <td className="px-5 py-3.5 font-medium">{customer.name}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    {customer.company}
                  </td>
                  <td className="px-5 py-3.5 font-data text-xs">
                    {customer.value}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge
                      label={customer.status}
                      tone={
                        statusTone[customer.status as keyof typeof statusTone]
                      }
                    />
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    {customer.owner}
                  </td>
                  <td className="px-5 py-3.5 font-data text-xs text-muted-foreground">
                    {customer.lastActivity}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      aria-label="Row actions"
                      className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      <MoreHorizontal className="h-4 w-4" />
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

export default CustomerPage;
