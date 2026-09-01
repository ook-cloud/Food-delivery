"use client";

import { FieldError } from "../_components/field-error";

interface LoginFormProps {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  errors: { email?: string; password?: string };
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  errors,
  onSubmit,
  loading,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black placeholder-gray-400"
          placeholder="Enter your email address"
        />
        <FieldError message={errors.email} />
      </div>

      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black placeholder-gray-400"
          placeholder="Password"
        />
        <FieldError message={errors.password} />
      </div>

      <div className="flex justify-start">
        <a href="#" className="text-xs font-semibold text-gray-900 underline hover:opacity-80">
          Forgot password ?
        </a>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gray-300 hover:bg-black text-white font-medium py-3 rounded-lg text-sm transition-colors disabled:opacity-50 mt-2"
      >
        {loading ? "Loading..." : "Let's Go"}
      </button>
    </form>
  );
}