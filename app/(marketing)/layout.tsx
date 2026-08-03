import React from "react";
import { cn } from "@/lib/utils";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

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

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        display.variable,
        data.variable,
        "flex min-h-screen flex-col",
      )}
    >
      <Navbar />
      <main className="flex-1">
        {/* Ambient accent glow */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: "#EEB30D" }}
          aria-hidden="true"
        />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
