import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Tinyur",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold">404</h1>
        <h2 className="text-3xl font-bold mt-4">
          This short link doesn&apos;t exist
        </h2>
        <p className="mt-4 text-lg">
          The link may have been mistyped or was never created.
        </p>
        <Link
          href="/"
          className="inline-block mt-6 font-semibold underline underline-offset-4"
        >
          Create a short link on Tinyur
        </Link>
      </div>
    </div>
  );
}
