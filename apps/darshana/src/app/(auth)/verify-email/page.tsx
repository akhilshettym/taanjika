import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/components/auth-card";
import { VerifyEmailContent } from "@/features/auth/components/verify-email-content";

export const metadata: Metadata = {
  title: "Verify email",
  description: "Verify your Taanjika email address.",
};

export default function VerifyEmailPage() {
  return (
    <AuthCard
      eyebrow="One last step"
      title="Verify your email"
      description="Verify your email address before continuing to Taanjika."
    >
      <VerifyEmailContent />
    </AuthCard>
  );
}
