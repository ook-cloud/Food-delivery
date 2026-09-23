"use client";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const StepOne = ({ functionNext, register, errors, functionLogin }) => {
  return (
    <div>
      <div className="w-104 gap-6 flex flex-col">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Back"
          className="rounded-md border-[#E4E4E7] cursor-pointer w-9 h-9"
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>

        <div className="w-104 flex flex-col gap-1">
          <p className="font-inter font-semibold text-[24px] leading-8 text-[#09090B]">
            Create your account
          </p>
          <p className="font-inter font-normal text-[16px] leading-6 text-[#71717A]">
            Sign up to explore your favorite dishes.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <Input
            id="input-field-email"
            placeholder="Enter your email address"
            className={`shadow-none rounded-md font-inter font-normal text-[14px] leading-5 border-[#E4E4E7] w-104 h-9 ${
              errors?.email ? "border-red-500 focus-visible:ring-red-500" : ""
            }`}
            type="email"
            {...register("email")}
          />
          {errors?.email && (
            <p className="text-xs font-medium text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <Button
          type="button"
          onClick={functionNext}
          className="bg-[#18181B] hover:bg-[#27272a] rounded-md font-inter font-medium text-[14px] leading-5 text-[#FAFAFA] cursor-pointer w-104 h-9"
        >
          Let&apos;s Go
        </Button>

        <div className="w-104 h-6 flex gap-2 items-center justify-center">
          <p className="font-inter font-normal text-[14px] text-[#71717A]">
            Already have an account?
          </p>
          <p
            className="font-inter font-medium text-[14px] text-[#2563EB] hover:underline cursor-pointer"
            onClick={functionLogin}
          >
            Log in
          </p>
        </div>
      </div>
    </div>
  );
};
