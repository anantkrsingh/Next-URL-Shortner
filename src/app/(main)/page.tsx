import Short from "@/components/short";
import { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import HomeSections from "@/components/home/sections";
export const metadata: Metadata = {
  title: "Tinyur | Free URL Shortener — Create Short Links Instantly",
  description:
    "Tinyur is a free URL shortener. Create short links, custom aliases, and track clicks. Share cleaner URLs on WhatsApp, Instagram, email, and more.",
  keywords: [
    "cut link",
    "generate link",
    "URL Shortener",
    "url tool",
    "Tinyur url shortener",
    "Free URL Shortener",
    "Tinyur",
    "Link Shortener",
    "Short Links",
    "Custom URL Shortener",
    "Privacy Friendly URL Shortener",
    "Fast URL Shortener",
    "Simple URL Shortener",
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
      alt: "Tinyur - Free URL Shortener",
    },
    title: "Tinyur | Free URL Shortener",
    description:
      "Shorten URLs quickly with Tinyur. Free custom aliases, click analytics, and a developer API for personal, social, or business use.",
    url: "https://tinyur.in",
    type: "website",
    siteName: "Tinyur",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tinyur | Free URL Shortener",
    description:
      "Shorten your links for free with Tinyur. Simple, fast, and reliable link shortener with custom aliases and click analytics.",
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
    <>
      {/* Hero Section with Background Image */}
      <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-32 pb-16">
        {/* Background Image */}
        <Image
          src="/bg.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        
        {/* Grain Overlay */}
        <div className="absolute inset-0 opacity-30 z-10">
          <Image
            src="/grain.png"
            alt=""
            fill
            className="object-repeat"
            style={{ mixBlendMode: "overlay" }}
          />
        </div>
        
        {/* Navbar */}
        <Navbar />
        
        {/* Short URL Card */}
        
        <div className="relative z-10 w-full max-w-4xl px-4">
          <Short />
        </div>

      </div>
      <HomeSections />
    </>
  );
}
