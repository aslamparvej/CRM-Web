export const faqs = [
  {
    question: "What is AFS Desk?",
    answer:
      "AFS Desk is a cloud-based Customer Relationship Management (CRM) platform that helps businesses manage leads, customers, follow-ups, sales pipelines, and team collaboration from a single dashboard.",
  },
  {
    question: "Who can use AFS Desk?",
    answer:
      "AFS Desk is designed for startups, small businesses, agencies, sales teams, real estate companies, insurance advisors, education consultants, and any business that manages customer relationships.",
  },
  {
    question: "Can I try AFS Desk before purchasing?",
    answer:
      "Yes. Every new account comes with a free trial so you can explore all features before choosing a subscription plan.",
  },
  {
    question: "Do I need a credit card to start the free trial?",
    answer:
      "No. You can sign up and start your free trial without providing any credit card information.",
  },
  {
    question: "Can I add multiple team members?",
    answer:
      "Yes. Depending on your subscription plan, you can invite admins, sub-admins, and agents, assign roles, and manage permissions easily.",
  },
  {
    question: "Does AFS Desk support WhatsApp and SMS?",
    answer:
      "Yes. AFS Desk supports WhatsApp messaging, SMS communication, and email templates to help you engage with customers efficiently.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use secure authentication, encrypted communication (HTTPS), role-based access control, and industry best practices to protect your business data.",
  },
  {
    question: "Can I upgrade or downgrade my plan anytime?",
    answer:
      "Yes. You can upgrade, downgrade, or cancel your subscription at any time. Changes are applied according to your billing cycle.",
  },
  {
    question: "Can I import my existing leads?",
    answer:
      "Yes. AFS Desk allows you to import leads and customer data using CSV files, making migration from your existing CRM quick and simple.",
  },
  {
    question: "Do you provide customer support?",
    answer:
      "Yes. We provide email support for all customers, with priority support available for Business and Enterprise plans.",
  },
  {
    question: "Does AFS Desk work on mobile devices?",
    answer:
      "Yes. AFS Desk is fully responsive and works seamlessly on desktops, tablets, and smartphones. A dedicated mobile app is also available.",
  },
  {
    question: "Can I customize the CRM for my business?",
    answer:
      "Yes. Enterprise customers can customize workflows, user roles, integrations, branding, and automation rules to match their business requirements.",
  },
];

const FAQ = () => {
  return (
    <section className="border-b border-border py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="font-data text-xs uppercase tracking-wider text-[#8A5F06]">
            Questions
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
            Frequently asked
          </h2>
        </div>

        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((item) => (
            <details key={item.question} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
                {item.question}
                <span className="ml-4 text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
