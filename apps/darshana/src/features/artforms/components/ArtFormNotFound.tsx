import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ArtFormNotFound() {
  return (
    <main className="bg-background flex min-h-[65vh] items-center justify-center px-5">
      <div className="max-w-lg text-center">
        <span className="text-typo-primary text-xs tracking-[0.2em] uppercase">
          404 · Art Form Not Found
        </span>

        <h1 className="text-typo-primary mt-5 text-4xl font-medium sm:text-5xl">
          This story hasn&apos;t been found.
        </h1>

        <p className="text-typo-muted mt-5 text-sm leading-7">
          The art form you&apos;re looking for may have moved, or the requested page may not exist.
        </p>

        <Link
          href="/art-forms"
          className="bg-primary hover:bg-secondary mt-8 inline-flex items-center gap-3 px-6 py-4 text-xs tracking-wider text-white uppercase"
        >
          <ArrowLeft size={16} />
          Explore All Art Forms
        </Link>
      </div>
    </main>
  );
}
