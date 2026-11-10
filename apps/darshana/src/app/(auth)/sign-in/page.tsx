import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/components/auth-card";
import { SignInForm } from "@/features/auth/components/sign-in-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Taanjika account.",
};

export default function VerifyEmailPage() {
  return (
    <AuthCard
      eyebrow="Enter Taanjika"
      title="Sign-in to Taanjika"
      description="Become part of a community celebrating art, culture and craftsmanship."
    >
      <Suspense fallback={<p className="text-sm text-stone-500">Loading Sign in form</p>}>
        <SignInForm />
      </Suspense>
    </AuthCard>
  );
}
