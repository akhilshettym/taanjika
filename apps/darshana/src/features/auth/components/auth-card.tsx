import type { ReactNode } from "react";
import Link from "next/link";
import { AuthShowcaseCarousel } from "./auth-showcase-carousel";
import { Award, ShieldCheck } from "lucide-react";
import { ACCOUNT_BENEFITS, SIGNIN_HIGHLIGHTS, REGISTER_PILLARS } from "@/config/site";

type AuthVariant = "signin" | "register" | "minimal";

interface AuthCardProps {
  variant?: AuthVariant;
  eyebrow: string;
  title: string;
  description: string;
  signinHref?: string;
  registerHref?: string;
  children: ReactNode;
}

const ASIDE_HEADER: Record<
  Exclude<AuthVariant, "minimal">,
  {
    headline: string;
    subcopy: string;
    tagline: string;
  }
> = {
  signin: {
    headline: "Discover Timeless Craftsmanship",
    subcopy:
      "Curated original artworks directly from master artisans and contemporary Indian studios. Every piece is hand-selected for authenticity, preserving centuries-old traditions while celebrating modern expression.",
    tagline: "Indian Art, Enduring Stories.",
  },
  register: {
    headline: "Collect With Provenance & Purpose",
    subcopy:
      "Create your collector profile to explore a curated world of Indian paintings and diverse traditional and contemporary art forms, complete with deep dives into their rich history, cultural roots, and intricate making processes. Whether you are acquiring authenticated works, commissioning bespoke pieces directly from Indian studios, or discovering related creations to expand your space, every piece comes with a story worth owning.",
    tagline: "Every Piece Has a Lineage.",
  },
};

