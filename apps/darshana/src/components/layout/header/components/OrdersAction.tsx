import Link from "next/link";
import { Package } from "lucide-react";

export function OrdersAction() {
  return (
    <Link href="/orders" className="text-typo-primary hover:text-typo-utility flex items-center gap-2 text-xs transition-colors focus-visible:outline-none" aria-label="View Orders">

      <Package size={22} className="text-typo-secondary shrink-0 transition-transform duration-200 hover:scale-105" aria-hidden="true" />

      <div className="flex flex-col text-left leading-tight font-medium">
        <span className="text-typo-secondary text-[10px] tracking-wider whitespace-nowrap uppercase">
          Returns
        </span>
        <span className="text-typo-primary font-semibold whitespace-nowrap">& Orders</span>
      </div>
    </Link>
  );
}
