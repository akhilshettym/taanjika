import ArtFormCard from "./ArtFormCard";
import ArtFormBreadcrumb from "./components/ArtFormBreadcrumb";
import type { ArtForm } from "./types/artforms.types";

interface ArtFormListingProps {
  artForms: ArtForm[];
}

export default function ArtForms({ artForms }: ArtFormListingProps) {
  return (
    <main className="bg-background min-h-screen">
      <div className="mx-auto w-full max-w-[1600px] px-10">
        <ArtFormBreadcrumb />
      </div>

      <section className="mx-auto w-full max-w-[1600px] px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-10">
        <div className="mb-10 max-w-7xl sm:mb-10">
          <span className="text-typo-primary mb-3 block text-xs font-medium tracking-[0.25em] uppercase">
            Our Heritage · Our Art
          </span>

          <h1 className="text-typo-primary text-5xl leading-[1.1] font-medium tracking-tight">
            Art Forms
            <span className="text-typo-secondary block">Rooted in Tradition.</span>
          </h1>

          <p className="text-typo-muted max-w-full pt-6 text-justify indent-8 text-sm leading-7 sm:text-base sm:leading-8">
            Every art form carries a story of its people, place, and traditions. Explore
            India&apos;s rich artistic heritage through the hands and imagination of its artisans.
            Discover the intricate techniques, natural materials, and regional histories that shape
            each creation—and find original works that speak to your space.
          </p>
          <p className="text-typo-muted mt-6 max-w-full text-justify indent-8 text-sm leading-7 sm:text-base sm:leading-8">
            Whether you are drawn to time-honored folk traditions passed down through generations or
            bold contemporary interpretations, Taanjika connects you directly with the studios
            keeping these crafts alive. Learn the meaning behind every motif, explore related works
            across diverse regions, and collect authenticated art with complete transparency—knowing
            your purchase supports the artisans and communities at the heart of every piece.
          </p>
        </div>

        <div className="border-border-primary mb-7 flex items-center justify-between border-b pb-4">
          <p className="text-typo-muted text-xs tracking-[0.18em] uppercase">Explore Art Forms</p>

          <p className="text-typo-muted text-xs tabular-nums">
            {String(artForms.length).padStart(2, "0")} - Art Forms
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-16">
          {artForms.map((artForm, index) => (
            <div
              key={artForm.id}
              className="rounded-md border border-black/10 bg-black/2 p-3 transition-colors duration-300 hover:border-black/20 hover:bg-black/4 sm:p-4"
            >
              <ArtFormCard artForm={artForm} priority={index < 3} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
