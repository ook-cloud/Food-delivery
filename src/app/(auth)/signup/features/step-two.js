"use client";

import { useState } from "react";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldError } from "../../login/_components/field-error";

export function StepTwo({
  register,
  errors,
  onBack,
  onSubmit,
  watch,
  isSubmitting,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const password = watch("password") || "";
  const confirmPassword = watch("confirmPassword") || "";
  const isFilled = password.length >= 8 && confirmPassword.length > 0;

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
          Must be at least 8 characters long with a special character.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-3">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className={
                errors.password
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              {...register("confirmPassword")}
              className={
                errors.confirmPassword || errors.password
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }
            />
          </div>

          <FieldError
            message={
              errors.password?.message || errors.confirmPassword?.message
            }
          />
          <FieldError message={errors.apiError?.message} />

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
          disabled={!isFilled || isSubmitting}
          className={`w-full transition-colors ${
            isFilled
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200"
          }`}
        >
          {isSubmitting ? "Creating..." : "Let's Go"}
        </Button>
      </form>
    </div>
  );
}
