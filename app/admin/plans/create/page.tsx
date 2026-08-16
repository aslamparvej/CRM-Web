"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

import { CURRENCIES } from "@/constants/currency";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { usePlanStore } from "@/store/plan.store";
import { CreatePlanPayload } from "@/types/plan.types";

const AddPlanPage = () => {
  const router = useRouter();
  const { createPlan, error } = usePlanStore();

  const [formData, setFormData] = useState<CreatePlanPayload>({
    name: "",
    description: "",

    pricing: 0,
    currency: "INR",
    billingPeriod: "monthly",

    limits: {
      users: 5,
      unlimitedUsers: false,
      leads: 100,
      storageGB: 1,
      messageTemplates: 5,
    },

    features: [""],

    trialDays: 14,

    sortOrder: 1,

    isPopular: false,
    visibility: "public",
  });

  const [submitting, setSubmitting] = useState(false);
  const [features, setFeatures] = useState<string[]>([""]);

  function updateFeature(index: number, value: string) {
    setFeatures((prev) => prev.map((f, i) => (i === index ? value : f)));
  }

  function addFeature() {
    setFeatures((prev) => [...prev, ""]);
  }

  function removeFeature(index: number) {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (submitting) return;

    setSubmitting(true);

    try {
      const plan = await createPlan({
        ...formData,
        features: features.filter((feature) => feature.trim() !== ""),
      });

      if (!plan) {
        return;
      }

      router.push("/admin/plans");
    } catch (error) {
      console.error("Failed to create plan:", error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/plans"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to plans
      </Link>

      <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight">
        Create a new plan
      </h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        New plans apply to future subscribers only — existing clients keep their
        current terms.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        {/* Plan details */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-base font-semibold">Plan details</h2>

          <div className="mt-5 space-y-2">
            <Label htmlFor="planName">Plan name</Label>
            <Input
              id="planName"
              name="planName"
              required
              placeholder="e.g. Growth"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="mt-5 space-y-2">
            <Label htmlFor="planDescription">Short description</Label>
            <Textarea
              id="planDescription"
              name="planDescription"
              rows={2}
              placeholder="For small teams that need automation."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
        </section>

        {/* Limits */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-base font-semibold">Limits</h2>
          <div className="mt-5 space-y-2">
            <Label htmlFor="leadLimit">Lead</Label>
            <Input
              id="leadLimit"
              name="leadLimit"
              placeholder="Unlimited, or a number"
              value={formData.limits.leads}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  limits: { ...formData.limits, leads: Number(e.target.value) },
                })
              }
            />
          </div>
          <div className="mt-5 space-y-2">
            <Label htmlFor="userLimit">User</Label>
            <Input
              id="userLimit"
              name="userLimit"
              placeholder="Unlimited, or a number"
              value={formData.limits.users}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  limits: { ...formData.limits, users: Number(e.target.value) },
                })
              }
              disabled={formData.limits.unlimitedUsers}
            />
            <div className="flex items-center justify-between">
              <Label>Unlimited Users</Label>

              <Switch
                checked={formData.limits.unlimitedUsers}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    limits: { ...formData.limits, unlimitedUsers: checked },
                  })
                }
              />
            </div>
          </div>
          <div className="mt-5 space-y-2">
            <Label htmlFor="messageTemplatesLimit">Message Templates</Label>
            <Input
              id="messageTemplatesLimit"
              name="messageTemplatesLimit"
              placeholder="Unlimited, or a number"
              value={formData.limits.messageTemplates}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  limits: {
                    ...formData.limits,
                    messageTemplates: Number(e.target.value),
                  },
                })
              }
            />
          </div>

          <div className="mt-5 space-y-2">
            <Label htmlFor="trialDays">Trial Days</Label>
            <Input
              id="trialDays"
              name="trialDays"
              placeholder="Unlimited, or a number"
              value={formData.trialDays}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  trialDays: Number(e.target.value),
                })
              }
            />
          </div>
        </section>

        {/* Features */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-base font-semibold">Features</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Shown as the feature list on the pricing page.
          </p>

          <div className="mt-5 space-y-3">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input
                  value={feature}
                  onChange={(e) => updateFeature(i, e.target.value)}
                  placeholder="e.g. Unlimited leads"
                />
                {features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(i)}
                    aria-label="Remove feature"
                    className="shrink-0 rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addFeature}
              className="flex items-center gap-1.5 text-sm font-medium text-[#8A5F06] hover:underline"
            >
              <Plus className="h-3.5 w-3.5" />
              Add feature
            </button>
          </div>
        </section>

        {/* Pricing */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-base font-semibold">Pricing</h2>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="leadLimit">Currency</Label>
              <Select
                value={formData.currency}
                onValueChange={(value) =>
                  setFormData({ ...formData, currency: value || "INR" })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.name} ({currency.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="billingPeriod">Billing period</Label>
              <Select
                id="billingPeriod"
                name="billingPeriod"
                value={formData.billingPeriod}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    billingPeriod: value as "monthly" | "yearly",
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select billing period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Per Month</SelectItem>
                  <SelectItem value="yearly">Per Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2 mt-5">
            <Label htmlFor="price">Price ({formData.currency})</Label>
            <div className="relative">
              <Input
                id="price"
                name="price"
                type="number"
                min={0}
                step="1"
                required
                placeholder="999"
                value={formData.pricing}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pricing: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>
        </section>

        {/* Populality */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-base font-semibold">Meta Data</h2>
          <div className="space-y-2 mt-5">
            <Label>Sort Order</Label>
            <Input
              id="sortOrder"
              name="sortOrder"
              type="number"
              placeholder="1"
              value={formData.sortOrder}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sortOrder: Number(e.target.value),
                })
              }
            />
          </div>
          <div className="mt-5 flex items-center justify-between space-y-2">
            <Label>Is Popular</Label>
            <Switch
              checked={formData.isPopular}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  isPopular: checked,
                })
              }
            />
          </div>
        </section>

        {/* Visibility */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-base font-semibold">Visibility</h2>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {(
              [
                {
                  id: "public",
                  label: "Public",
                  description: "Listed on the pricing page",
                },
                {
                  id: "draft",
                  label: "Draft",
                  description: "Hidden until you publish it",
                },
              ] as const
            ).map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() =>
                  setFormData({ ...formData, visibility: option.id })
                }
                className={cn(
                  "rounded-xl border p-4 text-left transition-colors",
                  formData.visibility === option.id
                    ? "border-[#EEB30D] bg-[#FDF3D9]"
                    : "border-border hover:bg-accent",
                )}
              >
                <p className="font-display font-semibold">{option.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {option.description}
                </p>
              </button>
            ))}
          </div>
        </section>

        {error && (
          <section className="rounded-xl border border-border bg-card p-6">
            <p className="text-sm text-destructive">{error}</p>
          </section>
        )}

        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="outline">
            <Link href="/admin/plans">Cancel</Link>
          </Button>
          <Button
            type="submit"
            disabled={submitting}
            className="bg-[#EEB30D] text-[#15130B] hover:bg-[#EEB30D]/90"
          >
            {submitting ? "Creating..." : "Create plan"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPlanPage;
