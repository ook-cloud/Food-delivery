"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { StepOne } from "./features/step-one";
import { StepTwo } from "./features/step-two";
import { StepDots } from "./components/step-dots";

const signupSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const handleStepOneNext = (emailValue) => {
    setValue("email", emailValue, { shouldValidate: true });
    setStep(2);
  };

  const handleBack = () => setStep(1);

  const onSubmit = async (data) => {
    setApiError("");
    router.push("/login");
  };

  return (
    <div className="w-full">
      <StepDots currentStep={step} totalSteps={2} />
      {step === 1 ? (
        <StepOne initialEmail={watch("email")} onNext={handleStepOneNext} />
      ) : (
        <StepTwo
          register={register}
          control={control}
          errors={{
            ...errors,
            apiError: apiError ? { message: apiError } : undefined,
          }}
          onBack={handleBack}
          onSubmit={handleSubmit(onSubmit)}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
