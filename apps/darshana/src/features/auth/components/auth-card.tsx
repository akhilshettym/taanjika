import type { ReactNode } from "react";

interface AuthCardProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function AuthCard({ eyebrow, title, description, children }: AuthCardProps) {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden min-h-screen flex-col justify-between overflow-hidden bg-stone-950 p-12 text-stone-50 lg:flex">
        <div className="relative z-10">
          <p className="text-2xl font-semibold tracking-[0.16em]">TAANJIKA</p>
          <p className="mt-2 text-sm tracking-wide text-stone-400">Art · Culture · Stories</p>
        </div>
        <div className="relative z-10 max-w-xl">
          <p className="text-xs tracking-[0.3em] text-stone-400 uppercase">
            A marketplace for Indian art
          </p>
          <h2 className="mt-6 text-5xl leading-tight font-light">Every artwork carries a story.</h2>
          <p className="mt-6 max-w-md text-base leading-7 text-stone-400">
            Discover artistic traditions, meet the makers, and bring meaningful craftsmanship into
            your space.
          </p>
        </div>
        <p className="relative z-10 text-xs text-stone-500">
          © {new Date().getFullYear()} Taanjika
        </p>
        <div className="pointer-events-none absolute top-1/4 -right-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute top-1/3 -right-16 h-72 w-72 rounded-full border border-white/10" />
      </aside>
      <section className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <p className="mb-8 text-xl font-semibold tracking-[0.16em] text-stone-900 lg:hidden">
            TAANJIKA
          </p>
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-[0.22em] text-stone-500 uppercase">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-950">{title}</h1>
            <p className="mt-3 text-sm leading-6 text-stone-500">{description}</p>
          </div>
          {children}
        </div>
      </section>
    </main>
  );
}
