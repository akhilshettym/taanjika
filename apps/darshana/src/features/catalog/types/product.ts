export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface ProductImage {
  id: string;
  src: string;
  alt: string;
  label: string;
}

export interface FramePreviewStyle {
  color: string;
  borderWidth: number;
  shadow?: string;
}

export interface FrameOption {
  id: string;
  name: string;
  description: string;
  image: string;
  additionalPrice: number;
  priceCaption?: string;
  preview: FramePreviewStyle;
}

export interface ProductDetailItem {
  label: string;
  value: string;
}

export interface PincodeLookupResult {
  serviceable: boolean;
  message: string;
  deliveryWindow?: string;
  deliveryCharge?: number;
}

export interface ProductUiLabels {
  galleryAriaLabel: string;
  previousImageLabel: string;
  nextImageLabel: string;
  viewFullScreenLabel: string;
  fullscreenGalleryLabel: string;
  closeFullscreenLabel: string;
  detailsHeading: string;
  reviewsSuffix: string;
  frameSelectionHint: string;
  currentSelectionPrefix: string;
  pincodeInputLabel: string;
}

export interface ProductPayload {
  schemaVersion: number;
  id: string;
  slug: string;
  title: string;
  artForm: {
    name: string;
    origin: string;
    slug: string;
    collectionName: string;
    href: string;
    allArtFormsHref: string;
  };
  ui: ProductUiLabels;
  navigation: {
    breadcrumbs: BreadcrumbItem[];
    backToArtFormLabel: string;
  };
  gallery: {
    badge: string;
    images: ProductImage[];
    thumbnailHint: string;
    trustNote: {
      title: string;
      description: string;
      selectedFrameMessage: string;
    };
  };
  reviews: {
    enabled: boolean;
    rating: number;
    reviewCount: number;
    accessibleLabel: string;
  };
  links: {
    shopArtFormLabel: string;
    allArtFormsLabel: string;
  };
  actions: {
    wishlistLabel: string;
    wishlistActiveLabel: string;
    shareLabel: string;
    specSheetLabel: string;
  };
  description: {
    title: string;
    body: string;
  };
  details: ProductDetailItem[];
  artistSignature: {
    signed: boolean;
    label: string;
  };
  purchase: {
    badge: string;
    baseAmount: number;
    currency: string;
    taxLabel: string;
    includedFrameLabel: string;
    availabilityLabel: string;
    addToCartLabel: string;
    buyNowLabel: string;
    addedToCartMessage: string;
    checkoutHref: string;
    checkoutEventName: string;
    frameSectionTitle: string;
    selectedFrameLabel: string;
    shippingTitle: string;
  };
  frameOptions: FrameOption[];
  shipping: {
    pincodePlaceholder: string;
    checkButtonLabel: string;
    invalidPincodeMessage: string;
    unknownPincodeMessage: string;
    dispatchLabel: string;
    deliveryNote: string;
    secureLabel: string;
    pincodeLookup: Record<string, PincodeLookupResult>;
  };
  largerVision: {
    title: string;
    description: string;
    linkLabel: string;
    href: string;
  };
}
