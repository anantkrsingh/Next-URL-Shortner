import Unshorten from "@/components/Unshorten";
import { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";

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
        
        {/* Unshorten Card */}
        <div className="relative z-10 w-full max-w-4xl px-4">
          <Unshorten />
        </div>
      </div>
      
      {/* White Background Section */}
      <div className="bg-white min-h-[50vh]">
        {/* Additional content can go here */}
      </div>
    </>
  );
}




