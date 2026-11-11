import Link from "next/link";
import Image from "next/image";

type Category = {
  id: string;
  name: string;
  image: string;
  href: string;
};

type FeaturedCategoriesProps = {
  title: string;
  description: string;
  items: readonly Category[];
};

export function FeaturedCategories({ title, description, items }: FeaturedCategoriesProps) {
  return (
    <section className="px-6 py-16 md:px-12">

      <div className="mb-10 text-center">
        <h2 className="text-3xl font-semibold">
          {title}
        </h2>

        <p className="mt-3 text-gray-600">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {items.map((category) => (
          <Link key={category.id} href={category.href} className="group">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src={category.image} alt={category.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>

            <h3 className="mt-4 text-center font-medium">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>

    </section>
  );
}