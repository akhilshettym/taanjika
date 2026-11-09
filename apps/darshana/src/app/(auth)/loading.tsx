export default function AuthLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50">
      <div className="space-y-3 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-stone-300 border-t-stone-900" />
        <p className="text-sm text-stone-500">Loading Taanjika...</p>
      </div>
    </main>
  );
}
