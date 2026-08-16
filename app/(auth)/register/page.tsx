import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Create your account",
  description: "Start your free AFS Desk workspace.",
};

const RegisterPage = () => {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight">
        Create your account
      </h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Free for up to 100 leads. No credit card required.
      </p>

      <form className="mt-8 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              name="firstName"
              required
              placeholder="Jane"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              name="lastName"
              required
              placeholder="Cooper"
            />
          </div>
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

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
          />
          <p className="text-xs text-muted-foreground">Minimum 8 characters.</p>
        </div>

        <label className="flex items-start gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            name="terms"
            required
            className="mt-0.5 h-4 w-4 rounded border-border accent-[#EEB30D]"
          />
          <span>
            I agree to the{" "}
            <Link
              href="/terms"
              className="font-medium text-foreground hover:text-[#8A5F06]"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy-policy"
              className="font-medium text-foreground hover:text-[#8A5F06]"
            >
              Privacy Policy
            </Link>
          </span>
        </label>

        <Button
          type="submit"
          className="w-full bg-[#EEB30D] text-[#15130B] hover:bg-[#EEB30D]/90"
        >
          Create account
        </Button>
      </form>

      <div className="mt-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="font-data text-xs text-muted-foreground">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <Button variant="outline" className="mt-6 w-full">
        Continue with Google
      </Button>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-foreground hover:text-[#8A5F06]"
        >
          Log in
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
