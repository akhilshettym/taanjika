import Link from "next/link";
import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/components/auth-card";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Reset your Taanjika password.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthCard eyebrow="Account recovery" title="Reset your password" description="Enter your email address and we'll send reset instructions.">

      <div className="space-y-5">
        <ForgotPasswordForm />

        <p className="text-center text-sm text-typo-tertiary">
          <Link href="/sign-in" className="font-semibold underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
