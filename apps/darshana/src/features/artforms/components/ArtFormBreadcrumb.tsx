import Link from "next/link";
import { ChevronRight, MoveUpRight } from "lucide-react";

interface ArtFormBreadcrumbProps {
  artFormName?: string;
  shopHref?: string;
  shopLabel?: string;
}

export default function ArtFormBreadcrumb({
  artFormName,
  shopHref,
  shopLabel,
}: ArtFormBreadcrumbProps) {
  const isArtFormDetailPage = Boolean(artFormName);

  const ctaHref = isArtFormDetailPage ? shopHref : "/shop-by-art-forms";
  const ctaLabel = isArtFormDetailPage ? shopLabel : "Shop by Art Forms";

  return (
    <div className="flex flex-col gap-4 border-b border-[var(--border-primary)] py-5 sm:flex-row sm:items-center sm:justify-between">
      <nav
        aria-label="Breadcrumb"
        className="flex min-w-0 flex-wrap items-center gap-2 text-xs text-[var(--typo-muted)]"
      >
        <Link href="/" className="transition-colors hover:text-[var(--typo-primary)]">
                  Home
        </Link>

               <ChevronRight size={13} />

{isArtFormDetailPage ? (
          <>
            <Link href="/art-forms" className="transition-colors hover:text-[var(--typo-primary)]">
              Art Forms
            </Link>

            <ChevronRight size={13} />

            <span aria-current="page" className="font-medium text-[var(--typo-primary)]">
              {artFormName}
            </span>
          </>
        ) : (
          <span aria-current="page" className="font-medium text-[var(--typo-primary)]">
            Art Forms
          </span>
        )}
      </nav>

               {ctaHref && ctaLabel && (
        <Link
          href={ctaHref}
          className="inline-flex w-fit items-center gap-2 text-xs font-medium text-[var(--typo-primary)] uppercase transition-colors hover:text-[var(--typo-secondary)]"
        >
          {ctaLabel}
          <span aria-hidden="true">
            <MoveUpRight size={15} strokeWidth={2} className="shrink-0" aria-hidden="true" />
          </span>
        </Link>
      )}
    </div>
  );
}
