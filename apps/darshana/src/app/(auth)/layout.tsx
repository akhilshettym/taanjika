import type { ReactNode } from "react";
import { HeaderSecondary } from "@/components/layout/header";
import { FooterSecondary } from "@/components/layout/footer";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <HeaderSecondary />

      <main className="bg-surfacer-muted min-h-screen">{children}</main>

      <FooterSecondary />
    </>
  );
}
