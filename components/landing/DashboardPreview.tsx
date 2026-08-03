import {
  ArrowUpRight,
  IndianRupee,
  Phone,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";
import { Card } from "../ui/card";

const DashboardPreview = () => {
  return (
    <section className="border-b border-border bg-[#15130B] py-24 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center ">
          <p className="font-data text-xs uppercase tracking-wider text-[#EEB30D]">
            The dashboard
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything your sales team
            <br />
            <span className="text-[#EEB30D]"> needs in one place.</span>
          </h2>
          <p className="mt-4 text-white/60">
            Track leads, monitor agents, analyze sales performance and automate
            your entire sales workflow from one powerful dashboard.
          </p>
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* Floating Cards */}
          <Card className="absolute -left-6 top-20 hidden w-64 rounded-2xl border bg-white p-5 shadow-xl lg:block">
            <div className="flex items-center justify-between">
              <Users className="text-[#EEB30D]" />
              <ArrowUpRight className="text-green-500" />
            </div>

            <h4 className="mt-4 text-sm text-muted-foreground">Active Leads</h4>

            <p className="mt-1 text-3xl font-bold">1,245</p>

            <p className="mt-3 text-sm text-green-600">+24% this month</p>
          </Card>
          <Card className="absolute -right-6 top-40 hidden w-64 rounded-2xl border bg-white p-5 shadow-xl lg:block">
            <div className="flex items-center justify-between">
              <IndianRupee className="text-[#EEB30D]" />
              <TrendingUp className="text-green-500" />
            </div>

            <h4 className="mt-4 text-sm text-muted-foreground">Revenue</h4>

            <p className="mt-1 text-3xl font-bold">₹18.5L</p>

            <p className="mt-3 text-sm text-green-600">+32% Growth</p>
          </Card>
          <Card className="absolute bottom-10 left-20 hidden w-60 rounded-2xl border bg-white p-5 shadow-xl lg:block">
            <div className="flex items-center justify-between">
              <Phone className="text-[#EEB30D]" />
              <ArrowUpRight className="text-green-500" />
            </div>

            <h4 className="mt-4 text-sm text-muted-foreground">Calls Today</h4>

            <p className="mt-1 text-3xl font-bold">432</p>

            <p className="mt-3 text-sm text-green-600">+15%</p>
          </Card>

          <div className="rounded-3xl border bg-white p-3 shadow-2xl">
            <Image
              src="/dashboard-preview.png"
              alt="CRM Dashboard"
              width={1600}
              height={900}
              className="rounded-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;