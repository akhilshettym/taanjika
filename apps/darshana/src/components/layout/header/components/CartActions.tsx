import Link from "next/link";
import { ShoppingCart } from "lucide-react";

type CartActionsProps = {
  count?: number;
};

export function CartActions({ count = 0 }: CartActionsProps) {
  return (
    <Link
      href="/cart"
      aria-label={`Shopping cart, ${count} items`}
      className="relative flex items-center gap-2 text-sm"
    >
      <span aria-hidden="true">
        <ShoppingCart
          size={22}
          strokeWidth={2.5}
          aria-hidden="true"
          className="text-typo-primary"
        />
      </span>

      {count > 0 && (
        <span className="text-typo-primary bg-secondary rounded-full px-2 py-0.5 text-xs">
          {count}
        </span>
      )}
    </Link>
  );
}
