export type NavigationLink = {
  label: string;
  href: string;
};

export type NavigationItem = NavigationLink & {
  children?: NavigationLink[];
};

export const navigationConfig: NavigationItem[] = [
  {
    label: "ART FORMS",
    href: "/art-forms",
  },
  {
    label: "SHOP BY ART FORMS",
    href: "/shop/art-forms",
    children: [
      { label: "Paintings", href: "/art-forms/paintings" },
      { label: "Sculptures", href: "/art-forms/sculptures" },
      { label: "Textiles", href: "/art-forms/textiles" },
      { label: "Pottery", href: "/art-forms/pottery" },
      { label: "Woodcraft", href: "/art-forms/woodcraft" },
    ],
  },
  {
    label: "SHOP BY PRICE",
    href: "/shop/price",
    children: [
      { label: "Under ₹1,000", href: "/shop/price/under-1000" },
      { label: "₹1,000 - ₹5,000", href: "/shop/price/1000-5000" },
      { label: "₹5,000 - ₹10,000", href: "/shop/price/5000-10000" },
      { label: "Above ₹10,000", href: "/shop/price/above-10000" },
    ],
  },
  {
    label: "NEW ARRIVALS",
    href: "/new-arrivals",
  },
  {
    label: "ARTISTS",
    href: "/artists",
  },
  {
    label: "FEATURES",
    href: "/features",
    children: [
      { label: "Stories", href: "/features/stories" },
      { label: "Artisan Spotlights", href: "/features/artisan-spotlights" },
      { label: "Collections", href: "/features/collections" },
    ],
  },
  {
    label: "CLASSES",
    href: "/classes",
  },
];
