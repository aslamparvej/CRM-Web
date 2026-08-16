"use client";

import SearchInput from "@/components/common/SearchInput";
import StatusBadge from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Building2, MoreHorizontal, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useOrganizationStore } from "@/store/organization.store";
import EmptyState from "@/components/common/EmptyState";

const statusTone = {
  Active: "success",
  Trial: "info",
  "Past due": "danger",
  Suspended: "neutral",
} as const;

const AdminClientsPage = () => {
  const { organizations, getOrganizations } = useOrganizationStore();

  const [query, setQuery] = useState("");

  useEffect(()=> {
    getOrganizations();
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search clients..."
          containerClassName="w-full max-w-xs"
        />
        <Button className="bg-[#EEB30D] text-[#15130B] hover:bg-[#EEB30D]/90">
          <Link href="/admin/clients/create" className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Link>
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card">
        {organizations.length === 0 ? (
          <div className="p-6">
            <EmptyState
              icon={Building2}
              title="No clients found"
              description="Try a different search, or add a new client to the platform."
            />
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="px-5 py-3 font-medium">Client</th>
                <th className="px-5 py-3 font-medium">Plan</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Users</th>
                <th className="px-5 py-3 font-medium">MRR</th>
                <th className="px-5 py-3 font-medium">Joined</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {organizations.map((organization) => (
                <tr
                  key={organization.name}
                  className="border-b border-border last:border-0 hover:bg-accent/50"
                >
                  <td className="px-5 py-3.5 font-medium">{organization.name}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    {/* {organization.planId} */}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge
                      label={organization.status}
                      tone={
                        statusTone[organization.status as keyof typeof statusTone]
                      }
                    />
                  </td>
                  <td className="px-5 py-3.5 font-data text-xs text-muted-foreground">
                    {organization.ownerId}
                  </td>
                  <td className="px-5 py-3.5 font-data text-xs">
                  </td>
                  <td className="px-5 py-3.5 font-data text-xs text-muted-foreground">
                    {organization.createdAt}
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

export default AdminClientsPage;
