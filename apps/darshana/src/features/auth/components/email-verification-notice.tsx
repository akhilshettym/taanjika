"use client";

interface Props {
  email: string;
  onResend: () => Promise<void>;
  busy?: boolean;
  message?: string | null;
}
export function EmailVerificationNotice({ email, onResend, busy = false, message }: Props) {
  return (
    <div className="space-y-4 rounded-2xl border border-stone-200 bg-white p-6">
      <div>
        <p className="text-lg font-semibold text-stone-900">Verify your email</p>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          We sent a verification link to <strong>{email}</strong>. Open it, then return here and
          check your verification status.
        </p>
      </div>
      {message ? (
        <p role="status" className="text-sm text-stone-600">
          {message}
        </p>
      ) : null}
      <button
        type="button"
        onClick={onResend}
        disabled={busy}
        className="w-full rounded-xl border border-stone-300 px-4 py-3 text-sm font-medium text-stone-800 hover:bg-stone-50 disabled:opacity-60"
      >
        {busy ? "Sending..." : "Resend verification email"}
      </button>
    </div>
  );
}
