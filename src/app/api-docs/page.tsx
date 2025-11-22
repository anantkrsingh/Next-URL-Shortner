import ApiDocsClient, { ThemeSwitcher } from "@/components/api-docs-client";
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                API Documentation
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1 sm:mt-2 text-sm sm:text-base">
                Complete guide to the Tinyur URL Shortener API
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <ThemeSwitcher />
              <Link
                href="/"
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-center text-sm sm:text-base"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <ApiDocsClient endpoints={endpoints} />
      </div>
    </div>
  );
}
