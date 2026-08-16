"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, Pencil, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import EmptyState from "@/components/common/EmptyState";

import { usePlanStore } from "@/store/plan.store";
import { CURRENCY_SYMBOLS } from "@/constants/currencySymbols";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const AdminPlansPage = () => {
  const { plans, fetchPlans, deletePlan } = usePlanStore();

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Changes to a plan apply to new subscribers only. Existing clients keep
          their current terms until they upgrade.
        </p>
        <Button className="shrink-0 bg-[#EEB30D] text-[#15130B] hover:bg-[#EEB30D]/90">
          <Link href="/admin/plans/create" className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            New plan
          </Link>
        </Button>
      </div>

      {plans.length === 0 ? (
        <EmptyState
          title="No Plans Added Yet"
          description="You haven't created any subscription plans yet. Add your first plan to start offering subscription options to your customers."
          className="h-full w-full"
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className={cn(
                "flex flex-col rounded-2xl border p-6",
                plan.isPopular
                  ? "border-[#EEB30D] bg-[#FDF3D9]"
                  : "border-border bg-card",
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display text-lg font-semibold">
                    {plan.name}
                  </p>
                  <p className="mt-1 font-data text-xs text-muted-foreground">
                    {plan.description || "No description provided."}
                  </p>
                </div>
                <div>
                  <button
                    aria-label={`Edit ${plan.name}`}
                    className="rounded-md p-1.5 text-muted-foreground hover:bg-background hover:text-foreground"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <button
                        type="button"
                        aria-label={`Delete ${plan.name}`}
                        className="rounded-md p-1.5 text-muted-foreground hover:bg-background hover:text-foreground"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete &quot;{plan.name}&quot;?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the &quot;{plan.name}&quot; plan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        <AlertDialogAction
                          onClick={() => deletePlan(plan._id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-3xl font-semibold">
                  {CURRENCY_SYMBOLS[plan.currency]}
                  {plan.pricing}
                </span>
                <span className="font-data text-xs text-muted-foreground">
                  per / {plan.billingPeriod}
                </span>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#8A5F06]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.isPopular ? "default" : "outline"}
                className="mt-8"
              >
                Edit plan
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPlansPage;
