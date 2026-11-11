export const homeConfig = {
  hero: {
    eyebrow: "THE ART OF INDIA",

    title: "Where Tradition Meets Timeless Art",

    description:
      "Explore India's rich artistic heritage through handcrafted creations made by skilled artisans.",

    cta: {
      label: "Explore Art Forms",
      href: "/art-forms",
    },

    secondaryCta: {
      label: "Discover Our Story",
      href: "/about",
    },

    image: "/images/home/hero-banner.webp",
  },

  featuredCategories: {
    title: "Explore Indian Art Forms",

    description: "Discover the beauty of India's diverse artistic traditions.",

    items: [
      {
        id: "madhubani",
        name: "Madhubani Painting",
        image: "/images/categories/madhubani.webp",
        href: "/art-forms/madhubani",
      },
      {
        id: "warli",
        name: "Warli Art",
        image: "/images/categories/warli.webp",
        href: "/art-forms/warli",
      },
      {
        id: "blue-pottery",
        name: "Blue Pottery",
        image: "/images/categories/blue-pottery.webp",
        href: "/art-forms/blue-pottery",
      },
      {
        id: "pattachitra",
        name: "Pattachitra",
        image: "/images/categories/pattachitra.webp",
        href: "/art-forms/pattachitra",
      },
    ],
  },

  newArrivals: {
    title: "Fresh From The Artisans",

    description: "Explore the latest additions to our handcrafted collection.",

    products: [
      {
        id: "product-001",
        name: "Traditional Madhubani Artwork",
        price: 2500,
        image: "/images/products/product-1.webp",
        href: "/products/madhubani-artwork",
      },
      {
        id: "product-002",
        name: "Handcrafted Blue Pottery Vase",
        price: 1800,
        image: "/images/products/product-2.webp",
        href: "/products/blue-pottery-vase",
      },
      {
        id: "product-003",
        name: "Warli Wall Art",
        price: 3200,
        image: "/images/products/product-3.webp",
        href: "/products/warli-wall-art",
      },
    ],
  },

  brandStory: {
    eyebrow: "OUR HERITAGE",

    title: "Preserving India's Artistic Heritage",

    description:
      "Every creation carries a story of culture, craftsmanship and generations of artistic knowledge.",

    cta: {
      label: "Discover Our Story",
      href: "/about",
    },

    image: "/images/home/brand-story.webp",
  },

  promotion: {
    eyebrow: "A CELEBRATION OF CRAFT",

    title: "Bring Home Something Extraordinary",

    description: "Explore handcrafted treasures that celebrate India's cultural heritage.",

    cta: {
      label: "Explore Collection",
      href: "/new-arrivals",
    },

    image: "/images/home/promotion.webp",
  },
} as const;
