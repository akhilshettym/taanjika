"use client";

import { useState } from "react";
import { HeaderUtility } from "../HeaderUtility";
// import { HeaderNavigation } from "../HeaderNavigation";
// import { HeaderPromotion } from "../HeaderPromotion";
import { HeaderAuth } from "./HeaderAuth";

export function HeaderSecondary() {
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
            <HeaderAuth isMobileMenuOpen={isMobileMenuOpen} onMobileMenuToggle={handleMobileMenuToggle} />
            {/* <HeaderNavigation isMobileMenuOpen={isMobileMenuOpen} onNavigate={closeMobileMenu} /> */}
            {/* <HeaderPromotion /> */}
        </header>
    );
}
