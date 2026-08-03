import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of MyCRM.",
};

const sections = [
  {
    heading: "1. Acceptance of terms",
    body: "By creating an account or using MyCRM, you agree to these Terms of Service and our Privacy Policy. If you're using MyCRM on behalf of a company, you're agreeing on that company's behalf.",
  },
  {
    heading: "2. Accounts & workspaces",
    body: "You're responsible for maintaining the security of your account credentials and for all activity under your workspace. Notify us immediately at support@mycrm.example if you suspect unauthorized access.",
  },
  {
    heading: "3. Subscription & billing",
    body: "Paid plans are billed in advance on a monthly or annual basis. Upgrading takes effect immediately; downgrading takes effect at the end of the current billing period. Fees are non-refundable except where required by law.",
  },
  {
    heading: "4. Acceptable use",
    body: "You agree not to use MyCRM to send unsolicited communications, store unlawful content, or attempt to reverse-engineer or disrupt the service. We may suspend accounts that violate this section.",
  },
  {
    heading: "5. Data ownership",
    body: "You retain ownership of all data you upload to MyCRM. We process it solely to provide the service to you, as described in our Privacy Policy.",
  },
  {
    heading: "6. Service availability",
    body: "We target 99.9% uptime but do not guarantee uninterrupted access. Planned maintenance is communicated in advance where possible.",
  },
  {
    heading: "7. Termination",
    body: "You may cancel your account at any time from Settings. We may suspend or terminate accounts for violation of these terms, with notice where practicable.",
  },
  {
    heading: "8. Limitation of liability",
    body: "MyCRM is provided 'as is.' To the maximum extent permitted by law, we are not liable for indirect, incidental, or consequential damages arising from your use of the service.",
  },
  {
    heading: "9. Changes to these terms",
    body: "We may update these terms from time to time. Continued use of MyCRM after changes take effect constitutes acceptance of the revised terms.",
  },
];

export default function TermsPage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-2xl px-6">
        <p className="font-data text-xs uppercase tracking-wider text-[#8A5F06]">
          Legal
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: July 1, 2026
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display text-lg font-semibold">
                {section.heading}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-14 text-sm text-muted-foreground">
          Questions about these terms? Contact us at{" "}
          <a
            href="mailto:legal@mycrm.example"
            className="font-medium text-foreground underline underline-offset-2"
          >
            legal@mycrm.example
          </a>
          .
        </p>
      </div>
    </section>
  );
}
