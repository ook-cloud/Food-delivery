"use client";

import { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const StepTwo = ({ register, errors, onBack, functionNext }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="w-104 gap-6 flex flex-col">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Back to step 1"
          className="rounded-md border-[#E4E4E7] cursor-pointer w-9 h-9"
          onClick={onBack}
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </Button>
        <div className="w-104 flex flex-col gap-1">
          <p className="font-inter font-semibold text-[24px] leading-8 text-[#09090B]">
            Create a strong password
          </p>
          <p className="font-inter font-normal text-[16px] leading-6 text-[#71717A]">
            Create a strong password with letters and numbers.
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          <Input
            id="input-field-password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`shadow-none rounded-md font-inter font-normal text-[14px] leading-5 border-[#E4E4E7] w-104 h-9 ${
              errors?.password
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }`}
            {...register("password")}
          />
          {errors?.password && (
            <p className="text-xs font-medium text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Input
            id="input-field-confirm-password"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            className={`shadow-none rounded-md font-inter font-normal text-[14px] leading-5 border-[#E4E4E7] w-104 h-9 ${
              errors?.confirmPassword
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }`}
            {...register("confirmPassword")}
          />
          {errors?.confirmPassword && (
            <p className="text-xs font-medium text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <Checkbox
            id="show-password"
            checked={showPassword}
            onCheckedChange={(checked) => setShowPassword(!!checked)}
            className="w-4 h-4 rounded-sm border border-[#09090B80] bg-white cursor-pointer"
          />
          <Label
            htmlFor="show-password"
            className="font-inter font-normal text-[14px] leading-none text-[#71717A] cursor-pointer"
          >
            Show password
          </Label>
        </div>

        <Button
          onClick={functionNext}
          type="submit"
          className="bg-[#18181B] hover:bg-[#27272a] rounded-md font-inter font-medium text-[14px] leading-5 text-[#FAFAFA] cursor-pointer w-104 h-9"
        >
          Let&apos;s Go
        </Button>

        <div className="w-104 h-6 flex gap-2 items-center justify-center">
          <p className="font-inter font-normal text-[14px] text-[#71717A]">
            Already have an account?
          </p>
          <p className="font-inter font-medium text-[14px] text-[#2563EB] hover:underline cursor-pointer">
            Log in
          </p>
        </div>
      </div>
    </div>
  );
};
