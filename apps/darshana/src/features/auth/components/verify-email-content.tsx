"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { reload } from "firebase/auth";
import { useAuth } from "../hooks/use-auth";
import { EmailVerificationNotice } from "./email-verification-notice";
import { resendVerificationEmail } from "../services/firebase-auth.service";
import { authApi } from "../services/auth-api.service";

export function VerifyEmailContent() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) router.replace("/sign-in");
  }, [isLoading, user, router]);

  async function checkStatus() {
    if (!user) return;
    setBusy(true);
    setMessage(null);
    try {
      await reload(user);
      await user.getIdToken(true);
      if (!user.emailVerified) {
        setMessage("Your email is not verified yet. Open the link in your inbox and try again.");
        return;
      }
      let profile;
      try {
        profile = await authApi.getMe(user);
      } catch {
        router.replace("/register?completeProfile=1");
        return;
      }
      if (profile.roles.includes("ADMIN")) router.replace("/admin");
      else if (profile.roles.includes("ARTIST")) router.replace("/artist");
      else if (profile.artistApplicationStatus === "PENDING")
        router.replace("/artist/application-status");
      else router.replace("/");
    } catch {
      setMessage("We couldn't confirm your Taanjika profile yet. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function resend() {
    if (!user) return;
    setBusy(true);
    setMessage(null);
    try {
      await resendVerificationEmail(user);
      setMessage("A verification email has been sent if your account still needs verification.");
    } catch {
      setMessage("We couldn't send the email right now. Please wait and try again.");
    } finally {
      setBusy(false);
    }
  }

  if (isLoading || !user) return <p className="text-sm text-stone-500">Loading account...</p>;
  return (
    <div className="space-y-4">
      <EmailVerificationNotice
        email={user.email ?? "your registered email"}
        onResend={resend}
        busy={busy}
        message={message}
      />
      <button
        type="button"
        onClick={checkStatus}
        disabled={busy}
        className="w-full rounded-xl bg-stone-950 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        I&apos;ve verified my email
      </button>
    </div>
  );
}
