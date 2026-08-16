"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import userService from "@/services/user.service";
import { RegisterPayload } from "@/types/user.types";

const roles = [
  // { value: "super_admin", label: "Super Admin" },
  // { value: "developer_admin", label: "Developer Admin" },
  { value: "admin", label: "Admin" },
  // { value: "sub-admin", label: "Sub-Admin" },
  // { value: "executive", label: "Executive" },
] as const;

function generatePassword(length = 12) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
}

const CreateUserPage = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [sendCredentials, setSendCredentials] = useState(true);
  const [role, setRole] = useState<(typeof roles)[number]["value"]>("admin");

  function handleGenerate() {
    setPassword(generatePassword());
    setShowPassword(true);
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const form = new FormData(e.currentTarget);

      const payload: RegisterPayload = {
        name: form.get("name")?.toString() || "",
        email: form.get("email")?.toString() || "",
        password,
        phone: form.get("phone")?.toString() || "",
        role,
        designation: form.get("designation")?.toString() || "",
      };

      console.log(payload);
      const response = await userService.create(payload);

      console.log(response);

      router.push("/admin/users");
    } catch (error) {
      console.error("Failed to create user:", error);
      console.log("Error details:", error instanceof Error ? error.message : error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to users
      </Link>

      <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight">
        Create an admin user
      </h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        They&apos;ll be added to an organization and can log in with the
        credentials below.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        {/* Basic details */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-base font-semibold">
            Basic details
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Ananya Sharma"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="ananya@company.com"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                name="designation"
                placeholder="e.g. Team Lead, Telecaller, Office Boy"
              />
              <p className="text-xs text-muted-foreground">
                Optional. Shown next to their name — doesn&apos;t affect
                permissions.
              </p>
            </div>
          </div>
        </section>

        {/* Access */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-base font-semibold">Access</h2>

          <div className="mt-5 space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={role}
              onValueChange={(value) => setRole(value as typeof role)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select user role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Determines what they can see and do inside the workspace.
            </p>
          </div>

          <div className="mt-5 space-y-2">
            <Label htmlFor="password">Temporary password</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <Button type="button" variant="outline" onClick={handleGenerate}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              They can change this after their first login. Minimum 8
              characters.
            </p>
          </div>

          <label className="mt-5 flex items-start gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={sendCredentials}
              onChange={(e) => setSendCredentials(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-border accent-[#EEB30D]"
            />
            <span>Email login credentials to this address</span>
          </label>
        </section>

        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="outline">
            <Link href="/admin/users">Cancel</Link>
          </Button>
          <Button
            type="submit"
            disabled={submitting}
            className="bg-[#EEB30D] text-[#15130B] hover:bg-[#EEB30D]/90"
          >
            {submitting ? "Adding..." : "Add team member"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserPage;
