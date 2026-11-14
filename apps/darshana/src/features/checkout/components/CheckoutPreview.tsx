"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, PackageCheck, Trash2 } from "lucide-react";
import { clearLocalCart, getLocalCart } from "../../cart/services/cart-storage.service";
import type { CartLine } from "../../cart/types/cart";

function formatCurrency(amount: number, currency: string): string {
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

export default function CheckoutPreview() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const syncCart = () => setCart(getLocalCart());
    syncCart();
    window.addEventListener("storefront:cart-updated", syncCart);
    window.addEventListener("storage", syncCart);
    return () => {
      window.removeEventListener("storefront:cart-updated", syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  const subtotal = useMemo(
    () => cart.reduce((total, line) => total + line.unitPrice * line.quantity, 0),
    [cart],
  );
  const currency = cart[0]?.currency ?? "INR";

  const handleClearCart = () => {
    clearLocalCart();
    setCart([]);
    setNotice("Your demo cart is now empty.");
  };

  const handleContinue = () => {
    setNotice(
      "This is the demo checkout boundary. Connect order creation, address validation and payment before enabling real purchases.",
    );
  };

  return (
    <main className="min-h-screen bg-[var(--bg-background)] px-4 py-8 text-[var(--typo-primary)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/art-forms"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-[var(--typo-muted)] uppercase transition hover:text-[var(--typo-primary)]"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Continue shopping
        </Link>

        <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.8fr)]">
          <section>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--typo-muted)] uppercase">
              Your selection
            </p>

            <h1 className="mt-2 font-serif text-3xl text-[var(--typo-primary)] sm:text-4xl">
              Review your artwork
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-[var(--typo-muted)]">
              Check your artwork and frame selection before connecting the live checkout flow.
            </p>

            {cart.length > 0 ? (
              <div className="mt-7 divide-y divide-[var(--border-secondary)] rounded-2xl border border-[var(--border-secondary)] bg-[var(--bg-surface-primary)] px-4 sm:px-6">
                {cart.map((line) => (
                  <article key={`${line.productId}-${line.frameId}`} className="flex gap-4 py-5">
                    <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-[var(--bg-surface-secondary)] sm:h-28 sm:w-24">
                      {line.image && (
                        <Image
                          src={line.image}
                          alt={line.title}
                          fill
                          unoptimized
                          sizes="96px"
                          className="object-contain p-1"
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="font-serif text-lg text-[var(--typo-primary)]">
                        {line.title}
                      </h2>
                      <p className="mt-1 text-xs text-[var(--typo-muted)]">
                        {line.frameName} frame
                      </p>
                      <p className="mt-2 text-xs text-[var(--typo-muted)]">
                        Quantity: {line.quantity}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-[var(--typo-primary)]">
                        {formatCurrency(line.unitPrice * line.quantity, line.currency)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-7 rounded-2xl border border-dashed border-[var(--border-primary)] bg-[var(--bg-surface-primary)] px-6 py-12 text-center">
                <PackageCheck
                  size={30}
                  className="mx-auto text-[var(--typo-muted)]"
                  aria-hidden="true"
                />

                <h2 className="mt-4 font-serif text-xl text-[var(--typo-primary)]">
                  Your cart is empty
                </h2>

                <p className="mt-2 text-sm text-[var(--typo-muted)]">
                  Choose an original artwork to see it here.
                </p>

                <Link
                  href="/art-forms"
                  className="mt-5 inline-flex rounded-full bg-[var(--bg-primary)] px-5 py-3 text-xs font-semibold tracking-[0.1em] text-white uppercase transition hover:bg-[var(--bg-secondary)]"
                >
                  Explore art forms
                </Link>
              </div>
            )}
          </section>

          <aside className="h-fit rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-surface-primary)] p-5 sm:p-6">
            <h2 className="font-serif text-2xl text-[var(--typo-primary)]">Order summary</h2>

            <div className="mt-5 flex justify-between gap-4 border-b border-[var(--border-secondary)] pb-4 text-sm">
              <span className="text-[var(--typo-muted)]">
                Items ({cart.reduce((sum, line) => sum + line.quantity, 0)})
              </span>
              <span className="font-semibold text-[var(--typo-primary)]">
                {formatCurrency(subtotal, currency)}
              </span>
            </div>

            <div className="flex justify-between gap-4 py-4 text-sm">
              <span className="font-semibold text-[var(--typo-primary)]">Subtotal</span>
              <span className="font-semibold text-[var(--typo-primary)]">
                {formatCurrency(subtotal, currency)}
              </span>
            </div>

            <p className="text-[11px] leading-relaxed text-[var(--typo-muted)]">
              Shipping and final delivery details will be confirmed after a valid address and PIN
              code are connected to the backend.
            </p>

            <button
              type="button"
              disabled={cart.length === 0}
              onClick={handleContinue}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--bg-primary)] px-4 py-3 text-xs font-semibold tracking-[0.12em] text-white uppercase transition hover:bg-[var(--bg-secondary)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <CheckCircle2 size={16} aria-hidden="true" />
              Continue to checkout
            </button>

            <button
              type="button"
              disabled={cart.length === 0}
              onClick={handleClearCart}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 py-2 text-xs font-medium text-[var(--typo-muted)] transition hover:text-[var(--typo-primary)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Trash2 size={14} aria-hidden="true" />
              Clear demo cart
            </button>

            {notice && (
              <p
                role="status"
                className="mt-4 rounded-lg bg-[var(--bg-surface-secondary)] p-3 text-xs leading-relaxed text-[var(--typo-secondary)]"
              >
                {notice}
              </p>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
