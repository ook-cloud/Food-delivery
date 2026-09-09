"use client";

import React, { useState } from "react";
import StepOne from "./_features/step-one";
import StepTwo from "./_features/step-two";
import StepDots from "./_components/step-dots";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleStepOneNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleStepTwoSubmit = (data) => {
    const finalData = { ...formData, ...data };
    console.log("Бүртгэлийн мэдээлэл баталгаажлаа:", finalData);
    alert("Амжилттай бүртгэгдлээ!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="flex flex-col items-center space-y-4 w-full">
        {step === 1 && (
          <StepOne formData={formData} onNext={handleStepOneNext} />
        )}

        {step === 2 && (
          <StepTwo
            formData={formData}
            onBack={() => setStep(1)}
            onSubmit={handleStepTwoSubmit}
          />
        )}

        <StepDots currentStep={step} totalSteps={2} />
      </div>
    </div>
  );
}
