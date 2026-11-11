import Link from "next/link";
import Image from "next/image";

type BrandStoryProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  cta: {
    label: string;
    href: string;
  };
};

export function BrandStory({ eyebrow, title, description, image, cta }: BrandStoryProps) {
  return (
    <section className="grid items-center gap-10 px-6 py-20 md:grid-cols-2 md:px-12">

      <div className="relative aspect-[4/3]">
        <Image src={image} alt="Indian artisan craftsmanship" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      </div>

      <div>
        <p className="mb-4 text-sm tracking-widest">
          {eyebrow}
        </p>

        <h2 className="mb-6 text-3xl font-semibold md:text-4xl">
          {title}
        </h2>

        <p className="mb-8 text-gray-600">
          {description}
        </p>

        <Link
          href={cta.href}
          className="inline-block border-b border-black pb-2 font-medium"
        >
          {cta.label}
        </Link>
      </div>

    </section>
  );
}