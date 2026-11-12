import { BrandLogo } from "../components/BrandLogo";
import { MobileMenuButton } from "../components/MobileMenuButton";

type HeaderMainProps = {
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
};

export function HeaderAuth({ isMobileMenuOpen, onMobileMenuToggle }: HeaderMainProps) {
  return (
    <header className="bg-surface-secondary w-full border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4 sm:gap-6 lg:gap-8">
          <div className="flex shrink-0 items-center gap-4 sm:gap-6">

            <MobileMenuButton isOpen={isMobileMenuOpen} onToggle={onMobileMenuToggle} />
            <BrandLogo />

          </div>
        </div>
      </div>
    </header>
  )
}