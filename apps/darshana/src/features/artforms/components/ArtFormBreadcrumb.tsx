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
    <div className="border-border-primary flex flex-col gap-4 border-b py-5 sm:flex-row sm:items-center sm:justify-between">
      <nav
        aria-label="Breadcrumb"
        className="text-typo-muted flex min-w-0 flex-wrap items-center gap-2 text-xs"
      >
        <Link href="/" className="hover:text-typo-primary transition-colors">
          Home
        </Link>

        <ChevronRight size={13} />

        {isArtFormDetailPage ? (
          <>
            <Link href="/art-forms" className="hover:text-typo-primary transition-colors">
              Art Forms
            </Link>

            <ChevronRight size={13} />

            <span aria-current="page" className="text-typo-primary font-medium">
              {artFormName}
            </span>
          </>
        ) : (
          <span aria-current="page" className="text-typo-primary font-medium">
            Art Forms
          </span>
        )}
      </nav>

      {ctaHref && ctaLabel && (
        <Link
          href={ctaHref}
          className="text-typo-primary hover:text-typo-secondary inline-flex w-fit items-center gap-2 text-xs font-medium uppercase transition-colors"
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
