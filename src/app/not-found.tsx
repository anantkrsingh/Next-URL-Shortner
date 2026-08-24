import Link from "next/link";
import type { Metadata } from "next";
import GlassBackdrop from "@/components/GlassBackdrop";

export const metadata: Metadata = {
  title: "Page Not Found | Tinyur",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <GlassBackdrop />
      <div className="glass-panel relative z-10 max-w-lg p-10 text-center">
        <h1 className="text-7xl font-extrabold text-white">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-white">
          This short link doesn&apos;t exist
        </h2>
        <p className="mt-4 text-lg text-white/70">
          The link may have been mistyped or was never created.
        </p>
        <Link prefetch={false} href="/" className="glass-btn mt-6 inline-block px-5 py-2.5 font-semibold">
          Create a short link on Tinyur
        </Link>
      </div>
    </div>
  );
}
