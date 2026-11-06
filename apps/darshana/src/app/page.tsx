export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-2xl text-center">
        <p className="mb-4 text-xs font-medium tracking-[0.28em] text-stone-500 uppercase">
          Taanjika · Darshana
        </p>
        <h1 className="text-5xl font-semibold tracking-tight text-stone-950 sm:text-6xl">
          A space for art to belong.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-stone-600">
          The frontend foundation is ready. The loader, sign-in, registration and marketplace
          experience will be built on this base in the next phase.
        </p>
        <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-stone-200 px-4 py-2 text-sm text-stone-600">
          <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
          Darshana is running
        </div>
      </section>
    </main>
  );
}
