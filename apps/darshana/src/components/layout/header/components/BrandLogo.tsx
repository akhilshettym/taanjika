import Link from "next/link";
import { Sparkles } from "lucide-react";

export function BrandLogo() {
  return (
    <Link href="/" aria-label="Taanjika homepage" className="group inline-flex flex-col shrink-0">
      <div className="flex items-center gap-2 text-brand-primary">
        <span className="text-2xl font-extrabold tracking-wide leading-none">
          TAANJIKA
        </span>
        <Sparkles className="h-5 w-5 shrink-0" aria-hidden="true" />
      </div>
      <span className="mt-1 text-xs font-medium tracking-wider text-brand-secondary">
        Tradition made timeless
      </span>
    </Link>
  );
}
