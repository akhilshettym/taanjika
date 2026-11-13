import type { ProductPayload } from "../../types/product";

export function formatCurrency(amount: number, currency: string): string {
    try {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency,
            maximumFractionDigits: 0,
        }).format(amount);
    } catch {
        return `${currency} ${amount.toLocaleString("en-IN")}`;
    }
}

export function createSpecSheetText(product: ProductPayload): string {
    const lines = [
        product.title,
        product.artForm.collectionName,
        "",
        `Art form: ${product.artForm.name}`,
        `Origin: ${product.artForm.origin}`,
        `Artist: ${product.details.find((item) => item.label.toLowerCase() === "artist")?.value ?? ""}`,
        `Price from: ${formatCurrency(product.purchase.baseAmount, product.purchase.currency)}`,
        "",
        "ARTWORK DETAILS",
        ...product.details.map((item) => `${item.label}: ${item.value}`),
        `Artist signature: ${product.artistSignature.signed ? "Signed by the artist" : "Not signed"}`,
        "",
        "This is a demo spec sheet generated from the product payload.",
    ];

    return lines.join("\n");
}
