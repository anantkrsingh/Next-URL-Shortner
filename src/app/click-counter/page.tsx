import ClickCounter from "@/components/ClickCounter";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Click Counter | Tinyur URL Shortener",
  description:
    "Check the number of clicks on your shortened URLs. Enter a short code to see how many times your link has been clicked.",
  keywords: [
    "click counter",
    "URL analytics",
    "link clicks",
    "short URL stats",
    "Tinyur click counter",
  ],
};

export default function ClickCounterPage() {
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
        <ClickCounter />
      </div>
    </div>
  );
}
