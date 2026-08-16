"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    setError("");
    setDone(true);
  }

  if (done) {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FDF3D9]">
          <CheckCircle2 className="h-5 w-5 text-[#8A5F06]" strokeWidth={1.75} />
        </div>
        <h1 className="mt-5 font-display text-2xl font-semibold tracking-tight">
          Password updated
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          You can now log in with your new password.
        </p>
        <Button className="mt-8 w-full bg-[#EEB30D] text-[#15130B] hover:bg-[#EEB30D]/90">
          <Link href="/login">Go to log in</Link>
        </Button>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="text-center">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Link invalid or expired
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          This password reset link is no longer valid. Request a new one to
          continue.
        </p>
        <Button className="mt-8 w-full" variant="outline">
          <Link href="/forgot-password">Request a new link</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight">
        Set a new password
      </h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Choose a new password for your account.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="password">New password</Label>
          <Input
            id="password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm new password</Label>
          <Input
            id="confirmPassword"
            type="password"
            required
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button
          type="submit"
          className="w-full bg-[#EEB30D] text-[#15130B] hover:bg-[#EEB30D]/90"
        >
          Update password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
