import { AccountActions } from "./components/AccountActions";
import { BrandLogo } from "./components/BrandLogo";
import { CartActions } from "./components/CartActions";
import { DeliveryLocation } from "./components/DeliveryLocation";
import { MobileMenuButton } from "./components/MobileMenuButton";
import { OrdersAction } from "./components/OrdersAction";
import { SearchBar } from "./components/SearchBar";
import { WishlistAction } from "./components/WishlistAction";

type HeaderMainProps = {
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
};

export function HeaderMain({ isMobileMenuOpen, onMobileMenuToggle }: HeaderMainProps) {
  return (
    <header className="bg-bg-surface-secondary w-full border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4 sm:gap-6 lg:gap-8">
          <div className="flex shrink-0 items-center gap-4 sm:gap-6">
            <MobileMenuButton isOpen={isMobileMenuOpen} onToggle={onMobileMenuToggle} />
            <BrandLogo />

            <div
              className="bg-brand-secondary/50 ml-3 hidden h-6 w-px lg:block"
              aria-hidden="true"
            />

            <div className="hidden lg:block">
              <DeliveryLocation />
            </div>
          </div>

          <div className="hidden min-w-0 flex-1 justify-center lg:flex">
            <div className="w-full max-w-sm xl:max-w-xl">
              <SearchBar />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-4 sm:gap-6">
            <AccountActions />
            <div
              className="bg-brand-secondary/50 ml-3 hidden h-6 w-px lg:block"
              aria-hidden="true"
            />
            <OrdersAction />
            <div
              className="bg-brand-secondary/50 ml-3 hidden h-6 w-px lg:block"
              aria-hidden="true"
            />
            <WishlistAction count={0} />
            <CartActions count={0} />
          </div>
        </div>

        <div className="flex flex-col gap-2 pb-3 lg:hidden">
          <div className="w-full">
            <SearchBar />
          </div>
          <div className="flex items-center justify-between pt-1 sm:hidden">
            <DeliveryLocation />
          </div>
        </div>
      </div>
    </header>
  );
}
