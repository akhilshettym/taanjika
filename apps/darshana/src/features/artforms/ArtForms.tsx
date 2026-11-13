import ArtFormCard from "./ArtFormCard";
import ArtFormBreadcrumb from "./components/ArtFormBreadcrumb";
import type { ArtForm } from "./types/artforms.types";

interface ArtFormListingProps {
    artForms: ArtForm[];
}

export default function ArtForms({ artForms }: ArtFormListingProps) {
    return (
        <main className="min-h-screen bg-[var(--bg-background)]">

            <div className="mx-auto w-full max-w-[1600px] px-10">
                <ArtFormBreadcrumb />
            </div>

            <section className="mx-auto w-full max-w-[1600px] px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-10">
                <div className="mb-10 max-w-7xl sm:mb-10">
                    <span className="mb-3 block text-xs font-medium uppercase tracking-[0.25em] text-[var(--typo-primary)]">
                        Our Heritage · Our Art
                    </span>

                    <h1 className="text-5xl font-medium leading-[1.1] tracking-tight text-[var(--typo-primary)]">
                        Art Forms
                        <span className="block text-[var(--typo-secondary)]">
                            Rooted in Tradition.
                        </span>
                    </h1>

                    <p className="pt-6 max-w-full indent-8 text-justify text-sm leading-7 text-[var(--typo-muted)] sm:text-base sm:leading-8">
                        Every art form carries a story of its people, place, and traditions. Explore India's rich artistic heritage through the hands and imagination of its artisans. Discover the intricate techniques, natural materials, and regional histories that shape each creation—and find original works that speak to your space.
                    </p>
                    <p className="mt-6 max-w-full indent-8 text-justify text-sm leading-7 text-[var(--typo-muted)] sm:text-base sm:leading-8">
                        Whether you are drawn to time-honored folk traditions passed down through generations or bold contemporary interpretations, Taanjika connects you directly with the studios keeping these crafts alive. Learn the meaning behind every motif, explore related works across diverse regions, and collect authenticated art with complete transparency—knowing your purchase supports the artisans and communities at the heart of every piece.
                    </p>
                </div>

                <div className="mb-7 flex items-center justify-between border-b border-[var(--border-primary)] pb-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--typo-muted)]">
                        Explore Art Forms
                    </p>

                    <p className="text-xs tabular-nums text-[var(--typo-muted)]">
                        {String(artForms.length).padStart(2, "0")} - Art Forms
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-16">
                    {artForms.map((artForm, index) => (
                        <div key={artForm.id} className="rounded-md border border-black/10 bg-black/[0.02] p-3 transition-colors duration-300 hover:border-black/20 hover:bg-black/[0.04] sm:p-4">

                            <ArtFormCard artForm={artForm} priority={index < 3} />
                        </div>
                    ))}
                </div>

            </section>
        </main>
    );
}