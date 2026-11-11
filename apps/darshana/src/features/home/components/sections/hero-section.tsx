import Link from "next/link";
import Image from "next/image";

type HeroSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  cta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
};

export function HeroSection({
  eyebrow,
  title,
  description,
  image,
  cta,
  secondaryCta,
}: HeroSectionProps) {
  return (
    <section className="relative grid min-h-150 items-center overflow-hidden md:grid-cols-2">
      <div className="px-6 py-16 md:px-12">
        <p className="mb-4 text-sm tracking-[0.2em]">{eyebrow}</p>

        <h1 className="mb-6 text-4xl font-semibold md:text-6xl">{title}</h1>

        <p className="mb-8 max-w-lg text-gray-600">{description}</p>

        <div className="flex flex-wrap gap-4">
          <Link href={cta.href} className="bg-brand-primary px-6 py-3 text-white">
            {cta.label}
          </Link>

          <Link href={secondaryCta.href} className="border-brand-primary border px-6 py-3">
            {secondaryCta.label}
          </Link>
        </div>
      </div>

      <div className="relative min-h-100">
        <Image
          src={image}
          alt="Traditional Indian craftsmanship"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
