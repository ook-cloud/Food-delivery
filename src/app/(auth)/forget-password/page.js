"use client";

import React, { useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isValid = /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="flex min-h-[500px] w-full max-w-[900px] overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex flex-1 flex-col justify-between p-8 sm:p-12">
          <div>
            <a
              href="/login"
              className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-black transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" /> Back to login
            </a>

            {!isSubmitted ? (
              <>
                <h2 className="text-2xl font-bold text-gray-900">
                  Reset password
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  Enter your email address and we'll send you a link to reset
                  your password.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none transition-all placeholder:text-gray-300 focus:border-black"
                    required
                  />

                  <button
                    type="submit"
                    disabled={!isValid}
                    className={`w-full rounded-lg py-2.5 text-sm font-semibold transition-all ${
                      isValid
                        ? "bg-black text-white hover:bg-gray-800"
                        : "cursor-not-allowed bg-gray-200 text-gray-400"
                    }`}
                  >
                    Send reset link
                  </button>
                </form>
              </>
            ) : (
              <div className="mt-8 flex flex-col items-center text-center">
                <CheckCircle2 className="h-12 w-12 text-green-500 mb-3" />
                <h3 className="text-xl font-bold text-gray-900">
                  Check your email
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  We sent a reset link to{" "}
                  <span className="font-medium text-gray-700">{email}</span>
                </p>
              </div>
            )}
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            Remembered your password?{" "}
            <a href="/login" className="font-medium text-black hover:underline">
              Log in
            </a>
          </p>
        </div>

        <div className="hidden flex-1 p-3 sm:block">
          <img
            src="https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1000&auto=format&fit=crop"
            alt="Delivery Driver"
            className="h-full w-full rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}
