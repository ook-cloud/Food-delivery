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

// if (user.role !== "admin") {
//   return (
//     <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
//       <div className="rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
//         <p className="text-sm uppercase tracking-[0.2em] text-red-500">
//           Access denied
//         </p>
//         <h1 className="mt-3 text-3xl font-bold text-slate-900">Admin only</h1>
//         <p className="mt-2 text-slate-600">
//           Please sign in with an administrator account.
//         </p>
//         <Link
//           href="/login"
//           className="mt-5 inline-block rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
//         >
//           Go to login
//         </Link>
//       </div>
//     </main>
//   );
// }
