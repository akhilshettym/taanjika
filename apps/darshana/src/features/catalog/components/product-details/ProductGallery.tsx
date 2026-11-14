"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, ShieldCheck, X } from "lucide-react";
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
      <div className="border-border-secondary bg-surface-primary relative overflow-hidden rounded-2xl border p-3 sm:p-5">
        <span className="bg-primary absolute top-5 left-5 z-10 inline-flex items-center rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-[0.18em] text-white uppercase sm:top-7 sm:left-7">
          {product.gallery.badge}
        </span>

        <button
          type="button"
          aria-label={product.ui.previousImageLabel}
          onClick={() => goTo(activeIndex - 1)}
          className="border-border-primary text-typo-primary hover:bg-surface-secondary absolute top-1/2 left-3 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border bg-(--bg-surface-primary)/95 shadow-sm transition sm:left-5 sm:h-10 sm:w-10"
        >
          <ChevronLeft size={19} aria-hidden="true" />
        </button>

        <div className="flex aspect-[0.92/1] min-h-80 items-center justify-center overflow-hidden px-9 py-12 sm:min-h-110 sm:px-12 sm:py-14">
          <div
            className="relative h-full max-h-145 w-full max-w-[82%] p-2 sm:p-3"
            style={{
              border: `${selectedFrame.preview.borderWidth}px solid ${selectedFrame.preview.color}`,
              boxShadow: selectedFrame.preview.shadow,
              backgroundColor: "var(--bg-surface-secondary)",
            }}
          >
            <div className="relative h-full w-full overflow-hidden bg-[#f5e8cb]">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                priority={activeIndex === 0}
                unoptimized
                sizes="(max-width: 768px) 75vw, (max-width: 1280px) 40vw, 34vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label={product.ui.nextImageLabel}
          onClick={() => goTo(activeIndex + 1)}
          className="border-border-primary text-typo-primary hover:bg-surface-secondary absolute top-1/2 right-3 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border bg-(--bg-surface-primary)/95 shadow-sm transition sm:right-5 sm:h-10 sm:w-10"
        >
          <ChevronRight size={19} aria-hidden="true" />
        </button>

        <div className="border-border-secondary text-typo-muted flex items-center justify-between gap-3 border-t px-1 pt-3 text-xs sm:px-2 sm:pt-4 sm:text-sm">
          <span className="tabular-nums">
            {activeIndex + 1} / {images.length}
          </span>
          <button
            type="button"
            onClick={() => setIsFullscreenOpen(true)}
            className="text-typo-primary inline-flex items-center gap-2 font-medium transition hover:opacity-70"
          >
            <Maximize2 size={15} aria-hidden="true" />
            {product.ui.viewFullScreenLabel}
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-2 sm:gap-3">
        {images.map((image, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={image.id}
              type="button"
              aria-label={`View ${image.label}`}
              aria-pressed={isActive}
              onClick={() => setActiveIndex(index)}
              className={`bg-surface-primary relative aspect-square overflow-hidden rounded-lg border p-1 transition sm:rounded-xl sm:p-1.5 ${isActive ? "border-border-brand-pri border-2 shadow-sm" : "border-border-secondary hover:border-border-primary"}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={120}
                height={120}
                unoptimized
                className="h-full w-full object-contain"
              />
            </button>
          );
        })}
      </div>

      <p className="text-typo-muted mt-3 text-center text-xs tracking-wide sm:text-sm">
        {product.gallery.thumbnailHint}
      </p>

      <div className="border-border-secondary mt-5 flex gap-3 rounded-xl border bg-(--bg-surface-secondary)/70 p-4 sm:mt-6 sm:p-5">
        <div className="bg-surface-primary text-typo-primary mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full">
          <ShieldCheck size={19} aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h2 className="text-typo-primary text-sm font-semibold sm:text-base">
            {product.gallery.trustNote.title}
          </h2>
          <p className="text-typo-muted mt-1 text-xs leading-relaxed sm:text-sm">
            {product.gallery.trustNote.description} {selectedFrameMessage}
          </p>
        </div>
      </div>

      {isFullscreenOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={product.ui.fullscreenGalleryLabel}
          className="fixed inset-0 z-100 flex items-center justify-center bg-[#211a17]/95 p-4 sm:p-8"
        >
          <button
            type="button"
            aria-label={product.ui.closeFullscreenLabel}
            onClick={() => setIsFullscreenOpen(false)}
            className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 sm:top-8 sm:right-8"
          >
            <X size={21} aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label={product.ui.previousImageLabel}
            onClick={() => goTo(activeIndex - 1)}
            className="absolute top-1/2 left-3 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-8 sm:h-12 sm:w-12"
          >
            <ChevronLeft size={23} aria-hidden="true" />
          </button>

          <div className="relative h-[78vh] w-full max-w-5xl">
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              unoptimized
              sizes="95vw"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            aria-label={product.ui.nextImageLabel}
            onClick={() => goTo(activeIndex + 1)}
            className="absolute top-1/2 right-3 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-8 sm:h-12 sm:w-12"
          >
            <ChevronRight size={23} aria-hidden="true" />
          </button>

          <p className="absolute right-0 bottom-5 left-0 text-center text-sm text-white/80">
            {activeImage.label} · {activeIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </section>
  );
}
