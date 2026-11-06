import type { ReactNode } from "react";

interface AuthCardProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function AuthCard({ eyebrow, title, description, children }: AuthCardProps) {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-stone-50/50 px-5 py-12 sm:px-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center sm:text-left">
          <p className="text-2xl font-semibold text-stone-900">Taanjika</p>
        </div>

        <div className="mb-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-stone-500 uppercase">
            {eyebrow}
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">{title}</h1>

          <p className="mt-3 text-sm leading-6 text-stone-500">{description}</p>
        </div>

        {children}
      </div>
    </main>
  );
}
