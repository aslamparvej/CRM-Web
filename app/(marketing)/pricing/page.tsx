import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";

import FAQ from "@/components/landing/FAQ";
import Pricing from "@/components/landing/Pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, per-user pricing that grows with your pipeline.",
};

const rows: { feature: string; starter: boolean; growth: boolean; scale: boolean }[] = [
  { feature: "Leads & customers", starter: true, growth: true, scale: true },
  { feature: "Pipelines", starter: false, growth: true, scale: true },
  { feature: "Automation rules", starter: false, growth: true, scale: true },
  { feature: "WhatsApp / SMS templates", starter: false, growth: true, scale: true },
  { feature: "Custom roles & permissions", starter: false, growth: false, scale: true },
  { feature: "Advanced reports", starter: false, growth: false, scale: true },
  { feature: "REST API access", starter: false, growth: true, scale: true },
  { feature: "Priority support", starter: false, growth: false, scale: true },
];

export default function PricingPage() {
  return (
    <>
      <section className="border-b border-border py-20 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <p className="font-data text-xs uppercase tracking-wider text-[#8A5F06]">
            Pricing
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            One price per rep. No surprises.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free, upgrade when your pipeline needs automation and
            reporting — not before.
          </p>
        </div>
      </section>

      <Pricing />

      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center font-display text-2xl font-semibold tracking-tight">
            Compare plans
          </h2>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-card">
                  <th className="px-5 py-4 text-left font-medium text-muted-foreground">
                    Feature
                  </th>
                  <th className="px-5 py-4 text-center font-display font-semibold">
                    Starter
                  </th>
                  <th className="px-5 py-4 text-center font-display font-semibold text-[#8A5F06]">
                    Growth
                  </th>
                  <th className="px-5 py-4 text-center font-display font-semibold">
                    Scale
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.feature} className="border-b border-border last:border-0">
                    <td className="px-5 py-4 text-foreground/90">{row.feature}</td>
                    <td className="px-5 py-4 text-center">
                      <Cell included={row.starter} />
                    </td>
                    <td className="px-5 py-4 text-center">
                      <Cell included={row.growth} />
                    </td>
                    <td className="px-5 py-4 text-center">
                      <Cell included={row.scale} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <FAQ />
    </>
  );
}

function Cell({ included }: { included: boolean }) {
  return included ? (
    <Check className="mx-auto h-4 w-4 text-[#8A5F06]" />
  ) : (
    <Minus className="mx-auto h-4 w-4 text-muted-foreground/40" />
  );
}