"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

import authService from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { saveToken } from "@/services/storage.service";

const LoginForm = () => {
  const { login, isAuthenticated, isLoading, setLoading } = useAuthStore();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/admin");
    }
  }, [isAuthenticated, router]);

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.login(formData);
      if (response.success) {
        saveToken(response.data.accessToken);
        login(
          response.data.user,
          response.data.accessToken,
          response.data.refreshToken,
        );
        router.replace("/admin");
      }
    } catch (error: any) {
      console.error("Status:", error.response?.status);
      console.error("Data:", error.response?.data);
      console.error("Message:", error.message);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight">
        Welcome back
      </h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Log in to pick up right where your pipeline left off.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-[#8A5F06] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            type="password"
            required
            placeholder="••••••••"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            name="remember"
            checked={formData.remember}
            onChange={handleInputChange}
            className="h-4 w-4 rounded border-border accent-[#EEB30D]"
          />
          Keep me logged in
        </label>

        <Button
          disabled={isLoading}
          type="submit"
          className="w-full bg-[#EEB30D] text-[#15130B] hover:bg-[#EEB30D]/90"
        >
          {isLoading ? "Logging in..." : "Log in"}
        </Button>
      </form>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <div className="mt-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="font-data text-xs text-muted-foreground">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <Button variant="outline" className="mt-6 w-full">
        Continue with Google
      </Button>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-foreground hover:text-[#8A5F06]"
        >
          Sign up free
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
