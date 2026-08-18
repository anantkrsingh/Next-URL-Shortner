import ClickCounter from "@/components/ClickCounter";
import { Metadata } from "next";

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
    <div className="relative flex min-h-[78vh] items-center justify-center px-4 pt-32 pb-16">
      <div className="glass-panel relative z-10 w-full max-w-3xl p-6 sm:p-10">
        <ClickCounter />
      </div>
    </div>
  );
}
