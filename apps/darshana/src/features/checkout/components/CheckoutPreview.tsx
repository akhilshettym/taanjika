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
    <main className="bg-background text-typo-primary min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/art-forms"
          className="text-typo-muted hover:text-typo-primary inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase transition"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Continue shopping
        </Link>

        <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.8fr)]">
          <section>
            <p className="text-typo-muted text-[10px] font-semibold tracking-[0.2em] uppercase">
              Your selection
            </p>

            <h1 className="text-typo-primary mt-2 font-serif text-3xl sm:text-4xl">
              Review your artwork
            </h1>

            <p className="text-typo-muted mt-2 text-sm leading-relaxed">
              Check your artwork and frame selection before connecting the live checkout flow.
            </p>

            {cart.length > 0 ? (
              <div className="divide-border-secondary border-border-secondary bg-surface-primary mt-7 divide-y rounded-2xl border px-4 sm:px-6">
                {cart.map((line) => (
                  <article key={`${line.productId}-${line.frameId}`} className="flex gap-4 py-5">
                    <div className="bg-surface-secondary relative h-24 w-20 shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-24">
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
                      <h2 className="text-typo-primary font-serif text-lg">{line.title}</h2>
                      <p className="text-typo-muted mt-1 text-xs">{line.frameName} frame</p>
                      <p className="text-typo-muted mt-2 text-xs">Quantity: {line.quantity}</p>
                      <p className="text-typo-primary mt-2 text-sm font-semibold">
                        {formatCurrency(line.unitPrice * line.quantity, line.currency)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="border-border-primary bg-surface-primary mt-7 rounded-2xl border border-dashed px-6 py-12 text-center">
                <PackageCheck size={30} className="text-typo-muted mx-auto" aria-hidden="true" />

                <h2 className="text-typo-primary mt-4 font-serif text-xl">Your cart is empty</h2>

                <p className="text-typo-muted mt-2 text-sm">
                  Choose an original artwork to see it here.
                </p>

                <Link
                  href="/art-forms"
                  className="bg-primary hover:bg-secondary mt-5 inline-flex rounded-full px-5 py-3 text-xs font-semibold tracking-widest text-white uppercase transition"
                >
                  Explore art forms
                </Link>
              </div>
            )}
          </section>

          <aside className="border-border-primary bg-surface-primary h-fit rounded-2xl border p-5 sm:p-6">
            <h2 className="text-typo-primary font-serif text-2xl">Order summary</h2>

            <div className="border-border-secondary mt-5 flex justify-between gap-4 border-b pb-4 text-sm">
              <span className="text-typo-muted">
                Items ({cart.reduce((sum, line) => sum + line.quantity, 0)})
              </span>
              <span className="text-typo-primary font-semibold">
                {formatCurrency(subtotal, currency)}
              </span>
            </div>

            <div className="flex justify-between gap-4 py-4 text-sm">
              <span className="text-typo-primary font-semibold">Subtotal</span>
              <span className="text-typo-primary font-semibold">
                {formatCurrency(subtotal, currency)}
              </span>
            </div>

            <p className="text-typo-muted text-[11px] leading-relaxed">
              Shipping and final delivery details will be confirmed after a valid address and PIN
              code are connected to the backend.
            </p>

            <button
              type="button"
              disabled={cart.length === 0}
              onClick={handleContinue}
              className="bg-primary hover:bg-secondary mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-xs font-semibold tracking-[0.12em] text-white uppercase transition disabled:cursor-not-allowed disabled:opacity-40"
            >
              <CheckCircle2 size={16} aria-hidden="true" />
              Continue to checkout
            </button>

            <button
              type="button"
              disabled={cart.length === 0}
              onClick={handleClearCart}
              className="text-typo-muted hover:text-typo-primary mt-3 inline-flex w-full items-center justify-center gap-2 py-2 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Trash2 size={14} aria-hidden="true" />
              Clear demo cart
            </button>

            {notice && (
              <p
                role="status"
                className="bg-surface-secondary text-typo-secondary mt-4 rounded-lg p-3 text-xs leading-relaxed"
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
