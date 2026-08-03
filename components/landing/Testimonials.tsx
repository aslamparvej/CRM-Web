const testimonials = [
  {
    quote:
      "We stopped losing deals to silence. If a lead hasn't moved in a week, MyCRM tells us before the customer has to.",
    name: "Priya Nair",
    role: "Head of Sales, Basalt Labs",
  },
  {
    quote:
      "The pipeline view is the first thing our reps open every morning. It replaced three spreadsheets and a Slack channel.",
    name: "Marco Diehl",
    role: "Revenue Ops, Ferro & Co",
  },
  {
    quote:
      "Setup took an afternoon. Automation rules took another. We were live before our old CRM's onboarding call.",
    name: "Aisha Rahman",
    role: "Founder, Kettlecorn",
  },
];

const Testimonials = () => {
  return (
    <section className="border-b border-border py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-data text-xs uppercase tracking-wider text-[#8A5F06]">
            From the field
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Teams that stopped guessing where deals stood
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6"
            >
              <blockquote className="text-sm leading-relaxed text-foreground/90">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
