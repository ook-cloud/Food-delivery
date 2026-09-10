"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldError } from "../_components/field-error";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email. Use a format like example@email.com" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const email = watch("email") || "";
  const password = watch("password") || "";
  const isFilled =
    email.trim().length > 0 && password.length > 0 && !errors.email;

  const onSubmit = async (data) => {
    setApiError("");
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setApiError(result.message || "Login failed");
        return;
      }

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      router.push("/");
    } catch (err) {
      setApiError("Server error. Please check your connection.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <div>
        <Link href="/signup">
          <Button variant="outline" size="icon" className="h-9 w-9">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
        <p className="text-sm text-gray-500">
          Log in to enjoy your favorite dishes
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-3">
          <div>
            <Input
              type="text"
              placeholder="Enter your email address"
              {...register("email")}
              className={
                errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
              }
            />
            <FieldError message={errors.email?.message} />
          </div>

          <div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                className={
                  errors.password
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <FieldError message={errors.password?.message} />
          </div>

          <FieldError message={apiError} />
        </div>

        <Button
          type="submit"
          disabled={!isFilled || isSubmitting}
          className={`w-full transition-colors ${
            isFilled
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200"
          }`}
        >
          {isSubmitting ? "Logging in..." : "Let's Go"}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-blue-600 font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
