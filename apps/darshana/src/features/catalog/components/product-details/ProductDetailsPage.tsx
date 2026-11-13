"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import type { FrameOption, ProductPayload } from "../../types/product";
import ProductGallery from "./ProductGallery";
import ProductInformation from "./ProductInformation";
import PurchasePanel from "./PurchasePanel";

interface ProductDetailsPageProps {
    product: ProductPayload;
}

export default function ProductDetailsPage({ product }: ProductDetailsPageProps) {
    const defaultFrame =
        product.frameOptions.find((frame) => frame.id === "synthetic") ??
        product.frameOptions[0] ?? {
            id: "default",
            name: "Default",
            description: "Default frame",
            image: "",
            additionalPrice: 0,
            preview: { color: "#e6d8c5", borderWidth: 12 },
        };

    const [selectedFrame, setSelectedFrame] = useState<FrameOption>(defaultFrame);
    const [notice, setNotice] = useState("");

    const notify = (message: string) => setNotice(message);

    return (
        <main className="min-h-screen bg-[var(--bg-background)] text-[var(--typo-primary)]">
            <div className="mx-auto w-full max-w-[1760px] px-4 pb-16 pt-5 sm:px-6 sm:pt-7 lg:px-8 2xl:px-10">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-x-5 gap-y-3 border-b border-[var(--border-secondary)] pb-4 sm:mb-8 sm:pb-5">
                    <nav aria-label="Breadcrumb" className="min-w-0">
                        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-[var(--typo-muted)] sm:text-xs">
                            {product.navigation.breadcrumbs.map((item, index) => {
                                const isCurrent = index === product.navigation.breadcrumbs.length - 1;

                                return (
                                    <li key={`${item.href}-${item.label}`} className="flex items-center gap-2">
                                        {index > 0 && <span aria-hidden="true" className="text-[var(--border-primary)]">/</span>}
                                        {isCurrent ? (
                                            <span aria-current="page" className="max-w-[150px] truncate font-medium text-[var(--typo-primary)] sm:max-w-none">
                                                {item.label}
                                            </span>
                                        ) : (
                                            <Link href={item.href} className="transition hover:text-[var(--typo-primary)]">
                                                {item.label}
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                        </ol>
                    </nav>

                    <Link href={product.artForm.href} className="inline-flex shrink-0 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--typo-primary)] transition hover:opacity-65 sm:text-xs">
                        <ArrowLeft size={14} aria-hidden="true" />
                        {product.navigation.backToArtFormLabel}
                    </Link>
                </div>

                <div className="grid grid-cols-1 items-start gap-7 lg:gap-8 xl:grid-cols-[40fr_35fr_25fr] xl:gap-6 2xl:gap-8">
                    <ProductGallery product={product} selectedFrame={selectedFrame} />
                    <ProductInformation product={product} onNotify={notify} />
                    <PurchasePanel product={product} selectedFrame={selectedFrame} onSelectFrame={setSelectedFrame} onNotify={notify} />
                </div>
            </div>

            {notice && (
                <div role="status"
                    aria-live="polite"
                    className="fixed bottom-4 left-1/2 z-[110] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start justify-between gap-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-surface-primary)] px-4 py-3 text-xs text-[var(--typo-primary)] shadow-[0_12px_35px_rgba(33,26,23,0.16)]">

                    <span className="leading-relaxed">
                        {notice}
                    </span>

                    <button type="button" aria-label="Dismiss notification" onClick={() => setNotice("")} className="shrink-0 rounded-full p-1 text-[var(--typo-muted)] transition hover:bg-[var(--bg-surface-secondary)]">
                        <X size={15} aria-hidden="true" />
                    </button>
                </div>
            )}
        </main>
    );
}
