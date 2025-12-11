import Unshorten from "@/components/Unshorten";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Unshorten URL | Tinyur URL Shortener",
  description:
    "Unshorten URLs to see the original destination. Enter a short code or shortened URL to reveal where it redirects to.",
  keywords: [
    "unshorten URL",
    "URL expander",
    "reveal URL",
    "original URL",
    "short URL decoder",
    "Tinyur unshorten",
  ],
};

export default function UnshortenPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* API Docs and Blogs Links */}
      <div className="absolute top-4 right-4 flex gap-4 z-20 flex-wrap justify-end">
        <Link
          href="/"
          className="text-white hover:text-blue-300 text-shadow-md underline underline-offset-2 font-bold text-base sm:text-lg transition-colors"
        >
          Home
        </Link>
        <Link
          href="/api-docs"
          className="text-white hover:text-blue-300 text-shadow-md underline underline-offset-2 font-bold text-base sm:text-lg transition-colors"
        >
          API Docs
        </Link>
        <Link
          href="/blogs"
          className="text-white hover:text-blue-300 text-shadow-md underline underline-offset-2 font-bold text-base sm:text-lg transition-colors"
        >
          Blogs
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl">
        <Unshorten />
      </div>
    </div>
  );
}



