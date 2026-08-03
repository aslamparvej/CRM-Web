"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "submitting" | "success" | "error";

const ContactForm = ()=> {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form)),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center">
        <CheckCircle2 className="h-8 w-8 text-[#8A5F06]" />
        <p className="mt-4 font-display text-lg font-semibold">Message sent</p>
        <p className="mt-1 text-sm text-muted-foreground">
          We&apos;ll get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-1">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required placeholder="Jane Cooper" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
          />
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input id="company" name="company" placeholder="Company name" />
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor="message">How can we help?</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={10}
          style={{resize: "none"}}
          className="min-h-40"
          placeholder="Tell us about your team and what you're looking for..."
        />
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-destructive">
          Something went wrong sending your message. Please try again.
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full bg-[#EEB30D] text-[#15130B] hover:bg-[#EEB30D]/90"
      >
        {status === "submitting" && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        Send message
      </Button>
    </form>
  );
}

export default ContactForm;