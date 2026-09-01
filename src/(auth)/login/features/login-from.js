"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mx-auto w-full max-w-100 space-y-6">
      {/* Back button */}
      <div>
        <Link href="/">
          <Button variant="outline" size="icon" className="h-9 w-9">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Heading */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
        <p className="text-sm text-gray-500">
          log in to enjoy your favorite dishes
        </p>
      </div>

      {/* Formside */}
      <form className="space-y-4">
        <div className="space-y-3">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="show-password"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label
              htmlFor="show-password"
              className="text-sm font-normal text-gray-600"
            >
              Show password
            </Label>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-gray-300 text-gray-700 hover:bg-gray-400"
        >
          Lets Go
        </Button>
      </form>

      {/* Down button */}
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
