"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { SignupSchema } from "../features/SignupSchema";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { server } from "@/app/_api/Api";
import { useRouter } from "next/navigation";

export function SignupForm({ step, setStep }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    trigger,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignupSchema),
    mode: "onChange",
  });

  const handleNext = async () => {
    const isEmailValid = await trigger("email");
    if (isEmailValid) {
      setStep(2);
    }
  };

  const onSubmit = async (data) => {
    setApiError("");
    try {
      const response = await server.post("/auth/signup", {
        email: data.email,
        password: data.password,
      });

      if (response.status === 201) {
        // Бүртгүүлсний дараа Login хуудас руу шилжинэ
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        const status = err.response.status;
        const msg = err.response.data?.message;

        if (status === 409) {
          // Хэрэв имэйл бүртгэлтэй байвал Step 1 руу буцааж алдааг харуулна
          setStep(1);
          setError("email", {
            type: "manual",
            message: msg || "User already exists",
          });
        } else {
          setApiError(msg || "Signup failed");
        }
      } else {
        setApiError("Server error. Please check your connection.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {step === 1 && <StepOne register={register} errors={errors} />}

      {step === 2 && (
        <StepTwo
          register={register}
          errors={errors}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      )}

      {step === 1 ? (
        <Button
          type="button"
          onClick={handleNext}
          className="w-full py-6 text-base font-semibold rounded-xl bg-[#18181B] text-white hover:bg-slate-700 transition-colors cursor-pointer"
        >
          Next
        </Button>
      ) : (
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-6 text-base font-semibold rounded-xl bg-[#18181B] text-white hover:bg-slate-700 transition-colors cursor-pointer"
        >
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </Button>
      )}
    </form>
  );
}
