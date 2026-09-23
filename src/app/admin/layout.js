import { Sidebar } from "./components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full bg-[#F4F4F5]">{children}</div>
  );
}
