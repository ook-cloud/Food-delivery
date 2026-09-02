"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldError } from "../../login/_components/field-error";

export function StepOne({ formData, setFormData, errors, onNext }) {
  const handleEmailChange = (e) => {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
  };

  const isFilled = formData.email.trim().length > 0 && !errors.email;

  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <div>
        <Link href="/login">
          <Button variant="outline" size="icon" className="h-9 w-9">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>

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
            type="text"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleEmailChange}
            className={
              errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
            }
          />
          <FieldError message={errors.email} />
        </div>

        <Button
          type="button"
          onClick={onNext}
          disabled={!isFilled}
          className={`w-full transition-colors ${
            isFilled
              ? "bg-black text-white hover:bg-gray-800"
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
