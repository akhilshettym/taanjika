"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";

import { AuthField } from "./auth-field";
import { GoogleAuthButton } from "./google-auth-button";

export function RegisterForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | undefined>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(undefined);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthField
          id="fullName"
          name="fullName"
          label="Full name"
          type="text"
          placeholder="Enter your full name"
          autoComplete="name"
          required
        />

        <AuthField
          id="email"
          name="email"
          label="Email address"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          required
        />

        <AuthField
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="Create a password"
          autoComplete="new-password"
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <AuthField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm password"
          type="password"
          placeholder="Re-enter your password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          error={error}
          required
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-stone-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
        >
          Create account
        </button>
      </form>

      <div className="relative flex items-center">
        <div className="grow border-t border-stone-200" />
        <span className="px-4 text-xs text-stone-400">OR</span>
        <div className="grow border-t border-stone-200" />
      </div>

      <GoogleAuthButton />

      <p className="text-center text-sm text-stone-500">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-semibold text-stone-900 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
