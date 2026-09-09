"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function MainPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6 text-center">
      <h1 className="text-3xl font-bold">Тавтай морил! 🎉</h1>
      <p className="text-gray-600">Та амжилттай нэвтэрлээ.</p>

      <div className="pt-4">
        <Button onClick={handleLogout} variant="destructive">
          Гарах (Logout)
        </Button>
      </div>
    </div>
  );
}
