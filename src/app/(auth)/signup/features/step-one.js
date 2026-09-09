"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Step 1 Validation Schema
const stepOneSchema = z.object({
  email: z
    .string()
    .min(1, { message: "И-мэйл хаягаа оруулна уу" })
    .email({ message: "Зөв и-мэйл хаяг оруулна уу" }),
});

export default function StepOne({ formData, onNext }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(stepOneSchema),
    mode: "onChange",
    defaultValues: { email: formData.email || "" },
  });

  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <div className="flex min-h-[500px] w-full max-w-[900px] overflow-hidden rounded-2xl bg-white shadow-xl">
      <div className="flex flex-1 flex-col justify-between p-8 sm:p-12">
        <div>
          <span className="text-sm font-medium text-gray-400">1 / 2</span>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Sign up to explore your favorite dishes
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <div>
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className={cn(
                  "w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-all placeholder:text-gray-300",
                  errors.email
                    ? "border-red-500"
                    : "border-gray-200 focus:border-black",
                )}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all",
                isValid
                  ? "bg-black text-white hover:bg-gray-800"
                  : "cursor-not-allowed bg-gray-200 text-gray-400",
              )}
            >
              Continue
              <ArrowRight className="h-4 w-4" />
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
