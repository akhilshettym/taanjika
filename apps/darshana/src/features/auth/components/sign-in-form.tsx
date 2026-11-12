"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthField } from "./auth-field";
import { PasswordInput } from "./password-input";
import { GoogleAuthButton } from "./google-auth-button";
import { signInSchema, type SignInFormValues } from "../schemas/auth.schema";
import { signInWithEmailPassword } from "../services/firebase-auth.service";
import { authApi, AuthApiError } from "../services/auth-api.service";
import { CustomButton } from "@/components/ui/CustomButton";

export function SignInForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: SignInFormValues) {
    setSubmitting(true);
    setServerError(null);
    try {
      const user = await signInWithEmailPassword(values.email, values.password);

      if (!user.emailVerified) {
        router.push("/verify-email");
        return;
      }

      const profile = await authApi.getMe(user);

      if (profile.status !== "ACTIVE") {
        setServerError("Your Taanjika account is not currently active. Please contact support.");
        return;
      }

      if (profile.roles.includes("ADMIN")) router.push("/admin");
      else if (profile.roles.includes("ARTIST")) router.push("/artist");
      else if (profile.artistApplicationStatus === "PENDING")
        router.push("/artist/application-status");
      else router.push("/");
    } catch (error) {
      if (error instanceof AuthApiError && error.status === 404) {
        router.push("/register?completeProfile=1");
      } else {
        setServerError("We couldn't sign you in. Check your details and try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
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

        <div className="space-y-2">
          <PasswordInput
            id="password"
            label="Password"
            placeholder="Enter your password"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-typo-primary text-xs font-medium hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {serverError ? (
          <p role="alert" className="text-status-error rounded-lg bg-red-50 p-3 text-sm">
            {serverError}
          </p>
        ) : null}

        <CustomButton
          type="submit"
          disabled={submitting}
          variant="default"
          className="text-typo-utility w-full px-4 py-3 uppercase disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Sign in"}
        </CustomButton>
      </form>

      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-stone-200" />
        <span className="text-typo-tertiary/40 text-xs">OR</span>
        <span className="h-px flex-1 bg-stone-200" />
      </div>

      <GoogleAuthButton />

      <p className="text-typo-primary text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-typo-primary font-bold hover:underline">
          Create account
        </Link>
      </p>
    </div>
  );
}
