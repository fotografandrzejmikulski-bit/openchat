import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { BRAND } from "@/lib/brand";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: BRAND.productName,
    template: `%s · ${BRAND.name}`,
  },
  description: BRAND.shortDescription,
  applicationName: BRAND.productName,
  generator: "Next.js",
  keywords: ["AI", "AURELIS", "inteligencja", "asystent AI", "produktywność", "badania", "dokumenty", "tworzenie"],
  authors: [{ name: "Andrzej Mikulski" }],
  creator: "Andrzej Mikulski",
  publisher: "AURELIS AI",
  robots: { index: true, follow: true },
};

export const viewport = {
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F7F4" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0D" },
  ],
};

const geist = Geist({ subsets: ["latin"], display: "swap", variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], display: "swap", variable: "--font-geist-mono" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], display: "swap", variable: "--font-display", weight: ["500", "600", "700"] });

const LIGHT_THEME_COLOR = "#F8F7F4";
const DARK_THEME_COLOR = "#0B0B0D";
const THEME_COLOR_SCRIPT = `\
(function() {
  var html = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'theme-color'); document.head.appendChild(meta); }
  function update() { meta.setAttribute('content', html.classList.contains('dark') ? '${DARK_THEME_COLOR}' : '${LIGHT_THEME_COLOR}'); }
  new MutationObserver(update).observe(html, { attributes: true, attributeFilter: ['class'] });
  update();
})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${geist.variable} ${geistMono.variable} ${cormorant.variable}`} lang="pl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_COLOR_SCRIPT }} />
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange enableSystem>
          <Toaster position="top-center" />
          <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
