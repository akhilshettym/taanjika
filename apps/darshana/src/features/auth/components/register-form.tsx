"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { AuthField } from "./auth-field";
import { PasswordInput } from "./password-input";
import { PasswordRequirements } from "./password-requirements";
import { AccountIntentSelector } from "./account-intent-selector";
import { registerSchema, type RegisterFormValues } from "../schemas/auth.schema";
import { authApi } from "../services/auth-api.service";
import { useAuth } from "../hooks/use-auth";
import {
  createEmailPasswordAccount,
  sendVerificationEmail,
} from "../services/firebase-auth.service";
import { CustomButton } from "@/components/ui/CustomButton";

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const completingGoogleProfile = searchParams.get("completeProfile") === "1";
  const { user: authenticatedUser } = useAuth();
  const googleEmail = completingGoogleProfile ? (authenticatedUser?.email ?? "") : "";

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: googleEmail,
      password: "",
      confirmPassword: "",
      accountIntent: "COLLECTOR",
      acceptedTerms: false,
      acceptedPrivacyPolicy: false,
      marketingOptIn: false,
    },
  });

  const password = useWatch({ control, name: "password" });
  const accountIntent = useWatch({ control, name: "accountIntent" });

  useEffect(() => {
    if (completingGoogleProfile && authenticatedUser?.email) {
      setValue("email", authenticatedUser.email, { shouldValidate: true });
    }
  }, [completingGoogleProfile, authenticatedUser?.email, setValue]);

  async function onSubmit(values: RegisterFormValues) {
    setSubmitting(true);
    setServerError(null);
    try {
      const email = values.email.trim().toLowerCase();
      let user = getFirebaseAuth().currentUser;
      if (!user || user.email?.toLowerCase() !== email) {
        user = await createEmailPasswordAccount(
          email,
          values.password,
          values.firstName,
          values.lastName,
        );
      } else {
        user = await createEmailPasswordAccount(
          email,
          values.password,
          values.firstName,
          values.lastName,
        );
      }
      const profileInput = {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        accountIntent: values.accountIntent,
        acceptedTerms: true as const,
        acceptedPrivacyPolicy: true as const,
        marketingOptIn: values.marketingOptIn,
      };
      try {
        await authApi.registerProfile(user, profileInput);
      } catch {
        await authApi.syncProfile(user, profileInput);
      }

      if (!user.emailVerified) {
        await sendVerificationEmail(user);
        router.push("/verify-email");
      } else if (values.accountIntent === "ARTIST") {
        router.push("/artist/application-status");
      } else {
        router.push("/");
      }
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "We couldn't complete registration. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {completingGoogleProfile ? (
        <p className="text-status-info rounded-lg bg-blue-50 p-3 text-sm">
          Complete your Taanjika profile to finish setting up your Google account.
        </p>
      ) : null}
      <div className="grid gap-5 sm:grid-cols-2">
        <AuthField
          id="firstName"
          label="First name"
          placeholder="First name"
          autoComplete="given-name"
          error={errors.firstName?.message}
          {...register("firstName")}
        />

        <AuthField
          id="lastName"
          label="Last name"
          placeholder="Last name"
          autoComplete="family-name"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>

      <AuthField
        id="email"
        label="Email address"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        readOnly={completingGoogleProfile}
        error={errors.email?.message}
        {...register("email")}
      />

      <div className="space-y-3">
        <PasswordInput
          id="password"
          label="Password"
          autoComplete="new-password"
          placeholder="Create a password"
          error={errors.password?.message}
          {...register("password")}
        />
        <PasswordRequirements value={password ?? ""} />
      </div>

      <PasswordInput
        id="confirmPassword"
        label="Re-enter password"
        autoComplete="new-password"
        placeholder="Re-enter your password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <AccountIntentSelector
        value={accountIntent}
        onChange={(value) => setValue("accountIntent", value, { shouldValidate: true })}
        error={errors.accountIntent?.message}
      />

      <div className="space-y-3">
        <label className="text-typo-primary flex items-start gap-3 text-xs leading-5">
          <input
            type="checkbox"
            className="accent-brand-accent-secondary mt-1"
            {...register("acceptedTerms")}
          />
          <span>
            I accept the{" "}
            <Link className="font-semibold underline" href="/terms">
              Terms and Conditions
            </Link>{" "}
            .
            {errors.acceptedTerms?.message ? (
              <span className="text-status-error block">{errors.acceptedTerms.message}</span>
            ) : null}
          </span>
        </label>
        <label className="text-typo-primary flex items-start gap-3 text-xs leading-5">
          <input
            type="checkbox"
            className="accent-brand-accent-primary mt-1"
            {...register("acceptedPrivacyPolicy")}
          />

          <span>
            I acknowledge the{" "}
            <Link className="font-semibold underline" href="/privacy">
              Privacy Policy
            </Link>
            .
            {errors.acceptedPrivacyPolicy?.message ? (
              <span className="text-status-red block">{errors.acceptedPrivacyPolicy.message}</span>
            ) : null}
          </span>
        </label>

        <label className="text-typo-primary flex items-start gap-3 text-xs leading-5">
          <input
            type="checkbox"
            className="accent-brand-accent-primary mt-1"
            {...register("marketingOptIn")}
          />
          <span>I would like to receive occasional product and art updates. (Optional)</span>
        </label>
      </div>
      {serverError ? (
        <p role="alert" className="bg-status-error text-status-error rounded-lg p-3 text-sm">
          {serverError}
        </p>
      ) : null}

      <CustomButton
        type="submit"
        disabled={submitting}
        variant="default"
        className="text-typo-utility w-full px-4 py-3 uppercase disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting
          ? "Creating account..."
          : completingGoogleProfile
            ? "Complete account"
            : "Create account"}
      </CustomButton>

      <p className="text-typo-primary text-center text-sm">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-typo-secondary font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
