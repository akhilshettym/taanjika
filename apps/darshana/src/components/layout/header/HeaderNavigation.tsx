"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { navigationConfig, type NavigationItem } from "./config/navigation.config";

type HeaderNavigationProps = {
  isMobileMenuOpen: boolean;
  onNavigate: () => void;
};

export function HeaderNavigation({ isMobileMenuOpen, onNavigate }: HeaderNavigationProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleToggleDropdown = useCallback((label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  }, []);

  const handleLinkClick = useCallback(() => {
    setOpenDropdown(null);
    onNavigate();
  }, [onNavigate]);

  return (
    <nav
      ref={navRef}
      id="primary-navigation"
      aria-label="Primary navigation"
      className={`bg-surface-muted text-typo-tertiary border-b border-gray-200 ${isMobileMenuOpen ? "block" : "hidden"} lg:block`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-4">
          {navigationConfig.map((item: NavigationItem) => {
            const hasChildren = Boolean(item.children?.length);
            const isOpen = openDropdown === item.label;

            return (
              <li
                key={item.label}
                className="relative border-b border-gray-200/40 last:border-0 lg:border-0"
              >
                {hasChildren ? (
                  <div className="relative">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onClick={() => handleToggleDropdown(item.label)}
                      className="text-typo-tertiary! flex min-h-12 w-full appearance-none items-center justify-between gap-2 border-0 bg-transparent px-4 py-3 font-[inherit] text-sm! leading-none! font-semibold! tracking-wider! whitespace-nowrap [text-transform:uppercase!important] not-italic transition-colors duration-200 [font-variant:normal] hover:opacity-75 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none lg:w-auto lg:justify-center"
                    >
                      {item.label}

                      <ChevronDown
                        className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
                        aria-hidden="true"
                      />
                    </button>

                    {isOpen && (
                      <ul
                        role="menu"
                        aria-orientation="vertical"
                        className="bg-surface-muted border-brand-pri z-50 mx-3 mb-3 space-y-1 rounded-xl border p-2 shadow-lg lg:absolute lg:top-full lg:left-1/2 lg:mx-0 lg:mt-2 lg:mb-0 lg:w-56 lg:-translate-x-1/2"
                      >
                        {item.children?.map((child) => (
                          <li key={child.href} role="none">
                            <Link
                              href={child.href}
                              role="menuitem"
                              onClick={handleLinkClick}
                              className="text-typo-tertiary! block w-full rounded-lg px-4 py-3 text-center font-[inherit] text-xs! leading-normal! font-medium! tracking-normal! uppercase! transition-colors duration-200 hover:bg-black/5 hover:text-black focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className="text-typo-tertiary! flex min-h-12 items-center px-4 py-3 font-sans! text-sm! leading-none! font-semibold! tracking-wider! whitespace-nowrap uppercase! not-italic transition-colors duration-200 [font-variant:normal] hover:opacity-75 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
