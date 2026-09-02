"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "../_components/field-error";

export function LoginForm() {
  const [step, setStep] = useState(1); // 1: Email, 2: Password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // И-мэйл шалгах
  const validateEmail = (val) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  // STEP 1: И-мэйл шалгаж шилжих
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email. Use a format like example@email.com");
      return;
    }
    setError("");
    setStep(2);
  };

  // STEP 2: Нууц үг баталгаажуулах болон Алдаа шалгах
  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Try again.");
      return;
    }

    // Амжилттай нэвтэрч LocalStorage-д хадгалаад / (main) руу шилжих (Filled)
    localStorage.setItem("user", JSON.stringify({ email }));
    router.push("/");
  };

  const handleBack = () => {
    setStep(1);
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  // Товчлуурын идэвхтэй төлөвүүд
  const isEmailFilled = email.trim().length > 0 && !error;
  const isPasswordFilled =
    password.trim().length > 0 && confirmPassword.trim().length > 0;

  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      {/* Буцах товч */}
      <div>
        {step === 2 ? (
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={handleBack}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        ) : (
          <Link href="/">
            <Button variant="outline" size="icon" className="h-9 w-9">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>

      {/* Гарчиг болон Текст */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          {step === 1 ? "Create your account" : "Create a strong password"}
        </h1>
        <p className="text-sm text-gray-500">
          {step === 1
            ? "Sign up to explore your favorite dishes"
            : "Create a strong password with at least 8 characters."}
        </p>
      </div>

      {/* STEP 1: Email input */}
      {step === 1 && (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="space-y-1">
            <Input
              type="text"
              placeholder="Enter your email address"
              value={email}
              onChange={handleEmailChange}
              className={
                error ? "border-red-500 focus-visible:ring-red-500" : ""
              }
            />
            <FieldError message={error} />
          </div>

          <Button
            type="submit"
            disabled={!isEmailFilled}
            className={`w-full transition-colors ${
              isEmailFilled
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200"
            }`}
          >
            Let's Go
          </Button>
        </form>
      )}

      {/* STEP 2: Create / Enter Password (Destructive & Show/Hide Password states) */}
      {step === 2 && (
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div className="space-y-3">
            <div>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                className={
                  error ? "border-red-500 focus-visible:ring-red-500" : ""
                }
              />
            </div>

            <div>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (error) setError("");
                }}
                className={
                  error ? "border-red-500 focus-visible:ring-red-500" : ""
                }
              />
            </div>

            {/* Destructive: Алдаа илэрсэн үед сануулга заах */}
            <FieldError message={error} />

            {/* Show & Hide Password toggle */}
            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="show-password"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 cursor-pointer"
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
            disabled={!isPasswordFilled}
            className={`w-full transition-colors ${
              isPasswordFilled
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200"
            }`}
          >
            Lets Go
          </Button>
        </form>
      )}

      {/* Доод линк */}
      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/signup"
          className="text-blue-600 font-medium hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
