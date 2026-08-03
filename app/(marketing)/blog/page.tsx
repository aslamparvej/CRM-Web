import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on sales pipelines, follow-ups, and closing deals.",
};

const posts = [
  {
    slug: "why-deals-stall-in-qualified",
    date: "Jul 24, 2026",
    title: "Why most deals stall in 'Qualified', not 'Proposal'",
    excerpt:
      "The data behind where pipelines actually break down, and the follow-up cadence that fixes it.",
    tag: "Pipeline",
  },
  {
    slug: "automate-first-follow-up",
    date: "Jul 10, 2026",
    title: "The one automation rule every sales team should set up first",
    excerpt:
      "Assigning new leads within five minutes changes conversion more than any script does.",
    tag: "Automation",
  },
  {
    slug: "spreadsheet-to-crm-migration",
    date: "Jun 28, 2026",
    title: "Moving off a spreadsheet without losing a single lead",
    excerpt: "A step-by-step import checklist we give every new customer.",
    tag: "Migration",
  },
  {
    slug: "reporting-that-explains-missed-target",
    date: "Jun 12, 2026",
    title: "Building a report that explains a missed quarter in one screen",
    excerpt:
      "Conversion by stage and rep, laid out so a manager doesn't have to ask a follow-up question.",
    tag: "Reporting",
  },
];

export default function BlogPage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="font-data text-xs uppercase tracking-wider text-[#8A5F06]">
            Blog
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            Notes on the pipeline
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Short, practical writing on selling, following up, and building a
            process that doesn&apos;t depend on memory.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute bottom-0 left-1.25 top-2 w-px bg-border" />
          <div className="space-y-10">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative flex gap-6 pl-8"
              >
                <span className="absolute left-0 top-1.75 h-2.75 w-2.75 rounded-full border-2 border-[#EEB30D] bg-background" />
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-data text-xs text-muted-foreground">
                      {post.date}
                    </span>
                    <span className="rounded-full bg-[#FDF3D9] px-2 py-0.5 font-data text-[10px] uppercase tracking-wider text-[#8A5F06]">
                      {post.tag}
                    </span>
                  </div>
                  <h2 className="mt-2 font-display text-lg font-semibold tracking-tight group-hover:text-[#8A5F06]">
                    {post.title}
                  </h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-foreground">
                    Read post{" "}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
