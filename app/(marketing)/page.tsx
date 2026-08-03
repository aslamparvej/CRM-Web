import { Metadata } from "next";

import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Hero from "@/components/landing/Hero";
import Pricing from "@/components/landing/Pricing";
import Features from "@/components/landing/Features";
import Integrations from "@/components/landing/Integrations";
import Testimonials from "@/components/landing/Testimonials";
import TrustedCompanies from "@/components/landing/TrustedCompanies";
import DashboardPreview from "@/components/landing/DashboardPreview";

export const metadata: Metadata = {
  title: "AFS Desk — Manage leads, close deals, grow faster",
  description:
    "AFS Desk helps teams track leads, automate follow-ups, and manage the full customer pipeline in one place.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedCompanies />
      <Features />
      <DashboardPreview />
      {/* <Integrations /> */}
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
