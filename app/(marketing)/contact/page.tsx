import type { Metadata } from "next";
import { Mail, MessageSquare, Clock, Phone, MapPin } from "lucide-react";

import ContactForm from "@/components/landing/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to the MyCRM team about sales, support, or partnerships.",
};

const channels = [
  {
    icon: MessageSquare,
    title: "Talk to sales",
    description: "Questions about plans, seats, or migrating from another CRM.",
  },
  {
    icon: Mail,
    title: "Get support",
    description: "Already a customer? We usually reply within a few hours.",
  },
  {
    icon: Clock,
    title: "Response time",
    description: "Monday–Friday, 9am–6pm. Most messages answered same day.",
  },
];

const ContactPage = () => {
  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2">
        <div>
          <p className="font-data text-xs uppercase tracking-wider text-[#8A5F06]">
            Contact
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            Let&apos;s talk about your pipeline
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Whether you&apos;re comparing CRMs or already stuck somewhere, tell
            us what&apos;s going on and we&apos;ll point you in the right
            direction.
          </p>

          <div className="mt-10 space-y-6">
            {channels.map((channel) => (
              <div key={channel.title} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FDF3D9]">
                  <channel.icon
                    className="h-5 w-5 text-[#8A5F06]"
                    strokeWidth={1.75}
                  />
                </div>
                <div>
                  <p className="font-medium">{channel.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {channel.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Company Info  */}
          <div className="mt-12">
            <h3 className="text-sm font-medium">Contact Information</h3>

            <div className="mt-6 space-y-4">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FDF3D9]">
                  <Mail className="h-5 w-5 text-[#8A5F06]" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">
                    support@mycrm.com
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FDF3D9]">
                  <Phone
                    className="h-5 w-5 text-[#8A5F06]"
                    strokeWidth={1.75}
                  />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FDF3D9]">
                  <MapPin
                    className="h-5 w-5 text-[#8A5F06]"
                    strokeWidth={1.75}
                  />
                </div>
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">
                    Kolkata, West Bengal, 700 012
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
};

export default ContactPage;
