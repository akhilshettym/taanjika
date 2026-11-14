import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ArtFormNotFound() {
  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-[var(--bg-background)] px-5">
      <div className="max-w-lg text-center">
        <span className="text-xs tracking-[0.2em] text-[var(--typo-primary)] uppercase">
          404 · Art Form Not Found
        </span>

        <h1 className="mt-5 text-4xl font-medium text-[var(--typo-primary)] sm:text-5xl">
          This story hasn't been found.
        </h1>

        <p className="mt-5 text-sm leading-7 text-[var(--typo-muted)]">
          The art form you're looking for may have moved, or the requested page may not exist.
        </p>

        <Link
          href="/art-forms"
          className="mt-8 inline-flex items-center gap-3 bg-[var(--bg-primary)] px-6 py-4 text-xs tracking-wider text-white uppercase hover:bg-[var(--bg-secondary)]"
        >
          <ArrowLeft size={16} />
          Explore All Art Forms
        </Link>
      </div>
    </main>
  );
}
