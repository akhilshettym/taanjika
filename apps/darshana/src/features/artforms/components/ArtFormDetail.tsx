import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight, Palette, Leaf, Sparkles, Dot } from "lucide-react";

import type { ArtForm } from "../types/artforms.types";
import ArtFormBreadcrumb from "./ArtFormBreadcrumb";
import ArtFormTimeline from "./ArtFormTimeline";

interface ArtFormDetailProps {
  artForm: ArtForm;
}

export default function ArtFormDetail({ artForm }: ArtFormDetailProps) {
  const sections = [
    artForm.sections.originAndHistory,
    artForm.sections.makingProcess,
    artForm.sections.materials,
    artForm.sections.artisticAdaptations,
    artForm.sections.culturalSignificance,
    artForm.sections.contemporaryPractice,
  ];

  return (
    <main className="bg-background min-h-screen">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <ArtFormBreadcrumb
          artFormName={artForm.name}
          shopHref={artForm.shop.href}
          shopLabel={artForm.shop.label}
        />

        <section className="grid grid-cols-1 gap-9 py-10 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-15">
          <div className="relative min-w-0">
            <div className="border-brand-primary bg-surface-secondary aspect-4/4 w-full rounded-md border-2 p-4">
              <div className="relative h-full w-full overflow-hidden rounded-[4px]">
                <Image
                  src={artForm.images.detail}
                  alt={artForm.images.alt}
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 45vw"
                  className="object-cover"
                />

                <div className="from-brand-secondary/20 absolute inset-0 bg-linear-to-t via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 text-xs tracking-[0.2em] text-white uppercase">
                  Traditional Indian Art
                </div>
              </div>
            </div>

            <p className="text-typo-muted flex flex-wrap items-center gap-1 pt-2 text-xs leading-6">
              <span>{artForm.name}</span>

              <Dot size={16} strokeWidth={1.6} className="text-typo-primary shrink-0" />

              <span>
                {artForm.origin.region}, {artForm.origin.country}
              </span>
            </p>

            <div className="mt-8">
              <h3 className="text-typo-primary pb-2 text-sm font-medium tracking-[0.18em] uppercase">
                What Defines This Art
              </h3>

              <div className="grid grid-cols-2 gap-2.5">
                {artForm.characteristics.map((item) => (
                  <span
                    key={item}
                    className="border-border-primary bg-surface-primary text-typo-secondary flex items-center rounded-sm border px-3 py-2 text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {artForm.shop.enabled && (
              <div className="mt-10 text-white">
                <Link
                  href={artForm.shop.href}
                  className="bg-primary hover:bg-secondary inline-flex min-h-12 items-center justify-center gap-3 rounded-sm px-7 py-4 text-xs font-medium tracking-[0.14em] uppercase transition-colors"
                >
                  {artForm.shop.label}

                  <ArrowUpRight size={17} strokeWidth={2} className="shrink-0" aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>

          <div className="flex min-w-0 flex-col justify-center">
            <span className="text-typo-primary mb-5 flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase">
              <span className="bg-primary h-px w-7" />
              Discover The Art
            </span>

            <h1 className="text-typo-primary text-4xl leading-[1.08] font-medium tracking-tight uppercase sm:text-5xl lg:text-xl xl:text-6xl">
              {artForm.name}
            </h1>

            <p className="text-md text-typo-secondary mt-5 sm:text-xl">{artForm.tagline}</p>

            <div className="border-border-primary mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 border-y py-4">
              <div className="[0.15em] text-typo-muted flex items-center gap-2 text-xs tracking-widest uppercase">
                <MapPin size={16} strokeWidth={1.6} className="text-typo-primary shrink-0" />
                <span>Place of Origin</span>
              </div>

              <div className="text-typo-primary flex flex-wrap items-center gap-2 text-sm font-medium">
                <span>
                  {artForm.origin.place}, {artForm.origin.region}, {artForm.origin.country}
                </span>

                {artForm.origin.coordinates && (
                  <>
                    <span className="text-border-primary" aria-hidden="true">
                      <Dot size={20} strokeWidth={1.6} className="text-typo-primary shrink-0" />
                    </span>
                    <span className="text-typo-muted rounded-md bg-black/4 px-2 py-0.5 font-mono text-xs">
                      {artForm.origin.coordinates}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="mt-2 space-y-5 text-justify">
              <h2 className="text-typo-primary py-5 text-2xl leading-snug font-medium sm:text-3xl">
                {artForm.introduction.heading}
              </h2>

              {artForm.introduction.description.map((paragraph, index) => (
                <p key={index} className="text-typo-muted text-sm leading-7">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="border-border-primary rounded-md border bg-(--bg-surface-secondary)/60 p-5 sm:p-7">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-5">
            <div className="flex items-start gap-3.5">
              <div className="bg-surface-primary text-typo-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
                <Palette size={18} strokeWidth={1.7} />
              </div>

              <div className="min-w-0">
                <p className="text-typo-muted text-[10px] font-semibold tracking-[0.14em] uppercase">
                  Art Category
                </p>

                <p className="text-typo-primary mt-1.5 text-sm leading-relaxed font-medium">
                  {artForm.metadata.category}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="bg-surface-primary text-typo-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
                <Leaf size={18} strokeWidth={1.7} />
              </div>

              <div className="min-w-0">
                <p className="text-typo-muted text-[10px] font-semibold tracking-[0.14em] uppercase">
                  Primary Materials
                </p>

                <p className="text-typo-primary mt-1.5 text-sm leading-relaxed font-medium">
                  {artForm.metadata.primaryMaterials.join(", ")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="bg-surface-primary text-typo-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
                <Sparkles size={18} strokeWidth={1.7} />
              </div>

              <div className="min-w-0">
                <p className="text-typo-muted text-[10px] font-semibold tracking-[0.14em] uppercase">
                  Traditional Practice
                </p>

                <p className="text-typo-primary mt-1.5 text-sm leading-relaxed font-medium">
                  {artForm.metadata.traditionalArtists ?? "Regional artisan tradition"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-15">
          <div className="mb-12 max-w-7xl">
            <span className="text-typo-primary text-xs tracking-[0.2em] uppercase">
              Beyond The Canvas
            </span>

            <h2 className="text-typo-primary mt-4 text-3xl leading-tight font-medium sm:text-4xl lg:text-5xl">
              Exploring {artForm.name}
            </h2>

            <p className="text-typo-muted mt-4 text-justify text-sm leading-6">
              Explore the history, techniques, materials, and cultural significance behind this
              remarkable artistic tradition. Step into the stories passed down through generations
              of master artisans, uncovering how regional heritage and daily rituals shape every
              motif. From the sourcing of natural pigments and raw textures to the intricate,
              time-honored methods used to bring each piece to life, discover the deep craftsmanship
              and meaning woven into every creation.
            </p>
          </div>
          <ArtFormTimeline sections={sections} />
        </section>

        {/* {artForm.shop.enabled && (
                    <section className="mb-14 bg-[var(--bg-surface-secondary)] text-white rounded-md px-6 py-12 text-center sm:mb-20 sm:px-12 sm:py-16">
                        <span className="text-xs uppercase tracking-[0.2em] text-[var(--typo-primary)]">
                            Discover The Collection
                        </span>

                        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-medium leading-tight text-[var(--typo-primary)] sm:text-4xl">
                            Experience the art beyond its story.
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--typo-muted)]">
                            Explore handcrafted artworks that carry the character,
                            craftsmanship and heritage of {artForm.name}.
                        </p>

                        <Link href={artForm.shop.href} className="mt-8 inline-flex items-center gap-3 bg-[var(--bg-primary)] px-7 py-4 text-xs font-medium uppercase tracking-wider transition-colors hover:bg-[var(--bg-secondary)]">
                            {artForm.shop.label}
                            <ArrowUpRight size={17} strokeWidth={2} className="shrink-0" aria-hidden="true" />
                        </Link>
                    </section>
                )} */}
      </div>
    </main>
  );
}