export function AuthCard({
  variant = "minimal", eyebrow, title, description,
  signinHref = "/sign-in", registerHref = "/register", children,
}: AuthCardProps) {
  const isSplit = variant === "signin" || variant === "register";
  const header = isSplit ? ASIDE_HEADER[variant] : null;

  const authModes = [
    {
      id: "signin" as const,
      label: "Sign in",
      href: signinHref,
      active: variant === "signin",
    },
    {
      id: "register" as const,
      label: "Create Account",
      href: registerHref,
      active: variant === "register",
    },
  ];

  return (
    <main className={`min-h-screen bg-background ${isSplit ? "grid lg:grid-cols-2" : "flex items-center justify-center"}`}>
      {isSplit && header && (
        <aside className="hidden min-h-screen p-6 lg:flex lg:p-8 xl:p-8">
          <div className="flex rounded-sm w-full flex-col justify-between border border-brand-pri/15 bg-surface-muted p-8 xl:p-10">
            <div>
              <p className="pb-2 text-xs font-bold tracking-wider text-typo-primary uppercase">
                TAANJIKA
              </p>

              <h2 className="text-2xl font-bold tracking-normal text-typo-primary xl:text-3xl">
                {header.headline}
              </h2>

              <p className="pt-2 text-sm leading-5 text-typo-tertiary text-justify">
                {header.subcopy}
              </p>
            </div>

            <div className="my-5">
              <AuthShowcaseCarousel />
              <p className="pt-4 text-center text-base font-medium tracking-wide text-typo-primary">
                {header.tagline}
              </p>
            </div>

            {variant === "signin" ? (
              <div className="border-t border-brand-pri/15 pt-5">
                <h3 className="text-sm font-semibold tracking-[0.16em] text-typo-secondary uppercase">
                  Inside Your Account
                </h3>

                <ul className="mt-3 space-y-2.5">
                  {SIGNIN_HIGHLIGHTS.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-typo-tertiary">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                        aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid grid-cols-3 divide-x divide-[var(--brand-primary)]/15 border border-brand-pri/15 bg-background/60">
                  {REGISTER_PILLARS.map((pillar) => (
                    <div key={pillar.label} className="px-3 py-3 text-center">
                      <p className="text-xs font-bold tracking-wide text-typo-primary uppercase">
                        {pillar.label}
                      </p>
                      <p className="mt-0.5 text-[11px] text-typo-tertiary">
                        {pillar.detail}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-brand-pri/15 pt-4">
                  <h3 className="text-sm font-semibold tracking-[0.16em] text-typo-secondary uppercase">
                    Member Privileges
                  </h3>

                  <ul className="mt-5 mb-5 space-y-2">
                    {ACCOUNT_BENEFITS.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2.5 text-sm text-typo-tertiary">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="pt-4 border-t border-brand-pri/15 text-sm leading-5 text-typo-tertiary text-justify">
                    Your personal dashboard allows you to effortlessly manage your private collection, save favorite styles, and receive tailored curation alerts matched to your aesthetic. From exploring rare regional techniques to enjoying seamless, insured delivery straight to your door, your account brings the depth of India&apos;s artistic heritage directly into your hands.
                  </p>
                </div>

                <div className="flex items-start gap-3 border border-brand-pri/15 bg-background/60 p-3.5">
                  <Award size={18} strokeWidth={1.75} className="mt-2 shrink-0 text-typo-primary" aria-hidden="true" />
                  <p className="text-xs leading-5 text-typo-tertiary/50">
                    <span className="font-semibold text-typo-tertiary">
                      Authentic Hand-painted
                    </span>{" "}
                    Every piece carries its own distinct soul, with natural variations shaped by the art form so no two are ever alike.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-5 border-t border-brand-pri/15">
              <p className="flex flex-wrap items-center justify-center gap-2 pt-6 text-xs font-medium tracking-wide text-typo-secondary">

                <ShieldCheck size={15} strokeWidth={2} className="shrink-0" aria-hidden="true" />

                <span>Authentic art</span>
                <span className="h-1 w-1 rounded-full bg-current opacity-60" aria-hidden="true" />

                <span>Verified artists</span>
                <span className="h-1 w-1 rounded-full bg-current opacity-60" aria-hidden="true" />

                <span>Secure shopping</span>
              </p>
            </div>
          </div>
        </aside>
      )}

      <section className={`flex min-h-screen w-full justify-center px-5 sm:px-8 ${isSplit
        ? "items-start pt-10 pb-12 sm:pt-14 lg:pt-16" : "items-center py-12"}`}>
        <div className={`w-full max-w-md ${!isSplit ? "border border-brand-pri/15 bg-surface-muted/40 p-8 sm:p-10" : ""}`}>

          <p className={`mb-8 text-xl font-semibold tracking-[0.16em] text-typo-primary ${isSplit ? "lg:hidden" : ""}`}>
            TAANJIKA
          </p>

          {isSplit && (
            <nav aria-label="Authentication mode" className="mb-8 grid grid-cols-2 gap-2.5">
              {authModes.map((mode) => (
                <Link key={mode.id} href={mode.href}
                  aria-current={mode.active ? "page" : undefined}
                  className={`flex items-center rounded-sm justify-center gap-2.5 border px-4 py-3 text-xs font-semibold tracking-wider uppercase transition-colors ${mode.active
                    ? "border-brand-pri bg-surface-muted text-typo-primary"
                    : "border-brand-pri/15 bg-transparent text-typo-tertiary hover:border-brand-pri/40 hover:text-typo-tertiary/50"
                    }`}>

                  <span>{mode.label}</span>
                </Link>
              ))}
            </nav>
          )}

          <div className="mb-8">
            <p className="text-xs font-semibold text-typo-secondary uppercase">
              {eyebrow}
            </p>

            <h1 className="pt-3 text-3xl font-bold text-typo-tertiary uppercase">
              {title}
            </h1>
            <p className="pt-1 text-sm leading-6 text-typo-tertiary">{description}</p>
          </div>

          {children}
        </div>
      </section>
    </main>
  );
}