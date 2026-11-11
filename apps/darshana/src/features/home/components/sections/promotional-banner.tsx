import Link from "next/link";
import Image from "next/image";

type PromotionalBannerProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  cta: {
    label: string;
    href: string;
  };
};

export function PromotionalBanner({ eyebrow, title, description, image, cta }: PromotionalBannerProps) {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:px-12">

      <div className="relative min-h-[350px]">
        <Image src={image} alt="Handcrafted Indian art collection" fill sizes="100vw" className="object-cover" />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex min-h-[350px] flex-col items-center justify-center px-6 text-center text-white">

          <p className="mb-4 text-sm tracking-widest">
            {eyebrow}
          </p>

          <h2 className="mb-4 max-w-2xl text-3xl font-semibold md:text-5xl">
            {title}
          </h2>

          <p className="mb-8 max-w-xl">
            {description}
          </p>

          <Link href={cta.href} className="bg-white px-6 py-3 text-black" >
            {cta.label}
          </Link>

        </div>
      </div>

    </section>
  );
}