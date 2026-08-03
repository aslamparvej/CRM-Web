import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Rocket, Workflow, Plug, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Docs",
  description: "Guides and reference for setting up and running MyCRM.",
};

const sections = [
  {
    icon: Rocket,
    title: "Getting started",
    links: [
      { label: "Create your workspace", href: "/docs/getting-started/workspace" },
      { label: "Import leads from a CSV", href: "/docs/getting-started/import" },
      { label: "Invite your team", href: "/docs/getting-started/invite-team" },
    ],
  },
  {
    icon: Workflow,
    title: "Pipeline & automation",
    links: [
      { label: "Customize pipeline stages", href: "/docs/pipeline/stages" },
      { label: "Write an automation rule", href: "/docs/pipeline/automation" },
      { label: "Set follow-up reminders", href: "/docs/pipeline/reminders" },
    ],
  },
  {
    icon: Plug,
    title: "Integrations & API",
    links: [
      { label: "Connect Gmail", href: "/docs/integrations/gmail" },
      { label: "REST API reference", href: "/docs/api/reference" },
      { label: "Webhooks", href: "/docs/api/webhooks" },
    ],
  },
  {
    icon: Shield,
    title: "Admin & security",
    links: [
      { label: "Roles & permissions", href: "/docs/admin/roles" },
      { label: "Audit logs", href: "/docs/admin/audit-logs" },
      { label: "Data export & deletion", href: "/docs/admin/data-export" },
    ],
  },
];

export default function DocsPage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <p className="font-data text-xs uppercase tracking-wider text-[#8A5F06]">
            Documentation
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            Set up MyCRM the right way
          </h1>
          <div className="mx-auto mt-8 max-w-md">
            <Input
              placeholder="Search documentation..."
              className="h-11 rounded-full border-border bg-card px-5"
            />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FDF3D9]">
                  <section.icon className="h-4.5 w-4.5 text-[#8A5F06]" strokeWidth={1.75} />
                </div>
                <h2 className="font-display font-semibold">{section.title}</h2>
              </div>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center justify-between text-sm text-foreground/80 hover:text-[#8A5F06]"
                    >
                      {link.label}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}