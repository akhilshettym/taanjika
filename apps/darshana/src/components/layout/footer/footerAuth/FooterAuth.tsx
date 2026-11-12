import Link from "next/link";
import { Copyright } from "lucide-react";

export const FooterAuth = () => {
  return (
    <footer className="bg-background w-full px-6 pb-6 sm:px-10">
      <hr className="border-brand-pri/15 my-5 border-0 border-t" />

      <div className="text-typo-secondary mx-auto flex max-w-7xl flex-col items-center gap-3 text-xs md:grid md:grid-cols-3">
        <div className="flex items-center gap-1.5 md:justify-self-start">
          <Copyright className="text-typo-secondary h-3.5 w-3.5 shrink-0" aria-hidden="true" />

          <span>Taanjika. All rights reserved.</span>
        </div>

        <p className="text-center font-medium tracking-wide md:justify-self-center">
          Tradition. Art. Modern Experience.
        </p>

        <nav
          aria-label="Auth footer navigation"
          className="flex items-center gap-5 text-[11px] md:justify-self-end"
        >
          <Link href="/privacy-policy" className="hover:text-typo-primary transition-colors">
            Privacy policy
          </Link>

          <Link href="/terms-of-use" className="hover:text-typo-primary transition-colors">
            Terms of use
          </Link>

          <Link href="/help" className="hover:text-typo-primary transition-colors">
            Help
          </Link>
        </nav>
      </div>
    </footer>
  );
};
