import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { AuthProvider } from "@/providers/auth-provider";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

const headingFont = Cormorant_Garamond({
 subsets: ["latin"],
 weight: ["400", "500", "600", "700"],
 variable: "--font-heading",
 display: "swap",
});

const bodyFont = DM_Sans({
 subsets: ["latin"],
 weight: ["400", "500", "600", "700"],
 variable: "--font-body",
 display: "swap",
});

export const metadata: Metadata = {
  title: { 
    default: "Taanjika", 
    template: "%s | Taanjika" 
  },
  description: "A considered home for art, artists and collectors.",
};

export const viewport: Viewport = { 
  width: "device-width", 
  initialScale: 1 
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
