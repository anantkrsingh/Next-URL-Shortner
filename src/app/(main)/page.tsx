import Short from "@/components/short";
import { Metadata } from "next";
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
      <div className="relative flex min-h-[78vh] items-center justify-center px-4 pt-32 pb-16">
        <div className="glass-panel relative z-10 w-full max-w-3xl p-6 sm:p-10">
          <Short />
        </div>
      </div>
      <HomeSections />
    </>
  );
}
