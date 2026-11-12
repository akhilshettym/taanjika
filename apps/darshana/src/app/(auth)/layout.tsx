import type { ReactNode } from "react";
import { HeaderSecondary } from "@/components/layout/header";
import { FooterSecondary } from "@/components/layout/footer";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <HeaderSecondary />

      <main className="min-h-screen bg-surfacer-muted">
        {children}
      </main>

      <FooterSecondary />
    </>
  )
}
