"use client";

import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

export default function AdminLayout({ children }) {
  const { user } = useAuth();

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

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      <aside className="w-72 border-r border-black bg-mist-100 text-white">
        <div className="mb-8">
          <div className="pt-8 mb-10 flex items-center justify-center gap-30 px-10">
            <Image
              src="/pictures/Logo.png"
              alt="NomNom Logo"
              width={165}
              height={44}
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex items-center justify-center  gap-2">
            <LayoutDashboard className="w-6 h-6 text-black" />
            <h1 className="text-black ">Food menu</h1>
          </div>
          <nav className="space-y-2">
            {[
              ["Food menu", "/admin/food-menu"],
              ["Orders", "/admin/orders"],
              ["Settings", "/admin/settings"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="flex items-center rounded-xl px-4 py-3 text-sm font-medium text-black transition hover:bg-slate-800 hover:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
