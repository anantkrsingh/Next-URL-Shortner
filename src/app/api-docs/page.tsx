import ApiDocsClient from "@/components/api-docs-client";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "API Docs",
  description:
    "Complete guide to the Tinyur url shortener platform API, Free URL Sortner API, Unlimited API Calls",

  keywords: [
    "Free URL Shortener API",
    "URL Shortener",
    "Free URL Shortener",
    "API Documentation",
    "Unlimited API Calls",
    "Free URL Sortner API",
    "No Ads API",
    "No Tracking API",
    "No BS API",
    "Simple URL Shortener API",
    "No Tracking API",
    "Simple URL Shortener API",
    "Implement URL Shortener API",
    "Implement URL Shortener API in your project",
    "Implement URL Shortener API in your project",
  ],
  icons: "/api.png",
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
      url: "https://tinyur.in/api.png",
      height: 64,
      width: 64,
      alt: "API Documentation - Tinyur URL Shortener",
    },
    title: "API Documentation - Tinyur URL Shortener",
    description:
      "Complete guide to the Tinyur URL Shortener API, Free URL Sortner API, Unlimited API Calls",
    url: "https://tinyur.in/api-docs",
    type: "website",
    siteName: "Tinyur URL Shortener",
    locale: "en_US",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "API Documentation - Tinyur URL Shortener",
    description: "Free URL Shortener, No Ads, No Tracking, No BS",
    images: [
      {
        url: "https://tinyur.in/api.png",
        width: 64,
        height: 64,
      },
    ],
    site: "@tinyur",
    creator: "@tinyur",
    creatorId: "1234567890",
  },
};

const endpoints = [
  {
    title: "Shorten URL",
    method: "POST",
    endpoint: "/api/shorten",
    description:
      "Create a short URL from a long URL with optional custom alias",
    parameters: [
      {
        name: "url",
        type: "string",
        required: true,
        description: "The URL to be shortened",
        example: "https://example.com/very-long-url",
      },
      {
        name: "customAlias",
        type: "string",
        required: false,
        description:
          "Custom alias for the short URL (3-50 characters, letters, numbers, hyphens, and underscores only)",
        example: "my-custom-alias",
      },
    ],
    response: {
      success: {
        originalUrl: "string",
        shortCode: "string",
        shortUrl: "string",
      },
      error: {
        error: "string",
      },
    },
  },
];

export default function ApiDocs() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Navigation Links */}
      <div className="absolute top-4 right-4 flex gap-4 z-20 flex-wrap justify-end">
        <Link
          href="/"
          className="text-white hover:text-blue-300 text-shadow-md underline underline-offset-2 font-bold text-base sm:text-lg transition-colors"
        >
          Home
        </Link>
        <Link
          href="/blogs"
          className="text-white hover:text-blue-300 text-shadow-md underline underline-offset-2 font-bold text-base sm:text-lg transition-colors"
        >
          Blogs
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl">
        <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 p-6 sm:p-8 shadow-lg mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 text-center">
            API Documentation
          </h1>
          <p className="text-white/70 text-center text-sm sm:text-base">
            Complete guide to the Tinyur URL Shortener API
          </p>
        </div>
        <ApiDocsClient endpoints={endpoints} />
      </div>
    </div>
  );
}
