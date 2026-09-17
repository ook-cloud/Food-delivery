"use client";

import { useAuth } from "@/providers/AuthProvider";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }) {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && user?.role !== "admin") {
      router.replace("/login");
    }
  }, [ready, user, router]);

  if (!ready) return null;
  if (user?.role !== "admin") return null;

  return (
    <div className="flex min-h-svh bg-[#F4F4F5]">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 px-4 pb-12 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
