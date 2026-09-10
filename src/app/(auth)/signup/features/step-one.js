"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldError } from "../../login/_components/field-error";

export function StepOne({ initialEmail, onNext }) {
  const [email, setEmail] = useState(initialEmail || "");
  const [error, setError] = useState("");

  // Email форматыг Regex-ээр шалгах
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleNextStep = () => {
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!isValidEmail) {
      setError("Invalid email. Use a format like example@email.com");
      return;
    }
    setError("");
    onNext(email.trim()); // Имэйлийг цааш нь эцэг компонент руу дамжуулна
  };

  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create your account
        </h1>
        <p className="text-sm text-gray-500">
          Sign up to explore your favorite dishes
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(""); // Бичиж эхлэхэд алдааг арилгана
            }}
            className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          <FieldError message={error} />
        </div>

        <Button
          type="button"
          onClick={handleNextStep}
          disabled={!isValidEmail}
          className={`w-full transition-colors ${
            isValidEmail
              ? "bg-black text-white hover:bg-gray-800 cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200"
          }`}
        >
          Let's Go
        </Button>
      </div>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-600 font-medium hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
