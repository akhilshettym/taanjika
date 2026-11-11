import Link from "next/link";
import { Package } from "lucide-react";

export function OrdersAction() {
  return (
    <Link href="/orders"
      className="flex items-center gap-2 text-xs text-typo-primary transition-colors hover:text-brand-primary focus-visible:outline-none" aria-label="View Orders">
      <Package size={22} className="shrink-0 text-brand-secondary transition-transform duration-200 hover:scale-105" aria-hidden="true" />
      <div className="flex flex-col text-left font-medium leading-tight">
        <span className="whitespace-nowrap text-[10px] text-typo-secondary uppercase tracking-wider">Returns</span>
        <span className="whitespace-nowrap font-semibold text-typo-primary">& Orders</span>
      </div>
    </Link>
  );
}