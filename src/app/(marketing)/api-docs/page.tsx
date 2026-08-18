import ApiDocsClient from "@/components/api-docs-client";
import { Metadata } from "next";

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
    "Simple URL Shortener API",
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
    description: "Complete guide to the TinyUR URL Shortener API with unlimited API calls.",
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
      <div className="relative flex min-h-[40vh] items-center justify-center px-4 pt-32 pb-10">
        <div className="glass-panel w-full max-w-4xl p-8 text-center sm:p-10">
          <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            API Documentation
          </h1>
          <p className="mx-auto max-w-2xl text-base text-white/75 sm:text-lg">
            Complete guide to integrating the TinyUR URL Shortener API into your applications
          </p>
        </div>
      </div>
      <div className="px-4 py-16">
        <div className="glass-panel mx-auto max-w-6xl p-4 sm:p-8">
          <ApiDocsClient endpoints={endpoints} />
        </div>
      </div>
    </>
  );
}
