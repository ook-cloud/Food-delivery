import { useAuth } from "@/providers/auth-provider";

export function AdminTopbar() {
  const { logout } = useAuth();
  return (
    <header className="flex h-16 items-center justify-end px-4 sm:px-6">
      <div
        onClick={logout}
        className="size-9 rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-500 ring-2 ring-white cursor-pointer"
      >
        {/* user avatar */}
      </div>
    </header>
  );
}