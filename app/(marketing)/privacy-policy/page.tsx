import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How MyCRM collects, uses, and protects your data.",
};

const sections = [
  {
    heading: "1. Information we collect",
    body: "We collect account information you provide directly (name, email, company), data you store in your workspace (leads, customers, activities), and usage data such as log-in times and feature usage that help us improve the product.",
  },
  {
    heading: "2. How we use your information",
    body: "We use your information to operate and improve MyCRM, provide customer support, send service-related communications, and, where you've opted in, product updates. We do not sell your data to third parties.",
  },
  {
    heading: "3. Data storage & security",
    body: "Workspace data is encrypted in transit and at rest. Access is restricted to authorized personnel and logged. We run regular security reviews of our infrastructure providers.",
  },
  {
    heading: "4. Third-party integrations",
    body: "When you connect a third-party service (such as Gmail or Slack), MyCRM only requests the access needed to provide that integration, and you can revoke it at any time from Settings.",
  },
  {
    heading: "5. Data retention & deletion",
    body: "You can export your workspace data at any time. If you cancel your account, your data is retained for 30 days to allow recovery, then permanently deleted unless required otherwise by law.",
  },
  {
    heading: "6. Your rights",
    body: "Depending on your jurisdiction, you may have the right to access, correct, or delete your personal data, or to object to certain processing. Contact us at privacy@mycrm.example to exercise these rights.",
  },
  {
    heading: "7. Changes to this policy",
    body: "We'll notify account admins by email of material changes to this policy at least 14 days before they take effect.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-2xl px-6">
        <p className="font-data text-xs uppercase tracking-wider text-[#8A5F06]">
          Legal
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
          Privacy Policy
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
          Questions about this policy? Contact us at{" "}
          <a
            href="mailto:privacy@mycrm.example"
            className="font-medium text-foreground underline underline-offset-2"
          >
            privacy@mycrm.example
          </a>
          .
        </p>
      </div>
    </section>
  );
}