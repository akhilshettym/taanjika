export default function AuthLoading() {
  return (
    <main className="bg-background flex min-h-screen items-center justify-center">
      <div className="space-y-3 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-stone-300 border-t-stone-900" />

        <p className="text-typo-primary text-sm font-semibold">Loading Taanjika...</p>
      </div>
    </main>
  );
}
