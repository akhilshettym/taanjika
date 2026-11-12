import Link from "next/link";
import { Heart } from "lucide-react";

type WishlistActionProps = {
  count?: number;
};

export function WishlistAction({ count = 0 }: WishlistActionProps) {
  return (
    <Link href="/wishlist" aria-label={`Wishlist, ${count} items`} className="relative flex items-center gap-2 text-sm">

      <span aria-hidden="true">
        <Heart size={24} strokeWidth={2.5} aria-hidden="true" className="text-typo-primary" />
      </span>

      {count > 0 && (
        <span className="text-typo-primary rounded-full bg-secondary px-2 py-0.5 text-xs">{count}</span>
      )}
    </Link>
  );
}
