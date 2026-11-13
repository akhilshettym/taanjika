import type { ProductPayload } from "../types/product";
import mockProduct from "../data/products/madhubani-peacock.json";

const mockProducts: ProductPayload[] = [mockProduct as ProductPayload];

export async function getProductBySlug(
    slug: string,
): Promise<ProductPayload | null> {
    const product = mockProducts.find((item) => item.slug === slug);

    if (!product) return null;

    return {
        ...product,
        gallery: {
            ...product.gallery,
            images: product.gallery.images.slice(0, 5),
        },
        frameOptions: [...product.frameOptions],
        details: [...product.details],
    };
}

export async function getAllProductSlugs(): Promise<string[]> {
    return mockProducts.map((product) => product.slug);
}
