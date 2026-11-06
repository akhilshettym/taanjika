import type { Metadata } from "next";

import { AuthCard } from "@/features/auth/components/auth-card";
import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = {
  title: "Create account | Taanjika",
  description: "Create your Taanjika account and discover art.",
};

export default function RegisterPage() {
  return (
    <AuthCard
      eyebrow="Join Taanjika"
      title="Create your account"
      description="Become part of a community celebrating art, culture and craftsmanship."
    >
      <RegisterForm />
    </AuthCard>
  );
}
