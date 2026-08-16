"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, MailCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ForgotPasswordPage = () => {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FDF3D9]">
          <MailCheck className="h-5 w-5 text-[#8A5F06]" strokeWidth={1.75} />
        </div>
        <h1 className="mt-5 font-display text-2xl font-semibold tracking-tight">
          Check your inbox
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          If an account exists for{" "}
          <span className="font-medium text-foreground">{email}</span>, we&apos;ve
          sent a link to reset your password.
        </p>
        <Link
          href="/login"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-[#8A5F06]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to log in
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight">
        Reset your password
      </h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Enter the email tied to your account and we&apos;ll send a reset link.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#EEB30D] text-[#15130B] hover:bg-[#EEB30D]/90"
        >
          Send reset link
        </Button>
      </form>

      <Link
        href="/login"
        className="mt-8 flex items-center justify-center gap-1.5 text-sm font-medium text-foreground hover:text-[#8A5F06]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to log in
      </Link>
    </div>
  );
};

export default ForgotPasswordPage;
