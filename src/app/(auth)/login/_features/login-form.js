"use client";

import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { server } from "@/app/_api/api";
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .pipe(z.email({ message: "Invalid email address." })),
  password: z.string().min(1, { message: "Password is required." }),
});

export const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const handleNextStep = async () => {
    const isValid = await trigger(["email", "password"]);
    const roleDecider = localStorage.getItem("user");

    const parsedData = JSON.parse(roleDecider);

    if (isValid) {
      if (parsedData.role === "admin") {
        router.push("/admin");
        console.log("admin");
      } else {
        router.push("/main");
        console.log("admin");
      }
    }
  };

  const handleToSignup = () => {
    router.push("/signup");
  };
  const handleToAdmin = () => {
    router.push("/admin");
  };

  const processForm = async (data) => {
    try {
      const response = await server.post("/auth/login", {
        email: data.email,
        password: data.password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      handleNextStep();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="w-104 gap-6 flex flex-col">
        <form
          onSubmit={handleSubmit(processForm)}
          className="flex flex-col gap-6"
        >
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Go back"
            onClick={handleToAdmin}
            className="rounded-md border-[#E4E4E7] cursor-pointer w-9 h-9"
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>

          <div className="w-104 flex flex-col gap-1">
            <p className="font-inter font-semibold text-[24px] leading-8 text-[#09090B]">
              Log in
            </p>
            <p className="font-inter font-normal text-[16px] leading-6 text-[#71717A]">
              Log in to enjoy your favorite dishes.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <Input
              id="input-field-email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email address"
              className={`shadow-none rounded-md font-inter font-normal text-[14px] leading-5 border-[#E4E4E7] w-104 h-9 ${
                errors?.email ? "border-red-500 focus-visible:ring-red-500" : ""
              }`}
              {...register("email")}
            />
            {errors?.email && (
              <p className="text-xs font-medium text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Input
              id="input-field-password"
              type="password"
              autoComplete="current-password"
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

          <div className="flex justify-end">
            <button
              type="button"
              className="font-inter font-normal text-[14px] text-[#71717A] hover:text-[#09090B] hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#18181B] hover:bg-[#27272a] rounded-md font-inter font-medium text-[14px] leading-5 text-[#FAFAFA] cursor-pointer w-104 h-9"
          >
            Let&apos;s Go
          </Button>

          <div className="w-104 h-6 flex gap-2 items-center justify-center">
            <p className="font-inter font-normal text-[14px] text-[#71717A]">
              Don’t have an account?
            </p>
            <p
              onClick={handleToSignup}
              className="font-inter font-medium text-[14px] text-[#2563EB] hover:underline cursor-pointer"
            >
              Sign up
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
