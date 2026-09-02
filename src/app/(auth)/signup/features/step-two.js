"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldError } from "../../login/_components/field-error";

export function StepTwo({ formData, setFormData, errors, onBack, onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  const isFilled =
    formData.password?.trim().length > 0 &&
    formData.confirmPassword?.trim().length > 0;

  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <div>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9"
          onClick={onBack}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create a strong password
        </h1>
        <p className="text-sm text-gray-500">
          Create a strong password with at least 8 characters.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-3">
          <div>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              className={
                errors.password
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }
            />
          </div>

          <div>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={formData.confirmPassword || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className={
                errors.confirmPassword || errors.password
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }
            />
          </div>

          <FieldError message={errors.password || errors.confirmPassword} />

          <div className="flex items-center space-x-2 pt-1">
            <Checkbox
              id="show-password"
              checked={showPassword}
              onCheckedChange={(checked) => setShowPassword(!!checked)}
            />
            <Label
              htmlFor="show-password"
              className="text-sm font-normal text-gray-600 cursor-pointer"
            >
              Show password
            </Label>
          </div>
        </div>

        <Button
          type="submit"
          disabled={!isFilled}
          className={`w-full transition-colors ${
            isFilled
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200"
          }`}
        >
          Lets Go
        </Button>
      </form>
    </div>
  );
}
