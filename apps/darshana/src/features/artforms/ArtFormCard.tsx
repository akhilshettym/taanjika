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
            <Link href={`/art-forms/${artForm.slug}`} className="block" aria-label={`Explore ${artForm.name} art`}>
                <div className="relative aspect-[4/4] overflow-hidden bg-[var(--bg-surface-secondary)] border-2 border-primary rounded-md">
                    <Image src={artForm.images.cover} alt={artForm.images.alt} fill priority={priority} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70" />

                    <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg-surface-primary)] text-[var(--typo-primary)] transition-all duration-300 group-hover:bg-[var(--bg-primary)] group-hover:text-white">
                        <ArrowUpRight size={19} strokeWidth={1.5} />
                    </span>
                </div>

                <div className="pt-5">
                    <div className="mb-3 flex items-center gap-2 text-xs tracking-wide text-[var(--typo-muted)]">
                        <MapPinned size={13} strokeWidth={1.5} />

                        <span>
                            {artForm.origin.region}, {artForm.origin.country}
                        </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                        <h2 className="text-2xl font-medium tracking-tight text-[var(--typo-primary)] transition-colors duration-300 group-hover:text-[var(--typo-secondary)] uppercase">
                            {artForm.name}
                        </h2>

                        <span className="shrink-0 text-xs uppercase tracking-[0.12em] text-[var(--typo-muted)]">
                            Explore
                        </span>
                    </div>

                    <p className="pt-3 max-w-lg text-sm leading-5 text-[var(--typo-muted)] text-justify">
                        {artForm.shortDescription}
                    </p>
                </div>
            </Link>
        </article>
    );
}