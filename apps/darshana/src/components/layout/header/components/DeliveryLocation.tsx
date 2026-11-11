import Link from "next/link";
import { MapPin } from "lucide-react";

export function DeliveryLocation() {
  return (
    <Link
      href="/delivery-location"
      className="text-typo-primary hover:text-brand-primary flex items-center gap-2 text-xs transition-colors"
      aria-label="Change delivery location"
    >
      <MapPin
        size={20}
        strokeWidth={2}
        aria-hidden="true"
        className="text-brand-primary shrink-0"
      />
      <div className="flex flex-col text-left leading-tight">
        <span className="text-typo-secondary text-[10px] tracking-wider uppercase">Deliver to</span>
        <span className="font-semibold">575003</span>
      </div>
    </Link>
  );
}
