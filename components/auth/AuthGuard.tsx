"use client";

import { usePathname, useRouter } from "next/navigation";

import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  roles?: string[];
}

export default function AuthGuard({ children, roles }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/login?redirect=${pathname}`);
      return;
    }

    if (roles && user && !roles.includes(user.role)) {
      router.replace("/403");
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return null;
  }

  if (roles && user && !roles.includes(user.role)) {
    return null;
  }

  return children;
}

// <AuthGuard roles={["SUPER_ADMIN", "ADMIN"]}>
//     {children}
// </AuthGuard>
