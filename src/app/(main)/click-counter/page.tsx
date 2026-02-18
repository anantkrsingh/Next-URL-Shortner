import ClickCounter from "@/components/ClickCounter";
import { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";

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
        
        {/* Click Counter Card */}
        <div className="relative z-10 w-full max-w-4xl px-4">
          <ClickCounter />
        </div>
      </div>
      
      {/* White Background Section */}
      <div className="bg-white min-h-[50vh]">
        {/* Additional content can go here */}
      </div>
    </>
  );
}
