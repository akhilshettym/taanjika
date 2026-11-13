"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Maximize2,
    ShieldCheck,
    X,
} from "lucide-react";
import type { FrameOption, ProductPayload } from "../../types/product";

interface ProductGalleryProps {
    product: ProductPayload;
    selectedFrame: FrameOption;
}

export default function ProductGallery({ product, selectedFrame }: ProductGalleryProps) {
    const images = product.gallery.images.slice(0, 5);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
    const activeImage = images[activeIndex];

    const goTo = (nextIndex: number) => {
        if (!images.length) return;
        setActiveIndex((nextIndex + images.length) % images.length);
    };

    useEffect(() => {
        if (!isFullscreenOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsFullscreenOpen(false);
            if (event.key === "ArrowLeft") {
                setActiveIndex((current) => (current - 1 + images.length) % images.length);
            }
            if (event.key === "ArrowRight") {
                setActiveIndex((current) => (current + 1) % images.length);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isFullscreenOpen, images.length]);

    if (!activeImage) return null;

    const selectedFrameMessage = product.gallery.trustNote.selectedFrameMessage.replace(
        "{{frameName}}",
        selectedFrame.name.toLowerCase(),
    );

    return (
        <section aria-label={product.ui.galleryAriaLabel} className="min-w-0">
            <div className="relative overflow-hidden rounded-2xl border border-[var(--border-secondary)] bg-[var(--bg-surface-primary)] p-3 sm:p-5">
                <span className="absolute left-5 top-5 z-10 inline-flex items-center rounded-full bg-[var(--bg-primary)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white sm:left-7 sm:top-7">
                    {product.gallery.badge}
                </span>

                <button type="button" aria-label={product.ui.previousImageLabel} onClick={() => goTo(activeIndex - 1)} className="absolute left-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-[var(--border-primary)] bg-[var(--bg-surface-primary)]/95 text-[var(--typo-primary)] shadow-sm transition hover:bg-[var(--bg-surface-secondary)] sm:left-5 sm:h-10 sm:w-10">
                    <ChevronLeft size={19} aria-hidden="true" />
                </button>

                <div className="flex aspect-[0.92/1] min-h-[320px] items-center justify-center overflow-hidden px-9 py-12 sm:min-h-[440px] sm:px-12 sm:py-14">
                    <div className="relative h-full max-h-[580px] w-full max-w-[82%] p-2 sm:p-3"
                        style={{
                            border: `${selectedFrame.preview.borderWidth}px solid ${selectedFrame.preview.color}`,
                            boxShadow: selectedFrame.preview.shadow,
                            backgroundColor: "var(--bg-surface-secondary)",
                        }}>
                        <div className="relative h-full w-full overflow-hidden bg-[#f5e8cb]">
                            <Image src={activeImage.src} alt={activeImage.alt} fill priority={activeIndex === 0} unoptimized sizes="(max-width: 768px) 75vw, (max-width: 1280px) 40vw, 34vw" className="object-contain" />
                        </div>
                    </div>
                </div>

                <button type="button" aria-label={product.ui.nextImageLabel} onClick={() => goTo(activeIndex + 1)} className="absolute right-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-[var(--border-primary)] bg-[var(--bg-surface-primary)]/95 text-[var(--typo-primary)] shadow-sm transition hover:bg-[var(--bg-surface-secondary)] sm:right-5 sm:h-10 sm:w-10">
                    <ChevronRight size={19} aria-hidden="true" />
                </button>

                <div className="flex items-center justify-between gap-3 border-t border-[var(--border-secondary)] px-1 pt-3 text-xs text-[var(--typo-muted)] sm:px-2 sm:pt-4 sm:text-sm">
                    <span className="tabular-nums">
                        {activeIndex + 1} / {images.length}
                    </span>
                    <button type="button" onClick={() => setIsFullscreenOpen(true)} className="inline-flex items-center gap-2 font-medium text-[var(--typo-primary)] transition hover:opacity-70">
                        <Maximize2 size={15} aria-hidden="true" />
                        {product.ui.viewFullScreenLabel}
                    </button>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-5 gap-2 sm:gap-3">
                {images.map((image, index) => {
                    const isActive = index === activeIndex;
                    return (
                        <button key={image.id} type="button" aria-label={`View ${image.label}`} aria-pressed={isActive} onClick={() => setActiveIndex(index)} className={`relative aspect-square overflow-hidden rounded-lg border bg-[var(--bg-surface-primary)] p-1 transition sm:rounded-xl sm:p-1.5 ${isActive ? "border-2 border-[var(--border-brand-pri)] shadow-sm" : "border-[var(--border-secondary)] hover:border-[var(--border-primary)]"}`}>
                            <Image src={image.src} alt={image.alt} width={120} height={120} unoptimized className="h-full w-full object-contain" />
                        </button>
                    );
                })}
            </div>

            <p className="mt-3 text-center text-xs tracking-wide text-[var(--typo-muted)] sm:text-sm">
                {product.gallery.thumbnailHint}
            </p>

            <div className="mt-5 flex gap-3 rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-surface-secondary)]/70 p-4 sm:mt-6 sm:p-5">
                <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--bg-surface-primary)] text-[var(--typo-primary)]">
                    <ShieldCheck size={19} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                    <h2 className="text-sm font-semibold text-[var(--typo-primary)] sm:text-base">
                        {product.gallery.trustNote.title}
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--typo-muted)] sm:text-sm">
                        {product.gallery.trustNote.description} {selectedFrameMessage}
                    </p>
                </div>
            </div>

            {isFullscreenOpen && (
                <div role="dialog" aria-modal="true" aria-label={product.ui.fullscreenGalleryLabel} className="fixed inset-0 z-[100] flex items-center justify-center bg-[#211a17]/95 p-4 sm:p-8">
                    <button type="button" aria-label={product.ui.closeFullscreenLabel} onClick={() => setIsFullscreenOpen(false)} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 sm:right-8 sm:top-8">
                        <X size={21} aria-hidden="true" />
                    </button>

                    <button type="button" aria-label={product.ui.previousImageLabel} onClick={() => goTo(activeIndex - 1)} className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-8 sm:h-12 sm:w-12">
                        <ChevronLeft size={23} aria-hidden="true" />
                    </button>

                    <div className="relative h-[78vh] w-full max-w-5xl">
                        <Image src={activeImage.src} alt={activeImage.alt} fill unoptimized sizes="95vw" className="object-contain" />
                    </div>

                    <button type="button" aria-label={product.ui.nextImageLabel} onClick={() => goTo(activeIndex + 1)} className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-8 sm:h-12 sm:w-12">
                        <ChevronRight size={23} aria-hidden="true" />
                    </button>

                    <p className="absolute bottom-5 left-0 right-0 text-center text-sm text-white/80">
                        {activeImage.label} · {activeIndex + 1} / {images.length}
                    </p>
                </div>
            )}
        </section>
    );
}
