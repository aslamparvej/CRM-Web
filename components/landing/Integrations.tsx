import Link from "next/link";
import { ArrowRight } from "lucide-react";

const integrations = [
  "Gmail",
  "Google Calendar",
  "Slack",
  "WhatsApp Business",
  "Twilio",
  "Zapier",
  "Stripe",
  "HubSpot Forms",
];

const Integrations = () => {
  return (
    <section id="integrations" className="border-b border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="font-data text-xs uppercase tracking-wider text-[#8A5F06]">
              Connected
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Fits the tools you already use
            </h2>
          </div>
          <Link
            href="/integrations"
            className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-[#8A5F06]"
          >
            View all integrations <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {integrations.map((name) => (
            <div
              key={name}
              className="flex h-20 items-center justify-center rounded-xl border border-border bg-card px-4 text-center text-sm font-medium text-foreground/80"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integrations;
