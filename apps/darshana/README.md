darshana/
│
├── public/
│ ├── images/
│ │ ├── branding/
│ │ ├── homepage/
│ │ ├── categories/
│ │ └── placeholders/
│ ├── icons/
│ └── fonts/
│
├── src/
│ │
│ ├── app/
│ │ ├── layout.tsx
│ │ ├── globals.css
│ │ ├── error.tsx
│ │ ├── global-error.tsx
│ │ └── not-found.tsx
│ │
│ │ ├── (auth)/
│ │ │ ├── layout.tsx
│ │ │ ├── loading.tsx
│ │ │ ├── sign-in/
│ │ │ │ └── page.tsx
│ │ │ ├── register/
│ │ │ │ └── page.tsx
│ │ │ └── forgot-password/
│ │ │ └── page.tsx
│ │ │
│ │ ├── (store)/
│ │ │ ├── layout.tsx
│ │ │ ├── loading.tsx
│ │ │ ├── page.tsx
│ │ │ ├── explore/
│ │ │ │ └── page.tsx
│ │ │ ├── search/
│ │ │ │ └── page.tsx
│ │ │ ├── categories/
│ │ │ │ ├── page.tsx
│ │ │ │ └── [slug]/
│ │ │ │ └── page.tsx
│ │ │ ├── products/
│ │ │ │ └── [slug]/
│ │ │ │ └── page.tsx
│ │ │ ├── artists/
│ │ │ │ ├── page.tsx
│ │ │ │ └── [artistSlug]/
│ │ │ │ └── page.tsx
│ │ │ ├── collections/
│ │ │ │ └── [slug]/
│ │ │ │ └── page.tsx
│ │ │ ├── cart/
│ │ │ │ └── page.tsx
│ │ │ └── checkout/
│ │ │ └── page.tsx
│ │ │
│ │ ├── (account)/
│ │ │ └── account/
│ │ │ ├── layout.tsx
│ │ │ ├── page.tsx
│ │ │ ├── profile/
│ │ │ │ └── page.tsx
│ │ │ ├── orders/
│ │ │ │ ├── page.tsx
│ │ │ │ └── [orderId]/
│ │ │ │ └── page.tsx
│ │ │ ├── wishlist/
│ │ │ │ └── page.tsx
│ │ │ └── addresses/
│ │ │ └── page.tsx
│ │ │
│ │ ├── (artist)/
│ │ │ └── artist/
│ │ │ ├── layout.tsx
│ │ │ ├── page.tsx
│ │ │ ├── artworks/
│ │ │ │ ├── page.tsx
│ │ │ │ ├── new/
│ │ │ │ │ └── page.tsx
│ │ │ │ └── [artworkId]/
│ │ │ │ └── edit/
│ │ │ │ └── page.tsx
│ │ │ ├── orders/
│ │ │ │ └── page.tsx
│ │ │ └── profile/
│ │ │ └── page.tsx
│ │ │
│ │ └── (admin)/
│ │ └── admin/
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ ├── artists/
│ │ │ └── applications/
│ │ │ └── page.tsx
│ │ ├── products/
│ │ │ └── page.tsx
│ │ └── orders/
│ │ └── page.tsx
│ │
│ ├── components/
│ │ ├── ui/
│ │ │ ├── button.tsx
│ │ │ ├── input.tsx
│ │ │ ├── checkbox.tsx
│ │ │ ├── dialog.tsx
│ │ │ ├── dropdown.tsx
│ │ │ └── skeleton.tsx
│ │ │
│ │ ├── layout/
│ │ │ ├── header.tsx
│ │ │ ├── footer.tsx
│ │ │ ├── navigation.tsx
│ │ │ └── mobile-navigation.tsx
│ │ │
│ │ └── feedback/
│ │ ├── brand-loader.tsx
│ │ ├── loading-spinner.tsx
│ │ ├── empty-state.tsx
│ │ └── error-state.tsx
│ │
│ ├── features/
│ │ ├── auth/
│ │ │ ├── components/
│ │ │ │ ├── sign-in-form.tsx
│ │ │ │ ├── register-form.tsx
│ │ │ │ └── google-sign-in-button.tsx
│ │ │ ├── hooks/
│ │ │ │ └── use-auth.ts
│ │ │ ├── schemas/
│ │ │ │ ├── sign-in.schema.ts
│ │ │ │ └── register.schema.ts
│ │ │ ├── services/
│ │ │ │ └── auth.service.ts
│ │ │ └── types/
│ │ │ └── auth.types.ts
│ │ │
│ │ ├── catalog/
│ │ ├── products/
│ │ ├── artists/
│ │ ├── cart/
│ │ ├── checkout/
│ │ ├── wishlist/
│ │ ├── orders/
│ │ ├── account/
│ │ └── search/
│ │
│ ├── lib/
│ │ ├── api/
│ │ │ └── moola-client.ts
│ │ ├── firebase/
│ │ │ └── client.ts
│ │ ├── utils/
│ │ │ └── cn.ts
│ │ └── env.ts
│ │
│ ├── providers/
│ │ └── app-providers.tsx
│ │
│ ├── hooks/
│ │
│ ├── config/
│ │ ├── site.ts
│ │ └── navigation.ts
│ │
│ └── types/
│ ├── user.types.ts
│ └── api.types.ts
│
├── next.config.ts
├── tsconfig.json
├── package.json
└── Dockerfile
