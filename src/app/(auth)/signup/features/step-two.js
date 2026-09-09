"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Step 2 Validation Schema
const stepTwoSchema = z.object({
  name: z.string().min(2, { message: "Нэр хамгийн багадаа 2 тэмдэгт байна" }),
  password: z
    .string()
    .min(6, { message: "Нууц үг хамгийн багадаа 6 тэмдэгт байна" }),
});

export default function StepTwo({ formData, onBack, onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(stepTwoSchema),
    mode: "onChange",
    defaultValues: {
      name: formData.name || "",
      password: formData.password || "",
    },
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <div className="flex min-h-[500px] w-full max-w-[900px] overflow-hidden rounded-2xl bg-white shadow-xl">
      <div className="flex flex-1 flex-col justify-between p-8 sm:p-12">
        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-black transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <span className="text-sm font-medium text-gray-400">2 / 2</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Create a password
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Enter your details to finish signing up
          </p>

          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="mt-6 space-y-4"
          >
            <div>
              <input
                {...register("name")}
                type="text"
                placeholder="Name"
                className={cn(
                  "w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-all placeholder:text-gray-300",
                  errors.name
                    ? "border-red-500"
                    : "border-gray-200 focus:border-black",
                )}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={cn(
                    "w-full rounded-lg border px-3.5 py-2.5 pr-10 text-sm outline-none transition-all placeholder:text-gray-300",
                    errors.password
                      ? "border-red-500"
                      : "border-gray-200 focus:border-black",
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className={cn(
                "w-full rounded-lg py-2.5 text-sm font-semibold transition-all",
                isValid
                  ? "bg-black text-white hover:bg-gray-800"
                  : "cursor-not-allowed bg-gray-200 text-gray-400",
              )}
            >
              Create Account
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-black hover:underline">
            Log in
          </a>
        </p>
      </div>

      <div className="hidden flex-1 p-3 sm:block">
        <img
          src="https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1000&auto=format&fit=crop"
          alt="Delivery Driver"
          className="h-full w-full rounded-xl object-cover"
        />
      </div>
    </div>
  );
}
