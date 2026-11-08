"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { signInWithGoogle, signOutFirebase } from "../services/firebase-auth.service";
import { signInWithGoogle } from "../services/firebase-auth.service";
import { authApi, AuthApiError } from "../services/auth-api.service";

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
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-800 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="font-semibold">G</span>
        {loading ? "Connecting..." : "Continue with Google"}
      </button>
      {error ? (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
