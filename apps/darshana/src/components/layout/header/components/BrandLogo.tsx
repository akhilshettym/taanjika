import Link from "next/link";
import { Sparkles } from "lucide-react";

export function BrandLogo() {
  return (
    <Link href="/" aria-label="Taanjika homepage" className="group inline-flex shrink-0 flex-col">
      <div className="text-typo-primary flex items-center gap-2">
        <span className="text-2xl leading-none font-extrabold tracking-wide">TAANJIKA</span>
        <Sparkles className="h-5 w-5 shrink-0" aria-hidden="true" />
      </div>
      <span className="text-typo-secondary mt-1 text-xs font-medium tracking-wider">
        Tradition made timeless
      </span>
    </Link>
  );
}
