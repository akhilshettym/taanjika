export function GoogleAuthButton() {
  return (
    <div className="space-y-2">
      <button
        type="button"
        disabled
        className="flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-400"
      >
        <span className="font-bold">G</span>
        Continue with Google
      </button>

      <p className="text-center text-xs text-stone-400">
        Google sign-in will be enabled after Firebase integration.
      </p>
    </div>
  );
}
