import Unshorten from "@/components/Unshorten";
import { Metadata } from "next";

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
    <div className="relative flex min-h-[78vh] items-center justify-center px-4 pt-32 pb-16">
      <div className="glass-panel relative z-10 w-full max-w-3xl p-6 sm:p-10">
        <Unshorten />
      </div>
    </div>
  );
}
