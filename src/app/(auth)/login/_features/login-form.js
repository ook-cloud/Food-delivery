"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/providers/auth-provider";
import { FieldError } from "../_components/field-error";
import { fetcher } from "@/lib/api";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await fetcher("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      login(data.token, data.user);
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const isFilled = email.trim().length > 0 && password.length > 0;

  return (
    <div className="space-y-6">
      <Link href="/">
        <Button variant="outline" size="icon" className="h-9 w-9">
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </Link>

      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
        <p className="text-sm text-gray-500">
          Log in to enjoy your favorite dishes
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        <FieldError message={error} />

        <Button
          type="submit"
          disabled={!isFilled}
          className="w-full bg-black text-white hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
        >
          Let's Go
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="text-blue-600 font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
