"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { StepOne } from "./_features/StepOne";
import { StepTwo } from "./_features/StepTwo";
import { useRouter } from "next/navigation";
import { server } from "../../_api/api";
const Schema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .pipe(z.email({ message: "Invalid email address." })),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
    mode: "onTouched",
  });

  const handleNextStepEmail = async () => {
    const isValid = await trigger(["email"]);
    if (isValid) {
      setStep(2);
    }
  };
  const handleNextStepPassword = async () => {
    const isValid = await trigger(["password"]);
    if (isValid) {
      router.push("/admin");
    }
  };

  const processForm = async (data) => {
    try {
      const response = await server.post("/auth/signup", {
        email: data.email,
        password: data.password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (err) {
      console.log(err);
    }
  };
  const toLogin = () => {
    router.push("/login");
  };
  return (
    <div className="w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit(processForm)}
        className="w-full max-w-md"
        noValidate
      >
        {step === 1 && (
          <StepOne
            register={register}
            errors={errors}
            onNext={handleNextStepEmail}
            functionNext={handleNextStepEmail}
            functionLogin={toLogin}
          />
        )}

        {step === 2 && (
          <StepTwo
            register={register}
            errors={errors}
            onBack={() => setStep(1)}
            functionNext={handleNextStepPassword}
          />
        )}
      </form>
    </div>
  );
}
