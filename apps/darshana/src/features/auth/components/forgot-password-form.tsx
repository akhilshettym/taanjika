"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthField } from "./auth-field";
import { forgotPasswordSchema, type ForgotPasswordValues } from "../schemas/auth.schema";
import { sendPasswordReset } from "../services/firebase-auth.service";

export function ForgotPasswordForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: ForgotPasswordValues) {
    setLoading(true);
    setMessage(null);
    try {
      await sendPasswordReset(values.email);
    } catch {
      /* Keep response generic to avoid email enumeration. */
    }
    setMessage("If an account exists for that email, a password-reset link will be sent.");
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <AuthField
        id="email"
        label="Email address"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
      {message ? (
        <p role="status" className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">
          {message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-stone-950 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send reset link"}
      </button>
    </form>
  );
}
