import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
// import { PipelineRail } from "@/components/common/PipelineRail";

import Image from "next/image";

const Hero = () => {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-20 sm:pt-28 grid items-center gap-16 lg:grid-cols-2">
        <div className="mx-auto max-w-xl text-center lg:text-left">
          <span className="inline-flex items-center rounded-full bg-[#FDF3D9] px-3 py-1 font-data text-xs text-[#8A5F06]">
            Trusted by Growing Businesses
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
            Every deal has a stage.
            <br />
            <span className="text-[#8A5F06]">
              Know exactly where it stands.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-balance text-lg text-muted-foreground">
            AFS Desk helps your team manage leads, automate follow-ups, assign
            sales agents, track customer interactions, and increase
            conversions—all from one platform.
          </p>
          <div className="mt-8 flex flex-col items-center justify-start gap-3 sm:flex-row">
            <Button
              size="lg"
              className="bg-[#EEB30D] text-[#15130B] hover:bg-[#EEB30D]/90"
            >
              <Link href="/register" className="flex items-center">
                Get started free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              <Link href="/features">See how it works</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-500" />
              No Credit Card
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-500" />
              14-Day Trial
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-500" />
              Cancel Anytime
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="rounded-3xl border bg-white p-4 shadow-2xl">
            <Image
              src="/dashboard.jpeg"
              alt="Dashboard"
              width={420}
              height={840}
              className="h-auto w-50 lg:w-70 rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
