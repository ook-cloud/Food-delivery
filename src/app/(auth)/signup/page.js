"use client";

import { useState } from "react";
import { z } from "zod";
import { StepOne } from "./features/step-one";
import { StepTwo } from "./features/step-two";

const stepOneSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email. Use a format like example@email.com" }),
});

const stepTwoSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match. Try again.",
    path: ["confirmPassword"],
  });

function validateStepOne(data) {
  const result = stepOneSchema.safeParse(data);
  if (!result.success) {
    const formattedErrors = {};
    result.error.issues.forEach((issue) => {
      formattedErrors[issue.path[0]] = issue.message;
    });
    return formattedErrors;
  }
  return {};
}

function validateStepTwo(data) {
  const result = stepTwoSchema.safeParse(data);
  if (!result.success) {
    const formattedErrors = {};
    result.error.issues.forEach((issue) => {
      formattedErrors[issue.path[0]] = issue.message;
    });
    return formattedErrors;
  }
  return {};
}

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const errs = validateStepOne(formData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleBack = () => {
    setErrors({});
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validateStepTwo(formData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    console.log("Signup submitted:", {
      email: formData.email,
      password: formData.password,
    });
  };

  return step === 1 ? (
    <StepOne
      formData={formData}
      setFormData={setFormData}
      errors={errors}
      onNext={handleNext}
    />
  ) : (
    <StepTwo
      formData={formData}
      setFormData={setFormData}
      errors={errors}
      onBack={handleBack}
      onSubmit={handleSubmit}
    />
  );
}
