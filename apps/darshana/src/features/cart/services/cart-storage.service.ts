import type { CartLine } from "../types/cart";

const CART_STORAGE_KEY = "storefront:cart:v1";

function readCart(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartLine[]) : [];
  } catch {
    return [];
  }
}

/** Local-only cart adapter for the pre-backend storefront. */
export function addProductToLocalCart(line: CartLine): void {
  const cart = readCart();
  const existingIndex = cart.findIndex(
    (item) => item.productId === line.productId && item.frameId === line.frameId,
  );

  if (existingIndex >= 0) {
    cart[existingIndex] = {
      ...cart[existingIndex],
      quantity: cart[existingIndex].quantity + line.quantity,
      addedAt: line.addedAt,
    };
  } else {
    cart.push(line);
  }

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent("storefront:cart-updated", { detail: { cart } }));
}

export function getLocalCart(): CartLine[] {
  return readCart();
}

export function clearLocalCart(): void {
  window.localStorage.removeItem(CART_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("storefront:cart-updated", { detail: { cart: [] } }));
}
