"use client";

import { ArrowRightCircle, Mail, MessageSquare, Phone, StickyNote } from "lucide-react";
import React from "react";

const activities = [
  {
    icon: ArrowRightCircle,
    actor: "Marco Diehl",
    action: "moved Acme Co to Proposal",
    time: "Today, 10:42 AM",
  },
  {
    icon: Phone,
    actor: "Priya Nair",
    action: "logged a call with R. Osei (Kettlecorn)",
    time: "Today, 9:15 AM",
  },
  {
    icon: Mail,
    actor: "Aisha Rahman",
    action: "sent a follow-up email to T. Novak",
    time: "Yesterday, 4:20 PM",
  },
  {
    icon: StickyNote,
    actor: "Marco Diehl",
    action: "added a note to Bright Robotics",
    time: "Yesterday, 2:05 PM",
  },
  {
    icon: MessageSquare,
    actor: "Priya Nair",
    action: "sent a WhatsApp template to J. Alvarez",
    time: "Yesterday, 11:30 AM",
  },
  {
    icon: ArrowRightCircle,
    actor: "System",
    action: "marked M. Duarte (Argus Systems) as Won",
    time: "Jul 28, 2026",
  },
];

const ActivitiesPage = () => {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="relative">
        <div className="absolute bottom-0 left-[27px] top-0 w-px bg-border" />
        {activities.map((item, i) => (
          <div
            key={i}
            className="relative flex gap-4 px-5 py-4 border-b border-border last:border-0"
          >
            <div className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background">
              <item.icon
                className="h-4 w-4 text-[#8A5F06]"
                strokeWidth={1.75}
              />
            </div>
            <div className="min-w-0 flex-1 pt-1.5">
              <p className="text-sm">
                <span className="font-medium">{item.actor}</span>{" "}
                <span className="text-foreground/80">{item.action}</span>
              </p>
              <p className="mt-0.5 font-data text-xs text-muted-foreground">
                {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesPage;
