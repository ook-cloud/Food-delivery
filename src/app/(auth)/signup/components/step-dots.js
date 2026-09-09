import React from "react";

export default function StepDots({ currentStep, totalSteps = 2 }) {
  return (
    <div className="flex items-center justify-center gap-2 pt-2">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        return (
          <div
            key={stepNumber}
            className={`h-2 rounded-full transition-all duration-300 ${
              isActive ? "w-6 bg-black" : "w-2 bg-gray-300"
            }`}
          />
        );
      })}
    </div>
  );
}
