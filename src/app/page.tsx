import Short from "@/components/short";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Tinyur url shortener | Free URL Shortener Without Ads or Tracking",
  description:
    "Tinyur is a free url shortener, short url and create short link using Tinyur. url shortener allows you to create a shortened link making it easy to share.",
  keywords: [
    "cut link",
    "generate link",
    "URL Shortener",
    "url tool	",
    "Tinyur url shortning platform",
    "Tinyur url shortener",
    "Free URL Shortener",
    "Tinyur",
    "Link Shortener",
    "Short Links",
    "Custom URL Shortener",
    "Ad-free URL Shortener",
    "Privacy Friendly URL Shortener",
    "Fast URL Shortener",
    "Simple URL Shortener",
    "No Tracking Link Shortener",
    "Best Free Link Shortener",
    "Tiny URL alternative",
    "Shorten links online",
    "Branded short links",
  ],
  authors: [{ name: "Tinyur Team", url: "https://tinyur.in" }],
  
  applicationName: "Tinyur",
  referrer: "origin-when-cross-origin",
  publisher: "Tinyur",
  alternates: {
    canonical: "https://tinyur.in",
    languages: {
      "en-US": "https://tinyur.in",
    },
  },
  icons: "/icon.png",
  robots: {
    index: true,
    follow: true,
    nocache: true,
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
      url: "https://tinyur.in/icon.png",
      height: 64,
      width: 64,
      alt: "Tinyur - Free & Ad-Free URL Shortener",
    },
    title: "Tinyur | Free, Ad-Free, Privacy Friendly URL Shortener",
    description:
      "Shorten URLs quickly with Tinyur. 100% free, no ads, no tracking. Perfect for personal, social media, or business use.",
    url: "https://tinyur.in",
    type: "website",
    siteName: "Tinyur",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tinyur | Free URL Shortener Without Ads",
    description:
      "Shorten your links for free with Tinyur. No ads, no tracking, no BS. Simple, fast, and reliable link shortener.",
    images: [
      {
        url: "https://tinyur.in/icon.png",
        width: 64,
        height: 64,
        alt: "Tinyur Logo",
      },
    ],
    site: "@tinyur",
    creator: "@tinyur",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Gradient Background from top center - circular for mobile */}
      
      {/* Grain Overlay */}
      
      
      {/* API Docs and Blogs Links */}
      <div className="absolute top-4 right-4 flex gap-4 z-20">
        <Link
          href="/api-docs"
          className="text-white hover:text-blue-300 text-shadow-md underline underline-offset-2 font-bold text-lg transition-colors"
        >
          API Docs
        </Link>
        <Link
          href="/blogs"
          className="text-white hover:text-blue-300 text-shadow-md underline underline-offset-2 font-bold text-lg transition-colors"
        >
          Blogs
        </Link>
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl">
        <Short />
      </div>
    </div>
  );
}
