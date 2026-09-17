"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginSchema } from "../_features/LoginSchema";
import { useEffect } from "react";

export function LoginForm() {
  const router = useRouter();
  const { login, user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  // State шинэчлэгдэж user.role === "admin" болмогц замаа шилжүүлнэ
  useEffect(() => {
    if (user?.role === "admin") {
      router.push("/admin");
    }
  }, [user, router]);

  const onSubmit = (data) => {
    login({
      id: "admin-1",
      name: "Admin User",
      email: data.email,
      role: "admin",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email address"
          {...register("email")}
          className={`w-full py-6 text-base rounded-xl border-slate-300 focus-visible:ring-slate-400 ${
            errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          {...register("password")}
          className={`w-full py-6 text-base rounded-xl border-slate-300 focus-visible:ring-slate-400 ${
            errors.password ? "border-red-500 focus-visible:ring-red-500" : ""
          }`}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <p className="text-lg font-normal tracking-normal align-middle underline underline-offset-0 decoration-solid font-sans cursor-pointer hover:text-slate-700">
        Forgot password?
      </p>

      <Button
        type="submit"
        className="w-full py-6 text-base font-semibold rounded-xl bg-[#18181B] text-white hover:bg-slate-700 transition-colors"
      >
        Let&apos;s Go
      </Button>
    </form>
  );
}
