import type { ReactNode } from "react";

import { Header } from "@/components/layout/header";
// import { Footer } from "@/components/layout/footer";

export default function StorefrontLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <>
            <Header />
            <main> {children} </main>
            {/* <Footer /> */}
        </>
    );
}
