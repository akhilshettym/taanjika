"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { Check, ChevronDown } from "lucide-react";
import { siteConfig } from "@/config/site";

const languages = [
  { label: "English", value: "en" },
  { label: "हिन्दी", value: "hi" },
  { label: "ಕನ್ನಡ", value: "kn" },
] as const;

type Language = (typeof languages)[number]["value"];

export function HeaderUtility() {
  const [language, setLanguage] = useState<Language>("en");
  const [isOpen, setIsOpen] = useState(false);

  const dropdownId = useId();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectedLanguage = languages.find((item) => item.value === language) ?? languages[0];

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const selectedIndex = languages.findIndex((item) => item.value === language);

    optionRefs.current[selectedIndex]?.focus();
  }, [isOpen, language]);

  function selectLanguage(value: Language) {
    setLanguage(value);
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  function handleTriggerKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setIsOpen(true);
    }
  }

  function handleMenuKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    const currentIndex = optionRefs.current.findIndex(
      (option) => option === document.activeElement,
    );

    let nextIndex = currentIndex;

    switch (event.key) {
      case "ArrowDown":
        nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % languages.length;
        break;

      case "ArrowUp":
        nextIndex =
          currentIndex < 0
            ? languages.length - 1
            : (currentIndex - 1 + languages.length) % languages.length;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex = languages.length - 1;
        break;

      default:
        return;
    }

    event.preventDefault();
    optionRefs.current[nextIndex]?.focus();
  }

  return (
    <div className="bg-primary text-typo-utility w-full">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-1 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          <p className="whitespace-nowrap">
            For orders and enquiries:{" "}
            <a href={siteConfig.contact.phoneHref} className="font-semibold transition-opacity hover:opacity-80">
              {siteConfig.contact.phoneDisplay}
            </a>
          </p>

          <span aria-hidden="true" className="hidden opacity-60 sm:inline">
            {" "} | {" "}
          </span>

          <p className="hidden sm:block">Discover handcrafted art from India.</p>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-3 text-xs sm:gap-4">
          <Link href="/contact" className="font-medium whitespace-nowrap transition-opacity hover:opacity-80">
            Contact Us
          </Link>

          <div ref={dropdownRef} className="relative">
            <button ref={triggerRef} type="button"
              aria-label={`Select language, current language ${selectedLanguage.label}`} aria-haspopup="menu" aria-expanded={isOpen} aria-controls={dropdownId}
              onClick={() => setIsOpen((previous) => !previous)}
              onKeyDown={handleTriggerKeyDown}
              className="border-typo-utility/30 bg-secondary text-typo-utility hover:border-typo-utility/60 focus-visible:ring-typo-utility/50 inline-flex w-36 items-center justify-between gap-3 rounded-md border px-3 py-1.5 text-xs transition-colors focus-visible:ring-2 focus-visible:outline-none">

              <span>{selectedLanguage.label}</span>

              <ChevronDown aria-hidden="true" size={14} strokeWidth={1.75} className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
              <div id={dropdownId} role="menu" aria-label="Available languages"
                onKeyDown={handleMenuKeyDown}
                className="bg-secondary absolute top-full right-0 z-50 mt-2 w-36 rounded-lg border border-brand-pri p-1.5 shadow-lg">
                {languages.map((item, index) => {
                  const isSelected = language === item.value;

                  return (
                    <button key={item.value}
                      ref={(element) => {
                        optionRefs.current[index] = element;
                      }}
                      type="button" role="menuitemradio" aria-checked={isSelected}
                      onClick={() => selectLanguage(item.value)}
                      className={`focus-visible:ring-typo-utility/50 flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-xs transition-colors focus-visible:ring-2 focus-visible:outline-none ${isSelected ? "bg-primary/10 font-semibold" : "hover:bg-primary/10"}`}>
                      <span>{item.label}</span>

                      {isSelected && <Check aria-hidden="true" size={14} strokeWidth={2} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
