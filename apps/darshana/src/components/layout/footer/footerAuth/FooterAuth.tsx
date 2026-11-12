import Link from "next/link";
import { Copyright } from "lucide-react";

export const FooterAuth = () => {
    return (
        <footer className="w-full bg-background px-6 pb-6 sm:px-10">

            <hr className="my-5 border-0 border-t border-brand-pri/15" />

            <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 text-xs text-typo-secondary md:grid md:grid-cols-3">

                <div className="flex items-center gap-1.5 md:justify-self-start">
                    <Copyright className="h-3.5 w-3.5 shrink-0 text-typo-secondary" aria-hidden="true" />

                    <span>Taanjika. All rights reserved.</span>
                </div>

                <p className="text-center font-medium tracking-wide md:justify-self-center">
                    Tradition. Art. Modern Experience.
                </p>

                <nav aria-label="Auth footer navigation" className="text-[11px] flex items-center gap-5 md:justify-self-end">
                    <Link href="/privacy-policy" className="transition-colors hover:text-typo-primary">
                        Privacy policy
                    </Link>

                    <Link href="/terms-of-use" className="transition-colors hover:text-typo-primary">
                        Terms of use
                    </Link>

                    <Link href="/help" className="transition-colors hover:text-typo-primary">
                        Help
                    </Link>
                </nav>
            </div>
        </footer>
    );
};