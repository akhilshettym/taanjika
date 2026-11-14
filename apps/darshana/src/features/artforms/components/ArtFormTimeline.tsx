"use client";

import { useEffect, useRef, useState } from "react";

interface ArtFormSection {
  id: string;
  title: string;
  description: string;
  points?: string[];
}

interface ArtFormTimelineProps {
  sections: ArtFormSection[];
}

const MARKER_SIZE = 40;
const READING_POSITION = 0.45;

export default function ArtFormTimeline({ sections }: ArtFormTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const [timelineGeometry, setTimelineGeometry] = useState({
    top: MARKER_SIZE / 2,
    height: 0,
  });

  const [progressHeight, setProgressHeight] = useState(0);

  useEffect(() => {
    if (!sections.length) return;

    const visibleChaptersSet = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleChaptersSet.add(entry.target);
          } else {
            visibleChaptersSet.delete(entry.target);
          }
        });

        const readingPosition = window.innerHeight * READING_POSITION;

        const visibleChapters = Array.from(visibleChaptersSet);

        if (!visibleChapters.length) return;

        const closestChapter = visibleChapters.reduce((closest, current) => {
          const closestRect = closest.getBoundingClientRect();
          const currentRect = current.getBoundingClientRect();
          const closestCenter = closestRect.top + closestRect.height / 2;
          const currentCenter = currentRect.top + currentRect.height / 2;

          return Math.abs(currentCenter - readingPosition) <
            Math.abs(closestCenter - readingPosition)
            ? current
            : closest;
        });

        const index = chapterRefs.current.findIndex((chapter) => chapter === closestChapter);

        if (index !== -1) {
          setActiveIndex(index);
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -45% 0px",
        threshold: 0,
      },
    );

    chapterRefs.current.forEach((chapter) => {
      if (chapter) {
        observer.observe(chapter);
      }
    });

    return () => {
      observer.disconnect();
      visibleChaptersSet.clear();
    };
  }, [sections.length]);

  useEffect(() => {
    const updateProgress = () => {
      const container = containerRef.current;
      const firstChapter = chapterRefs.current[0];
      const lastChapter = chapterRefs.current[sections.length - 1];
      const activeChapter = chapterRefs.current[activeIndex];

      if (!container || !firstChapter || !lastChapter || !activeChapter) {
        return;
      }

      const containerRect = container.getBoundingClientRect();

      const getMarkerCenter = (chapter: HTMLElement) => {
        const rect = chapter.getBoundingClientRect();

        return rect.top - containerRect.top + MARKER_SIZE / 2;
      };

      const firstMarkerCenter = getMarkerCenter(firstChapter);
      const lastMarkerCenter = getMarkerCenter(lastChapter);
      const activeMarkerCenter = getMarkerCenter(activeChapter);

      setTimelineGeometry({
        top: firstMarkerCenter,
        height: Math.max(0, lastMarkerCenter - firstMarkerCenter),
      });

      setProgressHeight(Math.max(0, activeMarkerCenter - firstMarkerCenter));
    };

    updateProgress();

    const resizeObserver = new ResizeObserver(updateProgress);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    chapterRefs.current.forEach((chapter) => {
      if (chapter) {
        resizeObserver.observe(chapter);
      }
    });

    window.addEventListener("resize", updateProgress);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateProgress);
    };
  }, [activeIndex, sections]);

  if (!sections.length) return null;

  return (
    <div ref={containerRef} className="relative">
      <div
        aria-hidden="true"
        className="bg-border-primary absolute left-4.75 w-px"
        style={{
          top: `${timelineGeometry.top}px`,
          height: `${timelineGeometry.height}px`,
        }}
      />

      <div
        aria-hidden="true"
        className="bg-primary absolute left-4.75 w-px transition-[height] duration-700 ease-in-out"
        style={{
          top: `${timelineGeometry.top}px`,
          height: `${progressHeight}px`,
        }}
      />

      <div className="space-y-10 sm:space-y-12">
        {sections.map((section, index) => {
          const isActive = activeIndex === index;

          return (
            <article
              key={section.id}
              ref={(element) => {
                chapterRefs.current[index] = element;
              }}
              className="relative pl-14 sm:pl-20"
            >
              <div
                className={`absolute top-0 left-0 z-10 flex size-10 items-center justify-center rounded-full border text-xs font-semibold tracking-wider transition-all duration-500 ${
                  isActive
                    ? "border-border-brand-pri bg-primary text-surface-primary shadow-(--bg-primary)/10 shadow-md"
                    : "border-border-primary bg-surface-primary text-typo-muted"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              <div
                className={`rounded-xl border p-5 transition-all duration-500 sm:p-7 ${
                  isActive
                    ? "border-border-brand-pri bg-(--bg-surface-secondary)/70 shadow-sm"
                    : "border-border-primary bg-surface-primary"
                }`}
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <span
                    className={`text-[10px] font-semibold tracking-[0.18em] uppercase transition-colors duration-300 ${
                      isActive ? "text-typo-primary" : "text-typo-muted"
                    }`}
                  >
                    Chapter {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3
                  className={`text-xl leading-snug font-medium transition-colors duration-300 sm:text-2xl ${isActive ? "text-typo-primary" : "text-typo-secondary"}`}
                >
                  {section.title}
                </h3>

                <p className="text-typo-muted max-w-7xl pt-2 text-sm leading-6">
                  {section.description}
                </p>

                {section.points && section.points.length > 0 && (
                  <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                    {section.points.map((point) => (
                      <li
                        key={point}
                        className="text-typo-secondary flex items-start gap-3 text-sm leading-5"
                      >
                        <span className="bg-primary mt-2.5 size-1.5 shrink-0 rounded-full" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
