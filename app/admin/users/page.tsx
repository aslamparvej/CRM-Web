"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pen, Plus, UserCog } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import EmptyState from "@/components/common/EmptyState";
import SearchInput from "@/components/common/SearchInput";
import StatusBadge from "@/components/common/StatusBadge";

import { useUserStore } from "@/store/user.store";


const AdminUsersPage = () => {
  const { users, loadUsers } = useUserStore();

  const [query, setQuery] = useState("");

  useEffect(() => {
    loadUsers({ search: query, role: "admin" });
  }, [query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search admin users..."
          containerClassName="w-full max-w-xs"
        />
        <Button className="bg-[#EEB30D] text-[#15130B] hover:bg-[#EEB30D]/90">
          <Link href="/admin/users/create" className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Create user
          </Link>
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card">
        {users.length === 0 ? (
          <div className="p-6">
            <EmptyState
              icon={UserCog}
              title="No admin users found"
              description="Try a different search, or invite someone to the admin portal."
            />
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Organization</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.email}
                  className="border-b border-border last:border-0 hover:bg-accent/50"
                >
                  <td className="px-5 py-3.5">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    {user.role}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge
                      label={user.isActive ? "Active" : "In Active"}
                      tone={user.isActive ? "success" : "danger"}
                    />
                  </td>
                  <td className="px-5 py-3.5 font-data text-xs text-muted-foreground">
                    {user.organizationId._id ? user.organizationId.name : "Not Assign"}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={<Button variant="ghost" />}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={()=> alert("cliek")}>Assign</DropdownMenuItem>
                          <DropdownMenuItem>In active</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default AdminUsersPage;
