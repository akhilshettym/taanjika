"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { signInWithGoogle, signOutFirebase } from "../services/firebase-auth.service";
import { signInWithGoogle } from "../services/firebase-auth.service";
import { authApi, AuthApiError } from "../services/auth-api.service";
import { CustomButton } from "@/components/ui/CustomButton";
import Image from "next/image";

export function GoogleAuthButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const user = await signInWithGoogle();
      if (!user.emailVerified) {
        router.push("/verify-email");
        return;
      }
      try {
        const profile = await authApi.getMe(user);
        router.push(
          profile.roles.includes("ADMIN")
            ? "/admin"
            : profile.roles.includes("ARTIST")
              ? "/artist"
              : "/",
        );
      } catch (apiError) {
        if (apiError instanceof AuthApiError && apiError.status === 404) {
          // Preserve the Firebase session: the register form can link a password to this Google identity.
          router.push("/register?completeProfile=1");
          return;
        }
        throw apiError;
      }
    } catch {
      setError("Google sign-in could not be completed. Please try again.");
      // Do not automatically sign out: preserve an existing signed-in session for retry.
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <CustomButton
        type="button"
        onClick={handleClick}
        disabled={loading}
        variant="secondary"
        className="text-typo-primary w-full gap-3 px-4 py-3 uppercase disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Image
          src="/logo/google.png"
          alt="Continue with google"
          width={16}
          height={16}
          className="h-4.5 w-4.5 shrink-0 object-contain"
          aria-hidden="true"
        />
        {loading ? "Connecting..." : "Continue with Google"}
      </CustomButton>

      {error ? (
        <p role="alert" className="text-status-error text-xs">
          {error}
        </p>
      ) : null}
    </div>
  );
}
