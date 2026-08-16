"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, MailCheck, XCircle } from "lucide-react";

type State = "pending" | "verifying" | "success" | "error";

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [state, setState] = useState<State>(token ? "verifying" : "pending");
  const [resent, setResent] = useState(false);

  useEffect(() => {
    if (!token) return;
    const timer = setTimeout(() => {
      setState(token === "invalid" ? "error" : "success");
    }, 1200);
    return () => clearTimeout(timer);
  }, [token]);

  if (state === "verifying") {
    return (
      <div className="text-center">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#EEB30D]" />
        <h1 className="mt-5 font-display text-2xl font-semibold tracking-tight">
          Verifying your email
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          This should only take a moment.
        </p>
      </div>
    );
  }

  if (state === "success") {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FDF3D9]">
          <CheckCircle2 className="h-5 w-5 text-[#8A5F06]" strokeWidth={1.75} />
        </div>
        <h1 className="mt-5 font-display text-2xl font-semibold tracking-tight">
          Email verified
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Your account is confirmed. Let&apos;s set up your workspace.
        </p>
        <Button
          className="mt-8 w-full bg-[#EEB30D] text-[#15130B] hover:bg-[#EEB30D]/90"
        >
          <Link href="/onboarding">Continue to onboarding</Link>
        </Button>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
          <XCircle className="h-5 w-5 text-destructive" strokeWidth={1.75} />
        </div>
        <h1 className="mt-5 font-display text-2xl font-semibold tracking-tight">
          Verification link expired
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          This link is no longer valid. We can send you a new one.
        </p>
        <Button
          onClick={() => setResent(true)}
          disabled={resent}
          className="mt-8 w-full bg-[#EEB30D] text-[#15130B] hover:bg-[#EEB30D]/90"
        >
          {resent ? "Verification email sent" : "Resend verification email"}
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FDF3D9]">
        <MailCheck className="h-5 w-5 text-[#8A5F06]" strokeWidth={1.75} />
      </div>
      <h1 className="mt-5 font-display text-2xl font-semibold tracking-tight">
        Confirm your email
      </h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        We&apos;ve sent a confirmation link to your inbox. Click it to activate your
        account.
      </p>
      <Button
        variant="outline"
        onClick={() => setResent(true)}
        disabled={resent}
        className="mt-8 w-full"
      >
        {resent ? "Email resent" : "Resend email"}
      </Button>
      <Link
        href="/login"
        className="mt-6 block text-sm font-medium text-foreground hover:text-[#8A5F06]"
      >
        Back to log in
      </Link>
    </div>
  );
};

export default VerifyEmailPage;
