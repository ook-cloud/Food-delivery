"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { StepOne } from "./_features/step-one";
import { StepTwo } from "./_features/step-two";
import { StepDots } from "./_components/step-dots";
import { useAuth } from "@/providers/auth-provider";
import { fetcher } from "@/lib/api";

const signupSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email. Use a format like example@email.com" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match. Try again.",
    path: ["confirmPassword"],
  });

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [apiError, setApiError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const handleNext = async () => {
    const isValid = await trigger("email");
    if (isValid) setStep(2);
  };

  const handleBack = () => setStep(1);

  const onSubmit = async (data) => {
    setApiError("");
    try {
      // Backend-ийн /auth/signup руу шууд хүсэлт явуулна
      const result = await fetcher("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      login(result.token, result.user);
      router.push("/main");
    } catch (err) {
      if (err.message.includes("409") || err.message.includes("exists")) {
        setStep(1);
        setError("email", {
          type: "manual",
          message: "И-мэйл бүртгэгдсэн байна",
        });
      } else {
        setApiError(err.message || "Бүртгүүлэхэд алдаа гарлаа");
      }
    }
  };

  return (
    <div className="w-full">
      <StepDots currentStep={step} totalSteps={2} />
      {step === 1 ? (
        <StepOne
          register={register}
          errors={errors}
          onNext={handleNext}
          watch={watch}
        />
      ) : (
        <StepTwo
          register={register}
          errors={{
            ...errors,
            apiError: apiError ? { message: apiError } : undefined,
          }}
          onBack={handleBack}
          onSubmit={handleSubmit(onSubmit)}
          watch={watch}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
