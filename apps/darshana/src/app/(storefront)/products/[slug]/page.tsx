import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailsPage from "../../../../features/catalog/components/product-details/ProductDetailsPage";
import { getProductBySlug } from "../../../../features/catalog/services/product.service";

interface ProductRouteProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: `${product.title} | ${product.artForm.name} Art`,
    description: product.description.body.slice(0, 155),
  };
}

export default async function ProductPage({ params }: ProductRouteProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return <ProductDetailsPage key={product.id} product={product} />;
}
