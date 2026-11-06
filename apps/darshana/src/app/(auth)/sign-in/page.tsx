import type { Metadata } from "next";

import { AuthCard } from "@/features/auth/components/auth-card";
import { SignInForm } from "@/features/auth/components/sign-in-form";

export const metadata: Metadata = {
  title: "Sign in | Taanjika",
  description: "Sign in to your Taanjika account.",
};

export default function SignInPage() {
  return (
    <AuthCard
      eyebrow="Welcome back"
      title="Sign in to Taanjika"
      description="Continue your journey into art, culture and creativity."
    >
      <SignInForm />
    </AuthCard>
  );
}
