"use client";

import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";

export default function Layout({ children }) {
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
