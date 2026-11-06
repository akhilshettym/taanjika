"use client";

import Link from "next/link";
import type { FormEvent } from "react";

import { AuthField } from "./auth-field";
import { GoogleAuthButton } from "./google-auth-button";

export function SignInForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-5">
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
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-stone-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
        >
          Sign in
        </button>
      </form>

      <div className="relative flex items-center">
        <div className="grow border-t border-stone-200" />
        <span className="px-4 text-xs text-stone-400">OR</span>
        <div className="grow border-t border-stone-200" />
      </div>

      <GoogleAuthButton />

      <p className="text-center text-sm text-stone-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-stone-900 hover:underline">
          Create account
        </Link>
      </p>
    </div>
  );
}
