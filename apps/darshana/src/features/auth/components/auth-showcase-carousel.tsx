"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import showcaseConfig from "@/config/auth-show.json";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideItem {
  src: string;
  alt: string;
}

interface ShowcaseConfig {
  intervalSeconds: number;
  slides: SlideItem[];
}

const config = showcaseConfig as ShowcaseConfig;

export function AuthShowcaseCarousel() {
  const slides = config.slides ?? [];
  const intervalMs = Math.max(1, config.intervalSeconds ?? 5) * 1000;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = slides.length;

  const goToNext = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (totalSlides <= 1 || isPaused) return;

    const timer = window.setInterval(goToNext, intervalMs);
    return () => window.clearInterval(timer);
  }, [totalSlides, isPaused, intervalMs, goToNext, currentIndex]);

  if (totalSlides === 0) return null;

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="border-brand-pri bg-brand-accent-primary relative aspect-[16/10] w-full rounded-md border-2 p-2 sm:p-3">
        <div className="relative h-full w-full overflow-hidden rounded-sm">
          {slides.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={`${slide.src}-${index}`}
                aria-hidden={!isActive}
                className={`absolute inset-0 transition-opacity duration-500 ${isActive ? "opacity-100" : "pointer-events-none opacity-0"}`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>

        {totalSlides > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Previous artwork"
              className="bg-background text-typo-primary hover:text-typo-utility absolute top-1/2 left-5 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full shadow-sm transition hover:bg-[var(--brand-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
            >
              <ChevronLeft
                size={18}
                strokeWidth={2.5}
                className="mr-0.5 shrink-0"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Next artwork"
              className="bg-background text-typo-primary hover:bg-primary hover:text-typo-utility absolute top-1/2 right-5 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
            >
              <ChevronRight
                size={18}
                strokeWidth={2.5}
                className="ml-0.5 shrink-0"
                aria-hidden="true"
              />
            </button>
          </>
        )}
      </div>

      {totalSlides > 1 && (
        <div
          className="mt-3 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Artwork slides"
        >
          {slides.map((_, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${isActive ? "bg-primary w-6" : "bg-secondary/30 hover:bg-secondary/60 w-2"}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
