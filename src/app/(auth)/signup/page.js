"use client";

import { useState } from "react";
import { StepOne } from "./features/step-one";
import { StepTwo } from "./features/step-two";

function validateStepOne(data) {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Invalid email. Use a format like example@email.com";
  }
  return errors;
}

function validateStepTwo(data) {
  const errors = {};
  if (!data.password || data.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match. Try again.";
  }
  return errors;
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
