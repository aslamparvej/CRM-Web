"use client";

import { useEffect } from "react";
// import { Metadata } from "next";
import { useRouter } from "next/navigation";

import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";

import { useAuthStore } from "@/store/auth.store";
import Loader from "@/components/common/Loader";
import AuthGuard from "@/components/auth/AuthGuard";

// export const metadata: Metadata = {
//   title: {
//     default: "Super Admin",
//     template: "%s | MyCRM",
//   },
//   description: "MyCRM Super Admin Portal",
// };

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {

  console.log("Admin Layout: Admin portal starts...");

  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return <Loader fullPage />;
  }



  return (
    <AuthGuard roles={["super_admin", "developer_admin"]}>
      <div className="min-h-screen bg-muted/30">
        {/* Desktop Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r bg-background lg:block">
          <Sidebar />
        </aside>

        {/* Main */}
        <div className="lg:pl-72">
          {/* Header */}
          <Header title="Super Admin Dashboard" />

          {/* Content */}
          <main className="p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
