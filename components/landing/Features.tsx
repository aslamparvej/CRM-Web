import {
  BarChart3,
  Bell,
  Clock,
  KanbanSquare,
  Users,
  Workflow,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Lead & customer records",
    description:
      "One record per contact, from first form fill to final invoice — no re-entering data as a lead becomes a customer.",
  },
  {
    icon: Clock,
    title: "Follow-ups that don't slip",
    description:
      "Every lead gets a next action and a due date. Overdue follow-ups surface on the dashboard, not buried in a spreadsheet.",
  },
  {
    icon: KanbanSquare,
    title: "Visual pipeline",
    description:
      "Drag deals between stages and see exactly how much revenue sits in each one, updated the moment something moves.",
  },
  {
    icon: Workflow,
    title: "Automation rules",
    description:
      "Assign new leads, send a template, or notify a rep automatically the moment a condition is met — no code required.",
  },
  {
    icon: BarChart3,
    title: "Reports that answer questions",
    description:
      "Conversion by stage, rep, and source — built to answer 'why did we miss target' without a BI tool.",
  },
  {
    icon: Bell,
    title: "Notifications that matter",
    description:
      "Get pinged when a hot lead goes cold or a deal crosses a stage — filtered so it's signal, not noise.",
  },
];

const Features = () => {
  return (
    <section id="features" className="border-b border-border py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-data text-xs uppercase tracking-wider text-[#8A5F06]">
            What it does
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Powerful CRM features built for
            <br />
            <span className="text-[#EEB30D]"> growing businesses.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Everything you need to generate more leads, close more deals and
            manage your sales team.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FDF3D9]">
                <feature.icon
                  className="h-5 w-5 text-[#8A5F06]"
                  strokeWidth={1.75}
                />
              </div>
              <h3 className="font-display text-base font-semibold">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
