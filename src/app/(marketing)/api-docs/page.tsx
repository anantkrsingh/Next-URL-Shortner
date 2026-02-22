import ApiDocsClient from "@/components/api-docs-client";
import { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "API Docs | TinyUR",
  description:
    "Complete guide to the TinyUR URL shortener platform API, Free URL Shortener API, Unlimited API Calls",

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
      alt: "API Documentation - TinyUR URL Shortener",
    },
    title: "API Documentation - TinyUR URL Shortener",
    description:
      "Complete guide to the TinyUR URL Shortener API, Free URL Sortner API, Unlimited API Calls",
    url: "https://tinyur.in/api-docs",
    type: "website",
    siteName: "TinyUR URL Shortener",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "API Documentation - TinyUR URL Shortener",
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
    <>
      {/* Hero Section with Background Image */}
      <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-32 pb-16">
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
        
        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-4xl px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
            API Documentation
          </h1>
          <p className="text-white/90 text-base sm:text-lg drop-shadow-md max-w-2xl mx-auto">
            Complete guide to integrating the TinyUR URL Shortener API into your applications
          </p>
        </div>
      </div>
      <div className="bg-black">
<div id="container-9049c3c244f96a9f73fec77b523bbc33"></div>
      </div>

      {/* API Content Section */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <ApiDocsClient endpoints={endpoints} />
        </div>
      </div>
    </>
  );
}
