"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import type { ProductPayload } from "../../types/product";
import { createSpecSheetText } from "./product-details.utils";
import { Check, FileText, Heart, Share2, Star } from "lucide-react";

interface ProductInformationProps {
  product: ProductPayload;
  onNotify: (message: string) => void;
}

const WISHLIST_STORAGE_KEY = "storefront:wishlist:v1";
const WISHLIST_CHANGE_EVENT = "storefront:wishlist:change";

function subscribeToWishlist(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(WISHLIST_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(WISHLIST_CHANGE_EVENT, callback);
  };
}

export default function ProductInformation({ product, onNotify }: ProductInformationProps) {
  const isWishlisted = useSyncExternalStore(
    subscribeToWishlist,
    () => {
      try {
        const raw = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
        const savedIds: unknown = raw ? JSON.parse(raw) : [];
        return Array.isArray(savedIds) && savedIds.includes(product.id);
      } catch {
        return false;
      }
    },
    () => false,
  );

  const toggleWishlist = () => {
    try {
      const raw = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      const savedIds = Array.isArray(parsed) ? (parsed as string[]) : [];
      const nextIds = isWishlisted
        ? savedIds.filter((id) => id !== product.id)
        : [...new Set([...savedIds, product.id])];

      window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(nextIds));
      window.dispatchEvent(new Event(WISHLIST_CHANGE_EVENT));
      onNotify(
        !isWishlisted
          ? `${product.title} saved to your wishlist.`
          : `${product.title} removed from your wishlist.`,
      );
    } catch {
      onNotify("Your browser could not save this wishlist change.");
    }
  };

  const shareProduct = async () => {
    const shareData = {
      title: product.title,
      text: `${product.title} · ${product.artForm.collectionName}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareData.url);
        onNotify("Product link copied to clipboard.");
      } else {
        onNotify("Sharing is not supported by this browser.");
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      onNotify("We could not share this product right now.");
    }
  };

  const downloadSpecSheet = () => {
    const blob = new Blob([createSpecSheetText(product)], {
      type: "text/plain;charset=utf-8",
    });

    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = objectUrl;
    anchor.download = `${product.slug}-spec-sheet.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(objectUrl);
    onNotify("Spec sheet downloaded.");
  };

  return (
    <section className="text-typo-primary min-w-0">
      <p className="text-typo-muted text-[10px] font-semibold tracking-[0.2em] uppercase sm:text-xs">
        {product.artForm.collectionName}
      </p>

      <h1 className="text-typo-primary mt-3 font-serif text-3xl leading-[1.08] tracking-tight sm:text-4xl 2xl:text-[2.8rem]">
        {product.title}
      </h1>

      <p className="text-typo-muted mt-3 text-xs tracking-wide sm:text-sm">
        {product.artForm.name} <span className="mx-1.5">|</span> {product.artForm.origin}
      </p>

      {product.reviews.enabled && (
        <div
          role="img"
          className="mt-4 flex flex-wrap items-center gap-2"
          aria-label={product.reviews.accessibleLabel}
        >
          <div className="flex items-center gap-0.5 text-[#b67b33]" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={14}
                fill={index < Math.round(product.reviews.rating) ? "currentColor" : "none"}
                strokeWidth={1.6}
              />
            ))}
          </div>

          <span className="text-typo-primary text-sm font-semibold tabular-nums">
            {product.reviews.rating.toFixed(1)}
          </span>

          <span className="text-typo-muted text-xs">
            ({product.reviews.reviewCount} {product.ui.reviewsSuffix})
          </span>
        </div>
      )}

      <div className="border-border-secondary text-typo-primary mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-b pb-5 text-xs font-semibold sm:text-sm">
        <Link href={product.artForm.href} className="transition hover:opacity-65">
          {product.links.shopArtFormLabel}
        </Link>
        <Link
          href={product.artForm.allArtFormsHref}
          className="text-typo-muted decoration-border-primary hover:text-typo-primary underline underline-offset-4 transition"
        >
          {product.links.allArtFormsLabel}
        </Link>
      </div>

      <div className="border-border-secondary flex flex-wrap items-center gap-2 border-b py-4">
        <button
          type="button"
          aria-pressed={isWishlisted}
          onClick={toggleWishlist}
          className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-3.5 text-xs font-medium transition ${isWishlisted ? "border-border-brand-pri bg-surface-secondary text-typo-primary" : "border-border-secondary text-typo-muted hover:border-border-primary hover:text-typo-primary"}`}
        >
          <Heart size={15} fill={isWishlisted ? "currentColor" : "none"} aria-hidden="true" />
          {isWishlisted ? product.actions.wishlistActiveLabel : product.actions.wishlistLabel}
        </button>

        <button
          type="button"
          onClick={shareProduct}
          className="border-border-secondary text-typo-muted hover:border-border-primary hover:text-typo-primary inline-flex min-h-10 items-center gap-2 rounded-full border px-3.5 text-xs font-medium transition"
        >
          <Share2 size={15} aria-hidden="true" />
          {product.actions.shareLabel}
        </button>

        <button
          type="button"
          onClick={downloadSpecSheet}
          className="border-border-secondary text-typo-muted hover:border-border-primary hover:text-typo-primary inline-flex min-h-10 items-center gap-2 rounded-full border px-3.5 text-xs font-medium transition"
        >
          <FileText size={15} aria-hidden="true" />
          {product.actions.specSheetLabel}
        </button>
      </div>

      <div className="pt-5 sm:pt-6">
        <h2 className="text-typo-primary font-serif text-2xl leading-tight sm:text-[1.7rem]">
          {product.description.title}
        </h2>
        <p className="text-typo-muted mt-3 text-sm leading-[1.85] whitespace-pre-line">
          {product.description.body}
        </p>
      </div>

      <div className="border-border-secondary mt-7 border-t pt-5 sm:mt-8">
        <h2 className="text-typo-primary font-serif text-xl">{product.ui.detailsHeading}</h2>
        <dl className="mt-4 grid grid-cols-1 gap-x-5 sm:grid-cols-2">
          {product.details.map((detail) => (
            <div
              key={detail.label}
              className="border-border-secondary grid grid-cols-[minmax(92px,0.8fr)_minmax(0,1.2fr)] gap-2 border-b py-3 text-xs sm:text-[13px]"
            >
              <dt className="text-typo-muted">{detail.label}</dt>
              <dd className="text-typo-secondary leading-relaxed font-medium">{detail.value}</dd>
            </div>
          ))}
        </dl>

        {product.artistSignature.signed && (
          <p className="text-typo-primary mt-4 inline-flex items-center gap-2 text-xs font-semibold">
            <span className="bg-surface-secondary grid h-5 w-5 place-items-center rounded-full">
              <Check size={13} aria-hidden="true" />
            </span>
            {product.artistSignature.label}
          </p>
        )}
      </div>
    </section>
  );
}
