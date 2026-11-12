"use client";

interface Props {
  email: string;
  onResend: () => Promise<void>;
  busy?: boolean;
  message?: string | null;
}

export function EmailVerificationNotice({ email, onResend, busy = false, message }: Props) {
  return (
    <div className="bg-background space-y-4 rounded-2xl border border-stone-200 p-6">
      <div>
        <p className="text-typo-tertiary text-lg font-semibold">Verify your email</p>
        <p className="text-typo-tertiary/60 mt-2 text-sm leading-6">
          We sent a verification link to <strong>{email}</strong>. Open it, then return here and
          check your verification status.
        </p>
      </div>

      {message ? (
        <p role="status" className="text-typo-tertiary/60 text-sm">
          {message}
        </p>
      ) : null}

      <button
        type="button"
        onClick={onResend}
        disabled={busy}
        className="text-typo-tertiary/80 hover:bg-secondary/40 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm font-medium disabled:opacity-60"
      >
        {busy ? "Sending..." : "Resend verification email"}
      </button>
    </div>
  );
}
