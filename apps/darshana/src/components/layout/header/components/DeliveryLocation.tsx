import Link from "next/link";
import { MapPin } from "lucide-react";

export function DeliveryLocation() {
  return (
    <Link href="/delivery-location" className="flex items-center gap-2 text-xs text-typo-primary transition-colors hover:text-brand-primary" aria-label="Change delivery location">
      <MapPin size={20} strokeWidth={2} aria-hidden="true" className="shrink-0 text-brand-primary" />
      <div className="flex flex-col text-left leading-tight">
        <span className="text-[10px] uppercase tracking-wider text-typo-secondary">Deliver to</span>
        <span className="font-semibold">575003</span>
      </div>
    </Link>
  );
}