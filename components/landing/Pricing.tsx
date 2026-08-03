import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "₹999",
    period: "per / month",
    description: "Perfect for individuals and small teams.",
    features: [
      "1 Workspace",
      "3 Users",
      "1000 Leads",
      "Lead Management",
      "WhatsApp Integration",
      "Email Support",
      "Follow-up reminders",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "₹2,499",
    period: "per / month",
    description: "Everything you need to scale your business.",
    features: [
      "10 Users",
      "Unlimited leads",
      "Lead Assignment",
      "Follow-up Reminders",
      "Reports & Analytics",
      "WhatsApp + SMS",
      "Role Management",
      "Priority Support",
    ],
    highlighted: true,
  },
  {
    name: "Business",
    price: "₹4,999",
    period: "per / month",
    description: "Designed for growing organizations.",
    features: [
      "30 Users",
      "Unlimited Leads",
      "Automation",
      "Advanced Analytics",
      "Custom Roles",
      "API Access",
      "Audit Logs",
      "Priority Support",
    ],
    highlighted: false,
  },
  // {
  //   name: "Enterprise",
  //   price: "Custom",
  //   description: "Tailored solution for large businesses.",
  //   features: [
  //     "Unlimited Users",
  //     "Unlimited Leads",
  //     "Dedicated Account Manager",
  //     "Custom Integrations",
  //     "SSO Login",
  //     "White Label",
  //     "24/7 Support",
  //     "SLA",
  //   ],
  //   highlighted: false,
  // },
];

function Pricing() {
  return (
    <section id="pricing" className="border-b border-border py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-data text-xs uppercase tracking-wider text-[#8A5F06]">
            Pricing
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Simple pricing for every
            <br />
            <span className="text-[#EEB30D]"> business.</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "flex flex-col rounded-2xl border p-6",
                plan.highlighted
                  ? "border-[#EEB30D] bg-[#FDF3D9] shadow-sm"
                  : "border-border bg-card",
              )}
            >
              <p className="font-display text-lg font-semibold">{plan.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {plan.description}
              </p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-3xl font-semibold">
                  {plan.price}
                </span>
                <span className="font-data text-xs text-muted-foreground">
                  {plan.period}
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
                className={cn(
                  "mt-8",
                  plan.highlighted
                    ? "bg-[#EEB30D] text-[#15130B] hover:bg-[#EEB30D]/90"
                    : "",
                )}
                variant={plan.highlighted ? "default" : "outline"}
              >
                <Link href="/register">Get started</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
