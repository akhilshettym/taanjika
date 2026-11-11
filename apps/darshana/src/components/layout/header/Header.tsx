"use client";

import { useState } from "react";

import { HeaderUtility } from "./HeaderUtility";
import { HeaderMain } from "./HeaderMain";
import { HeaderNavigation } from "./HeaderNavigation";
import { HeaderPromotion } from "./HeaderPromotion";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((previous) => !previous);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="relative z-40 w-full">
      <HeaderUtility />
      <HeaderMain isMobileMenuOpen={isMobileMenuOpen} onMobileMenuToggle={handleMobileMenuToggle} />
      <HeaderNavigation isMobileMenuOpen={isMobileMenuOpen} onNavigate={closeMobileMenu} />
      <HeaderPromotion />
    </header>
  );
}