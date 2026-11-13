"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import { Check, LockKeyhole, PackageCheck, ShoppingBag, Truck } from "lucide-react";
import type { FrameOption, ProductPayload, PincodeLookupResult } from "../../types/product";
import { addProductToLocalCart } from "../../../cart/services/cart-storage.service";
import type { CartLine } from "../../../cart/types/cart";
import { formatCurrency } from "./product-details.utils";

interface PurchasePanelProps {
    product: ProductPayload;
    selectedFrame: FrameOption;
    onSelectFrame: (frame: FrameOption) => void;
    onNotify: (message: string) => void;
}

export default function PurchasePanel({ product, selectedFrame, onSelectFrame, onNotify }: PurchasePanelProps) {
    const router = useRouter();
    const [pincode, setPincode] = useState("");
    const [pincodeResult, setPincodeResult] = useState<PincodeLookupResult | null>(null);
    const [pincodeMessage, setPincodeMessage] = useState("");
    const [isPincodeChecked, setIsPincodeChecked] = useState(false);

    const totalPrice = product.purchase.baseAmount + selectedFrame.additionalPrice;

    const createCartLine = (): CartLine => ({
        productId: product.id,
        slug: product.slug,
        title: product.title,
        image: product.gallery.images[0]?.src ?? "",
        frameId: selectedFrame.id,
        frameName: selectedFrame.name,
        quantity: 1,
        unitPrice: totalPrice,
        currency: product.purchase.currency,
        addedAt: new Date().toISOString(),
    });

    const persistCartLine = (): CartLine | null => {
        const line = createCartLine();

        try {
            addProductToLocalCart(line);
            return line;
        } catch {
            onNotify("We could not update your demo cart. Check your browser storage settings.");
            return null;
        }
    };

    const handleAddToCart = () => {
        const line = persistCartLine();
        if (line) onNotify(product.purchase.addedToCartMessage);
    };

    const handleBuyNow = () => {
        const line = persistCartLine();
        if (!line) return;

        window.dispatchEvent(
            new CustomEvent(product.purchase.checkoutEventName, {
                detail: {
                    line, productSlug: product.slug,
                    source: "product-details-page",
                },
            }),
        );
        router.push(product.purchase.checkoutHref);
    };

    const handlePincodeSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsPincodeChecked(true);
        setPincodeResult(null);

        if (!/^\d{6}$/.test(pincode.trim())) {
            setPincodeMessage(product.shipping.invalidPincodeMessage);
            return;
        }

        const result = product.shipping.pincodeLookup[pincode.trim()];
        if (!result) {
            setPincodeMessage(product.shipping.unknownPincodeMessage);
            return;
        }

        setPincodeResult(result);
        setPincodeMessage(result.message);
    };

    return (
        <aside className="min-w-0">
            <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-surface-primary)] p-4 shadow-[0_12px_35px_rgba(84,35,42,0.06)] sm:p-5 2xl:p-5">
                <span className="inline-flex rounded-full bg-[var(--bg-surface-secondary)] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.17em] text-[var(--typo-primary)]">
                    {product.purchase.badge}
                </span>

                <div className="mt-4">
                    <p className="font-serif text-3xl leading-none text-[var(--typo-primary)] sm:text-[2rem]">
                        {formatCurrency(totalPrice, product.purchase.currency)}
                    </p>

                    <p className="mt-2 text-[11px] leading-relaxed text-[var(--typo-muted)]">
                        {product.purchase.taxLabel} <span className="mx-1">·</span>{" "}
                        {product.purchase.includedFrameLabel.replace("{{frameName}}", selectedFrame.name)}
                    </p>
                </div>

                <div className="mt-4 flex items-center gap-2 border-y border-[var(--border-secondary)] py-3 text-xs font-medium text-[var(--typo-secondary)]">
                    <span className="h-2 w-2 rounded-full bg-[#628363]" aria-hidden="true" />
                    {product.purchase.availabilityLabel}
                </div>

                <div className="mt-4 grid gap-2.5">
                    <button type="button" onClick={handleAddToCart} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--bg-primary)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[var(--bg-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--border-brand-pri)]">
                        <ShoppingBag size={16} aria-hidden="true" />
                        {product.purchase.addToCartLabel}
                    </button>

                    <button type="button" onClick={handleBuyNow} className="min-h-12 rounded-full border border-[var(--border-brand-pri)] bg-transparent px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--typo-primary)] transition hover:bg-[var(--bg-surface-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--border-brand-pri)]">
                        {product.purchase.buyNowLabel}
                    </button>
                </div>

                <div className="mt-6 border-t border-[var(--border-secondary)] pt-5">
                    <h2 className="font-serif text-xl text-[var(--typo-primary)]">
                        {product.purchase.frameSectionTitle}
                    </h2>
                    <p className="mt-1 text-[11px] leading-relaxed text-[var(--typo-muted)]">
                        {product.ui.frameSelectionHint}
                    </p>

                    <div className="mt-3 grid grid-cols-3 gap-2">
                        {product.frameOptions.map((frame) => {
                            const isSelected = frame.id === selectedFrame.id;
                            const priceCaption =
                                frame.priceCaption ??
                                (frame.additionalPrice === 0
                                    ? "Included"
                                    : `+ ${formatCurrency(frame.additionalPrice, product.purchase.currency)}`);

                            return (
                                <button key={frame.id} type="button" aria-pressed={isSelected} onClick={() => onSelectFrame(frame)}
                                    className={`min-w-0 rounded-xl border p-1.5 text-left transition sm:p-2 ${isSelected
                                            ? "border-[var(--border-brand-pri)] bg-[var(--bg-surface-secondary)]"
                                            : "border-[var(--border-secondary)] bg-[var(--bg-surface-primary)] hover:border-[var(--border-primary)]"
                                        }`}>

                                    <div className="relative aspect-[1.45/1] overflow-hidden rounded-md bg-[var(--bg-surface-secondary)]">
                                        <Image src={frame.image} alt={`${frame.name} frame sample`} fill unoptimized sizes="(max-width: 768px) 26vw, 10vw" className="object-cover" />

                                        {isSelected && (
                                            <span className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-[var(--bg-primary)] text-white">
                                                <Check size={12} aria-hidden="true" />
                                            </span>
                                        )}
                                    </div>

                                    <span className="mt-2 block truncate text-[10px] font-semibold text-[var(--typo-primary)] sm:text-[11px]">
                                        {frame.name}
                                    </span>

                                    <span className="mt-0.5 block truncate text-[9px] text-[var(--typo-muted)] sm:text-[10px]">
                                        {priceCaption}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-3 rounded-lg bg-[var(--bg-surface-secondary)]/75 px-3 py-2.5 text-[10px] leading-relaxed text-[var(--typo-secondary)] sm:text-[11px]">
                        <span className="font-semibold">{product.purchase.selectedFrameLabel}</span>{" "}
                        {product.ui.currentSelectionPrefix} <span className="font-semibold">{selectedFrame.name}</span>.
                    </div>
                </div>

                <div className="mt-6 border-t border-[var(--border-secondary)] pt-5">
                    <h2 className="font-serif text-xl text-[var(--typo-primary)]">
                        {product.purchase.shippingTitle}
                    </h2>

                    <form onSubmit={handlePincodeSubmit} className="mt-3">
                        <label htmlFor="product-pincode" className="sr-only">
                            {product.ui.pincodeInputLabel}
                        </label>
                        <div className="flex gap-2">
                            <input id="product-pincode" name="pincode" inputMode="numeric" autoComplete="postal-code" maxLength={6} value={pincode}
                                onChange={(event) => {
                                    setPincode(event.target.value.replace(/\D/g, "").slice(0, 6));
                                    setIsPincodeChecked(false);
                                    setPincodeResult(null);
                                    setPincodeMessage("");
                                }}
                                placeholder={product.shipping.pincodePlaceholder} className="min-w-0 flex-1 rounded-full border border-[var(--border-primary)] bg-[var(--bg-background)] px-3.5 py-3 text-xs text-[var(--typo-primary)] outline-none placeholder:text-[var(--typo-muted)]/70 focus:border-[var(--border-brand-pri)]" />

                            <button type="submit" className="shrink-0 rounded-full bg-[var(--bg-secondary)] px-4 text-xs font-semibold text-white transition hover:bg-[var(--bg-primary)]">
                                {product.shipping.checkButtonLabel}
                            </button>
                        </div>
                    </form>

                    {isPincodeChecked && pincodeMessage && (
                        <div role="status" className={`mt-2 rounded-lg px-3 py-2 text-[10px] leading-relaxed ${pincodeResult?.serviceable
                                ? "bg-[#e7eee3] text-[#35563a]"
                                : "bg-[var(--bg-surface-secondary)] text-[var(--typo-secondary)]"
                            }`}>

                            {pincodeMessage}
                            {pincodeResult?.serviceable && (
                                <span className="mt-1 block font-semibold">
                                    {pincodeResult.deliveryWindow}
                                    {typeof pincodeResult.deliveryCharge === "number" && ` · ${pincodeResult.deliveryCharge === 0 ? "Free delivery" : formatCurrency(pincodeResult.deliveryCharge, product.purchase.currency)}`}
                                </span>
                            )}
                        </div>
                    )}

                    <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-[var(--typo-muted)]">
                        <Truck size={15} className="mt-0.5 shrink-0 text-[var(--typo-primary)]" aria-hidden="true" />
                        {product.shipping.dispatchLabel}
                    </p>

                    <p className="mt-2 text-[10px] leading-relaxed text-[var(--typo-muted)]">
                        {product.shipping.deliveryNote}
                    </p>

                    <div className="mt-4 flex items-center gap-2 rounded-lg border border-[var(--border-secondary)] bg-[var(--bg-surface-secondary)]/60 px-3 py-2.5 text-[10px] font-medium text-[var(--typo-secondary)]">
                        <LockKeyhole size={14} aria-hidden="true" />
                        {product.shipping.secureLabel}
                    </div>
                </div>
            </div>

            <div className="mt-4 rounded-2xl border border-[var(--border-secondary)] bg-[var(--bg-surface-secondary)]/75 p-4 sm:p-5">
                <div className="flex items-start gap-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--bg-surface-primary)] text-[var(--typo-primary)]">
                        <PackageCheck size={18} aria-hidden="true" />
                    </div>

                    <div className="min-w-0">
                        <h2 className="font-serif text-lg leading-tight text-[var(--typo-primary)]">
                            {product.largerVision.title}
                        </h2>

                        <p className="mt-2 text-[11px] leading-relaxed text-[var(--typo-muted)]">
                            {product.largerVision.description}
                        </p>

                        <a href={product.largerVision.href} className="mt-3 inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--typo-primary)] underline decoration-[var(--border-brand-pri)] underline-offset-4 transition hover:opacity-65">
                            {product.largerVision.linkLabel}
                        </a>
                    </div>
                </div>
            </div>
        </aside>
    );
}
