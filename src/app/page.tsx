
import HomeComponent from "@/components/home/page";
import Short from "@/components/short";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Tinyur | Free URL Shortener Without Ads or Tracking",
  description:
    "Shorten your long links with Tinyur. 100% free, privacy-focused URL shortener. No ads, no tracking, no hidden costs. Simple, fast, and reliable link shortener for personal & business use.",
  keywords: [
    "URL Shortener",
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
  generator: "Next.js",
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
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat gap-2 flex flex-col items-center p-4 relative overflow-hidden"
      style={{ backgroundImage: "url(/bg.webp)" }}
    >
      <Link
        href="/api-docs"
        className="text-white hover:cursor-pointer text-shadow-md text-end w-full underline underline-offset-2 font-bold text-lg"
      >
        API Docs
      </Link>
      <HomeComponent />
      <Short />
    </div>
  );
}
