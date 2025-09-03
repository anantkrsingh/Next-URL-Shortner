import Short from "@/components/short";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tinyur URL Shortener, Free & No Ads",
  description: "Free URL Shortener, No Ads, No Tracking, No BS",

  keywords: [
    "URL Shortener",
    "Free URL Shortener",
    "No Ads",
    "No Tracking",
    "No BS",
    "Simple URL Shortener",
  ],
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
      alt: "Tinyur URL Shortener, Free & No Ads",
    },
    title: "Tinyur URL Shortener, Free & No Ads",
    description: "Free URL Shortener, No Ads, No Tracking, No BS",
    url: "https://tinyur.in",
    type: "website",
    siteName: "Tinyur URL Shortener",
    locale: "en_US",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tinyur URL Shortener, Free & No Ads",
    description: "Free URL Shortener, No Ads, No Tracking, No BS",
    images: [
      {
        url: "https://tinyur.in/icon.png",
        width: 64,
        height: 64,
      },
    ],
    site: "@tinyur",
    creator: "@tinyur",
    creatorId: "1234567890",
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
        className="text-white hover:cursor-pointer text-shadow-md text-end w-full underline underline-offset-2  font-bold text-lg"
      >
        API Docs
      </Link>
      <Short />
    </div>
  );
}
