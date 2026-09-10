"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { server } from "@/_api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldError } from "./_components/field-error";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default function LoginPage() {
  const [apiError, setApiError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const email = watch("email") || "";
  const password = watch("password") || "";

  const isValid = email.trim().length > 0 && password.trim().length > 0;

  const onSubmit = async (data, e) => {
    // Формын стандарт reload үйлдэгдлийг хориглоно
    if (e) e.preventDefault();
    setApiError("");

    try {
      const response = await server.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      // Зөвхөн амжилттай (status 200/201) хүсэлтийн дараа л шилжинэ
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user || {}));
        router.push("/");
      } else {
        setApiError("Invalid password. Try again.");
      }
    } catch (err) {
      console.error("Login Error:", err);

      if (err.response) {
        const status = err.response.status;
        const msg = err.response.data?.message || "Invalid email or password.";

        if (status === 404) {
          setError("email", { type: "manual", message: msg });
        } else if (status === 401) {
          setError("password", { type: "manual", message: msg });
        } else {
          setApiError(msg);
        }
      } else {
        // Сервэртэй холбогдохгүй эсвэл буруу байвал улаан алдаа харуулна
        setApiError("Invalid password. Try again.");
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
        <p className="text-sm text-gray-500">
          Log in to enjoy your Favorite Food.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-3">
          <div>
            <Input
              type="email"
              placeholder="Your email"
              {...register("email")}
              className={
                errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
              }
            />
            <FieldError message={errors.email?.message} />
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              className={
                errors.password || apiError
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }
            />
            <FieldError message={errors.password?.message} />
          </div>

          {/* Сервер болон нууц үгийн алдааг харуулах хэсэг */}
          <FieldError message={apiError} />

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-gray-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`w-full transition-colors ${
            isValid
              ? "bg-black text-white hover:bg-gray-800 cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200"
          }`}
        >
          {isSubmitting ? "Logging in..." : "Let's Go"}
        </Button>

        <div className="text-center text-sm text-gray-500 pt-2">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
