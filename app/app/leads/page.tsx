"use client";

import EmptyState from "@/components/common/EmptyState";
import SearchInput from "@/components/common/SearchInput";
import StatusBadge from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus, UserPlus } from "lucide-react";
import { useState } from "react";

const leads = [
  {
    name: "J. Alvarez",
    company: "Bright Robotics",
    stage: "Proposal",
    source: "Referral",
    owner: "Priya Nair",
    created: "Aug 3, 2026",
  },
  {
    name: "S. Kimura",
    company: "Acme Co",
    stage: "Qualified",
    source: "Website",
    owner: "Marco Diehl",
    created: "Aug 2, 2026",
  },
  {
    name: "R. Osei",
    company: "Kettlecorn",
    stage: "Contacted",
    source: "Cold outreach",
    owner: "Priya Nair",
    created: "Aug 1, 2026",
  },
  {
    name: "T. Novak",
    company: "Vantage Point",
    stage: "New",
    source: "Website",
    owner: "Aisha Rahman",
    created: "Jul 31, 2026",
  },
  {
    name: "M. Duarte",
    company: "Argus Systems",
    stage: "Won",
    source: "Referral",
    owner: "Marco Diehl",
    created: "Jul 28, 2026",
  },
];

const stageTone = {
  New: "neutral",
  Contacted: "info",
  Qualified: "warning",
  Proposal: "warning",
  Won: "success",
} as const;

const LeadsPage = () => {
  const [query, setQuery] = useState("");

  const filtered = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(query.toLowerCase()) ||
      l.company.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search leads..."
          containerClassName="w-full max-w-xs"
        />
        <Button className="bg-[#EEB30D] text-[#15130B] hover:bg-[#EEB30D]/90">
          <Plus className="mr-2 h-4 w-4" />
          Add lead
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card">
        {filtered.length === 0 ? (
          <div className="p-6">
            <EmptyState
              icon={UserPlus}
              title="No leads found"
              description="Try a different search, or add your first lead to get started."
              actionLabel="Add lead"
              onAction={() => {}}
            />
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="px-5 py-3 font-medium">Lead</th>
                <th className="px-5 py-3 font-medium">Company</th>
                <th className="px-5 py-3 font-medium">Stage</th>
                <th className="px-5 py-3 font-medium">Source</th>
                <th className="px-5 py-3 font-medium">Owner</th>
                <th className="px-5 py-3 font-medium">Created</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr
                  key={lead.name}
                  className="border-b border-border last:border-0 hover:bg-accent/50"
                >
                  <td className="px-5 py-3.5 font-medium">{lead.name}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    {lead.company}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge
                      label={lead.stage}
                      tone={stageTone[lead.stage as keyof typeof stageTone]}
                    />
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    {lead.source}
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    {lead.owner}
                  </td>
                  <td className="px-5 py-3.5 font-data text-xs text-muted-foreground">
                    {lead.created}
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

export default LeadsPage;
