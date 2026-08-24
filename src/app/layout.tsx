import type { Metadata } from "next";
import Script from "next/script";
import { Nunito } from "next/font/google";

import "./globals.css";

import Analytics from "@/components/Analytics";
import BrandSchema from "@/components/BrandSchema";
import CookieConsent from "@/components/CookieConsent";
import QueryProvider from "@/components/providers/QueryProvider";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tinyur | Free URL Shortener — Create Short Links Instantly",

  description:
    "Free URL shortener to create short links, custom aliases, and click analytics. Fast, secure, and easy to share on WhatsApp, Instagram, email, and more.",

  keywords: [
    "URL Shortener",
    "Tinyur url shortener",
    "Free URL Shortener",
    "Open Source URL Shortener",
    "Simple URL Shortener",
    "Tinyur",
    "Link Shortener",
    "Custom short links",
    "Free and Unlimited URL Shortener",
  ],

  icons: "/icon.png",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  metadataBase: new URL("https://tinyur.in"),

  openGraph: {
    images: {
      url: "https://tinyur.in/opengraph-image.png",
      width: 1920,
      height: 1008,
      alt: "Tinyur — Free URL Shortener",
    },
    title: "Tinyur | Free URL Shortener",
    description:
      "Create short, shareable links in seconds. Custom aliases, click analytics, and a free developer API.",
    url: "https://tinyur.in",
    type: "website",
    siteName: "Tinyur URL Shortener",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Tinyur | Free URL Shortener",
    description:
      "Create short, shareable links in seconds. Custom aliases, click analytics, and a free developer API.",
    images: ["https://tinyur.in/opengraph-image.png"],
    site: "@tinyur",
    creator: "@tinyur",
  },

  other: {
    "google-adsense-account": "ca-pub-7464509288176224",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} font-sans antialiased`}>
        <Script
          id="adsense"
          async
          strategy="lazyOnload"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7464509288176224"
        />

<Script
          id="adsterra"
          async
          strategy="lazyOnload"
          crossOrigin="anonymous"
          src="https://pl28767194.profitableratecpmnetwork.com/9049c3c244f96a9f73fec77b523bbc33/invoke.js"
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-white/20 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>

        <QueryProvider>
          {children}

          <CookieConsent />
        </QueryProvider>
        <Analytics />
        <BrandSchema />
      </body>
    </html>
  );
}