"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

import { TIME_ZONES } from "@/constants/organization";
import { usePlanStore } from "@/store/plan.store";
import { CreateOrganizationPayload } from "@/types/organization.types";
import { useOrganizationStore } from "@/store/organization.store";

import { useUserStore } from "@/store/user.store";

const initialForm: CreateOrganizationPayload = {
  name: "",
  email: "",
  phone: "",
  website: "",
  address: "",
  city: "",
  state: "",
  country: "India",
  postalCode: "",
  timezone: "Asia/Kolkata",
  planId: "",
  ownerId: "",
  notes: "",
};

const AddClientPage = () => {
  const router = useRouter();
  const { users, loadUsers } = useUserStore();
  const { plans, fetchPlans } = usePlanStore();
  const { createOrganization } = useOrganizationStore();

  const [selectedPlan, setSelectedPlan] = useState("growth");
  const [form, setForm] = useState<CreateOrganizationPayload>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateOrganizationPayload, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);

  // Fetch Plans
  useEffect(() => {
    fetchPlans();
  }, []);

  // Fetch Users
  useEffect(() => {
    loadUsers({ role: "admin" });
  }, []);

  const updateField = (
    field: keyof CreateOrganizationPayload,
    value: string | null,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value ?? "",
    }));

    // Remove error when user starts editing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof CreateOrganizationPayload, string>> =
      {};

    if (!form.name.trim()) {
      newErrors.name = "Organization name is required";
    }
    if (!form.email.trim()) {
      newErrors.email = "Bussiness email is required";
    }
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (form.website) {
      try {
        new URL(form.website);
      } catch {
        newErrors.website = "Enter a valid website URL";
      }
    }
    if (form.postalCode && !/^[0-9A-Za-z\s-]{3,10}$/.test(form.postalCode)) {
      newErrors.postalCode = "Enter a valid postal code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setSubmitting(true);

      await createOrganization({ ...form, planId: selectedPlan });
      // router.push("/admin/clients");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/clients"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to clients
      </Link>

      <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight">
        Add a new client
      </h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Manually create a workspace for a client — useful for sales-assisted
        onboarding or migrating an existing account.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        {/* Organization details */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-base font-semibold">
            Organization details
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="organizationName">
                Organization name<span className="text-destructive">*</span>
              </Label>
              <Input
                id="organizationName"
                placeholder="Acme Technologies"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
              />

              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>
            <div className="space-y-2 sm:col-span-2 ">
              <Label htmlFor="businessEmail">
                Business email<span className="text-destructive">*</span>
              </Label>
              <Input
                id="businessEmail"
                placeholder="hello@acme.com"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
              />

              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="organizationPhone">
                Phone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="organizationPhone"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />

              {errors.phone && (
                <p className="text-xs text-destructive">{errors.phone}</p>
              )}
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                placeholder="https://example.com"
                value={form.website}
                onChange={(e) => updateField("website", e.target.value)}
              />

              {errors.website && (
                <p className="text-xs text-destructive">{errors.website}</p>
              )}
            </div>
          </div>
        </section>

        {/* Business address */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-base font-semibold">
            Business address
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                className="min-h-20"
                placeholder="123 Business Street"
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
              />
            </div>

            {/* City */}
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>

              <Input
                id="city"
                placeholder="Kolkata"
                value={form.city}
                onChange={(e) => updateField("city", e.target.value)}
              />
            </div>

            {/* State */}
            <div className="space-y-2">
              <Label htmlFor="state">State / Province</Label>

              <Input
                id="state"
                placeholder="West Bengal"
                value={form.state}
                onChange={(e) => updateField("state", e.target.value)}
              />
            </div>

            {/* Country */}
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>

              <Input
                id="country"
                placeholder="India"
                value={form.country}
                onChange={(e) => updateField("country", e.target.value)}
              />
            </div>

            {/* Postal Code */}
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal code</Label>

              <Input
                id="postalCode"
                placeholder="700001"
                value={form.postalCode}
                onChange={(e) => updateField("postalCode", e.target.value)}
              />

              {errors.postalCode && (
                <p className="text-xs text-destructive">{errors.postalCode}</p>
              )}
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section className="rounded-xl border bg-card p-6">
          <div className="mb-6">
            <h2 className="text-base font-semibold">Regional preferences</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              These settings determine how dates and times are displayed.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Timezone</Label>

            <Select
              value={form.timezone}
              onValueChange={(value) => updateField("timezone", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>

              <SelectContent>
                {TIME_ZONES.map((timezone) => (
                  <SelectItem key={timezone.value} value={timezone.value}>
                    {timezone.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Plan & billing */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-base font-semibold">
            Plan &amp; billing
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose the plan this client starts on. You can change it later from
            the client&apos;s detail page.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {plans.map((plan) => (
              <button
                key={plan._id}
                type="button"
                onClick={() => setSelectedPlan(plan._id)}
                className={cn(
                  "rounded-xl border p-4 text-left transition-colors",
                  selectedPlan === plan._id
                    ? "border-[#EEB30D] bg-[#FDF3D9]"
                    : "border-border hover:bg-accent",
                )}
              >
                <div className="flex items-center justify-between">
                  <p className="font-display font-semibold">{plan.name}</p>
                  {selectedPlan === plan._id && (
                    <Check className="h-4 w-4 text-[#8A5F06]" />
                  )}
                </div>
                <p className="mt-1 font-data text-xs text-muted-foreground">
                  {plan.currency} {plan.pricing} / {plan.billingPeriod}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Owner Details */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-base font-semibold">
            Owner Details
          </h2>
          <div className="space-y-2 mt-5">
            <Label>Owner<span className="text-destructive">*</span></Label>

            <Select
              value={form.ownerId}
              onValueChange={(value) => updateField("ownerId", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select onwer">
                  {users.find((user) => user._id === form.ownerId)?.name}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user._id} value={user._id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Notes */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-base font-semibold">
            Internal notes
          </h2>
          <div className="mt-5 space-y-2">
            <Label htmlFor="notes">Notes (only visible to admins)</Label>
            <Textarea
              id="notes"
              name="notes"
              rows={4}
              placeholder="e.g. migrated from Spreadsheet, sales rep: Marco Diehl"
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
            />
          </div>
        </section>

        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="outline">
            <Link href="/admin/clients">Cancel</Link>
          </Button>
          <Button
            type="submit"
            disabled={submitting}
            className="bg-[#EEB30D] text-[#15130B] hover:bg-[#EEB30D]/90"
          >
            {submitting ? "Creating..." : "Create client"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddClientPage;
