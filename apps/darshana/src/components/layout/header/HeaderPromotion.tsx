import Link from "next/link";
import { Flower } from "lucide-react";

type HeaderPromotionProps = {
  href?: string;
};

export function HeaderPromotion({ href = "/paintings" }: HeaderPromotionProps) {
  return (
    <section aria-label="Promotional banner" className="w-full bg-brand-secondary text-typo-utility">
      <div className="mx-auto flex min-h-[28px] max-w-7xl items-center justify-center gap-6 px-4 py-0.5 text-center text-xs sm:gap-10 sm:py-1 tracking-wider">
        <Flower size={15} className="shrink-0 opacity-80" aria-hidden="true" />

        <p className="font-normal leading-snug">
          Discover <span className="font-semibold">original paintings</span>{" "}
          shaped by generations of{" "}
          <span className="font-semibold">artistic heritage</span>
          <span className="mx-2 opacity-60 sm:mx-3" aria-hidden="true"> — </span>
          <Link href={href} className="inline-flex items-center gap-4 border-b-1 border-current font-semibold  transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-typo-utility/50">
            <span>Explore paintings</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </p>

        <Flower size={15} className="shrink-0 opacity-80" aria-hidden="true" />
      </div>
    </section>
  );
}