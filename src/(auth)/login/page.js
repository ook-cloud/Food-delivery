"use client";

import { useState } from "react";
import { Link } from "next/link";
import { LoginForm } from "./_features/login-form";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!email) {
      setErrors((prev) => ({ ...prev, email: "И-мэйл хаягаа оруулна уу" }));
      return;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Нууц үгээ оруулна уу" }));
      return;
    }

    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div>
      {/* Буцах товч */}
      <button 
        onClick={() => history.back()} 
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 mb-8"
      >
        ‹
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-1">Log in</h1>
      <p className="text-sm text-gray-500 mb-6">Log in to enjoy your favorite dishes.</p>

      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        errors={errors}
        onSubmit={handleSubmit}
        loading={loading}
      />

      <p className="text-center text-xs text-gray-500 mt-6">
        Don't have an account?{" "}
        <Link href="/signup" className="text-blue-600 font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}