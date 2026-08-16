import Link from "next/link";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const data = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-data",
  weight: ["400", "500"],
  display: "swap",
});

const stages = ["New", "Contacted", "Qualified", "Proposal", "Won"];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn(display.variable, data.variable, "flex min-h-screen")}>
      {/* Brand panel */}
      <div className="relative hidden w-[42%] flex-col justify-between bg-[#15130B] p-10 text-white lg:flex">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-lg font-semibold tracking-tight">
            AFS
            {" "}
            <span className="text-primary">Desk</span>
          </span>
        </Link>

        <div>
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight">
            Every deal has a stage.
            <br />
            Know exactly where it stands.
          </h2>

          <div className="mt-10 space-y-4">
            {stages.map((stage, i) => (
              <div key={stage} className="flex items-center gap-3">
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full border-2",
                    i <= 3
                      ? "border-[#EEB30D] bg-[#EEB30D]"
                      : "border-white/25 bg-transparent",
                  )}
                />
                <span
                  className={cn(
                    "font-data text-sm",
                    i <= 3 ? "text-white" : "text-white/40",
                  )}
                >
                  {stage}
                </span>
              </div>
            ))}
          </div>

          <blockquote className="mt-10 max-w-sm text-sm leading-relaxed text-white/70">
            “The pipeline view is the first thing our reps open every morning.
            It replaced three spreadsheets and a Slack channel.”
          </blockquote>
          <p className="mt-3 font-data text-xs text-white/40">
            Marco Diehl — Revenue Ops, Ferro &amp; Co
          </p>
        </div>

        <p className="font-data text-xs text-white/30">
          © {new Date().getFullYear()} AFS Desk, Inc.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 flex-col">
        <div className="flex h-16 items-center px-6 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-lg font-semibold tracking-tight">
              AFS 
              <span className="text-primary">Desk</span>
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
