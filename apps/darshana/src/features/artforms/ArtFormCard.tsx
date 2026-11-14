import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPinned } from "lucide-react";
import type { ArtForm } from "./types/artforms.types";

interface ArtFormCardProps {
  artForm: ArtForm;
  priority?: boolean;
}

export default function ArtFormCard({ artForm, priority = false }: ArtFormCardProps) {
  return (
    <article className="group min-w-0">
      <Link
        href={`/art-forms/${artForm.slug}`}
        className="block"
        aria-label={`Explore ${artForm.name} art`}
      >
        <div className="border-primary bg-surface-secondary relative aspect-4/4 overflow-hidden rounded-md border-2">
          <Image
            src={artForm.images.cover}
            alt={artForm.images.alt}
            fill
            priority={priority}
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-70" />

          <span className="bg-surface-primary text-typo-primary group-hover:bg-primary absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:text-white">
            <ArrowUpRight size={19} strokeWidth={1.5} />
          </span>
        </div>

        <div className="pt-5">
          <div className="text-typo-muted mb-3 flex items-center gap-2 text-xs tracking-wide">
            <MapPinned size={13} strokeWidth={1.5} />

            <span>
              {artForm.origin.region}, {artForm.origin.country}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <h2 className="text-typo-primary group-hover:text-typo-secondary text-2xl font-medium tracking-tight uppercase transition-colors duration-300">
              {artForm.name}
            </h2>

            <span className="text-typo-muted shrink-0 text-xs tracking-[0.12em] uppercase">
              Explore
            </span>
          </div>

          <p className="text-typo-muted max-w-lg pt-3 text-justify text-sm leading-5">
            {artForm.shortDescription}
          </p>
        </div>
      </Link>
    </article>
  );
}
