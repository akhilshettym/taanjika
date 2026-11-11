import Link from "next/link";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  href: string;
};

type NewArrivalsProps = {
  title: string;
  description: string;
  products: readonly Product[];
};

export function NewArrivals({ title, description, products }: NewArrivalsProps) {
  return (
    <section className="bg-stone-50 px-6 py-16 md:px-12">

      <div className="mb-10">
        <h2 className="text-3xl font-semibold">
          {title}
        </h2>

        <p className="mt-3 text-gray-600">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
        {products.map((product) => (
          <Link key={product.id} href={product.href} className="group">
            <div className="relative aspect-square overflow-hidden bg-white">
              <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>

            <h3 className="mt-4 font-medium">
              {product.name}
            </h3>

            <p className="mt-2 text-sm">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
          </Link>
        ))}
      </div>

    </section>
  );
}