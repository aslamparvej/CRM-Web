"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Link, Plus, X } from "lucide-react";

const steps = [
  { label: "Workspace" },
  { label: "Team" },
  { label: "Plan" },
  { label: "Done" },
];

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$0",
    description: "Up to 100 leads, 1 pipeline.",
  },
  {
    id: "growth",
    name: "Growth",
    price: "$29/user",
    description: "Unlimited leads, automation.",
  },
  {
    id: "scale",
    name: "Scale",
    price: "$79/user",
    description: "Roles, advanced reports.",
  },
];

const OnboardingPage = () => {
  const [step, setStep] = useState(0);
  const [workspaceName, setWorkspaceName] = useState("");
  const [invites, setInvites] = useState<string[]>([""]);
  const [selectedPlan, setSelectedPlan] = useState("growth");

  function updateInvite(index: number, value: string) {
    setInvites((prev) => prev.map((v, i) => (i === index ? value : v)));
  }

  function addInvite() {
    setInvites((prev) => [...prev, ""]);
  }

  function removeInvite(index: number) {
    setInvites((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="w-full max-w-sm">
      {/* <PipelineRail stages={steps} activeIndex={step} className="mb-10" /> */}

      {step === 0 && (
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Name your workspace
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            This is what your team will see when they log in.
          </p>

          <div className="mt-8 space-y-2">
            <Label htmlFor="workspaceName">Workspace name</Label>
            <Input
              id="workspaceName"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              placeholder="Acme Sales Team"
            />
          </div>

          <Button
            onClick={() => setStep(1)}
            disabled={!workspaceName.trim()}
            className="mt-8 w-full bg-[#EEB30D] text-[#15130B] hover:bg-[#EEB30D]/90"
          >
            Continue
          </Button>
        </div>
      )}

      {step === 1 && (
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Invite your team
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Add teammates now, or skip and invite them later from Settings.
          </p>

          <div className="mt-8 space-y-3">
            {invites.map((email, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input
                  type="email"
                  placeholder="teammate@company.com"
                  value={email}
                  onChange={(e) => updateInvite(i, e.target.value)}
                />
                {invites.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInvite(i)}
                    aria-label="Remove"
                    className="shrink-0 rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addInvite}
              className="flex items-center gap-1.5 text-sm font-medium text-[#8A5F06] hover:underline"
            >
              <Plus className="h-3.5 w-3.5" />
              Add another
            </button>
          </div>

          <div className="mt-8 flex gap-3">
            <Button
              variant="outline"
              onClick={() => setStep(2)}
              className="flex-1"
            >
              Skip for now
            </Button>
            <Button
              onClick={() => setStep(2)}
              className="flex-1 bg-[#EEB30D] text-[#15130B] hover:bg-[#EEB30D]/90"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Choose your plan
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            You can change plans anytime from Settings.
          </p>

          <div className="mt-8 space-y-3">
            {plans.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                className={cn(
                  "w-full rounded-xl border p-4 text-left transition-colors",
                  selectedPlan === plan.id
                    ? "border-[#EEB30D] bg-[#FDF3D9]"
                    : "border-border hover:bg-accent",
                )}
              >
                <div className="flex items-center justify-between">
                  <p className="font-display font-semibold">{plan.name}</p>
                  <p className="font-data text-sm">{plan.price}</p>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {plan.description}
                </p>
              </button>
            ))}
          </div>

          <Button
            onClick={() => setStep(3)}
            className="mt-8 w-full bg-[#EEB30D] text-[#15130B] hover:bg-[#EEB30D]/90"
          >
            Finish setup
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FDF3D9]">
            <CheckCircle2
              className="h-5 w-5 text-[#8A5F06]"
              strokeWidth={1.75}
            />
          </div>
          <h1 className="mt-5 font-display text-2xl font-semibold tracking-tight">
            You&apos;re all set
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {workspaceName || "Your workspace"} is ready. Time to add your first
            lead.
          </p>
          <Button className="mt-8 w-full bg-[#EEB30D] text-[#15130B] hover:bg-[#EEB30D]/90">
            <Link href="/app/dashboard">Go to dashboard</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default OnboardingPage;
