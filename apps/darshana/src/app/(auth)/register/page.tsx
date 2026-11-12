import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/components/auth-card";
import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create your Taanjika account.",
};

export default function RegisterPage() {
  return (
    <AuthCard variant="register" eyebrow="Experience Taanjika" title="Create your account" description="Become part of a community celebrating art, culture and craftsmanship.">

      <Suspense fallback={<p className="text-sm bg-background text-typo-secondary">Loading registration form...</p>}>
        <RegisterForm />
      </Suspense>

    </AuthCard>
  );
}
