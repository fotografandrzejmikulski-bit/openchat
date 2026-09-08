import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
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
  keywords: [
    "AI",
    "AURELIS",
    "inteligencja",
    "asystent AI",
    "produktywność",
    "badania",
    "dokumenty",
    "tworzenie",
  ],
  authors: [{ name: BRAND.signature }],
  creator: BRAND.signature,
  publisher: BRAND.productName,
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: BRAND.palette.snow },
    { media: "(prefers-color-scheme: dark)", color: BRAND.palette.obsidian },
  ],
};

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const LIGHT_THEME_COLOR = BRAND.palette.snow;
const DARK_THEME_COLOR = BRAND.palette.obsidian;
const THEME_COLOR_SCRIPT = `\
(function() {
  var html = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
  }
  function update() {
    meta.setAttribute(
      'content',
      html.classList.contains('dark') ? '${DARK_THEME_COLOR}' : '${LIGHT_THEME_COLOR}'
    );
  }
  new MutationObserver(update).observe(html, {
    attributes: true,
    attributeFilter: ['class']
  });
  update();
})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={`${geist.variable} ${geistMono.variable} ${cormorant.variable}`}
      lang="pl"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_COLOR_SCRIPT }} />
      </head>
      <body className="antialiased">
        <a
          className="aurelis-focus fixed top-2 left-2 z-[100] -translate-y-20 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm shadow-lg transition-transform focus:translate-y-0"
          href="#main-content"
        >
          Przejdź do głównej treści
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <Toaster position="top-center" />
          <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
