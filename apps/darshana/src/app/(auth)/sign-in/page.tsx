import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/components/auth-card";
import { SignInForm } from "@/features/auth/components/sign-in-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Taanjika account.",
};

export default function SignInPage() {
  return (
    <AuthCard
      variant="signin"
      eyebrow="Your TAANJIKA account"
      title=" Welcome back"
      description="Sign in to continue your journey with Indian art."
    >
      <Suspense
        fallback={<p className="bg-background text-typo-secondary text-sm">Loading Sign in form</p>}
      >
        <SignInForm />
      </Suspense>
    </AuthCard>
  );
}
