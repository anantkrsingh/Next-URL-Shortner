import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blogs | Tinyur",
  description:
    "Explore articles from Tinyur. Start with: How URL Shorteners work.",
  alternates: {
    canonical: "https://tinyur.in/blogs",
  },
  openGraph: {
    title: "Blogs | Tinyur",
    description:
      "Explore articles from Tinyur. Start with: How URL Shorteners work.",
    url: "https://tinyur.in/blogs",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Blogs | Tinyur",
    description:
      "Explore articles from Tinyur. Start with: How URL Shorteners work.",
  },
};

export default function BlogsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>
      <ul className="space-y-4">
        <li className="border rounded-md p-4 hover:bg-black/5 transition-colors">
          <Link href="/how-url-shortners-work" className="block">
            <h2 className="text-xl font-semibold">
              How URL Shorteners work
            </h2>
            <p className="text-sm opacity-80 mt-1">
              A deep dive into the mechanics of shortening, redirecting, tracking,
              and the infrastructure behind reliable short links.
            </p>
            <p className="text-xs mt-2 opacity-60">~10 min read</p>
          </Link>
        </li>
        <li className="border rounded-md p-4 hover:bg-black/5 transition-colors">
          <Link href="/white-hat-seo" className="block">
            <h2 className="text-xl font-semibold">White Hat SEO</h2>
            <p className="text-sm opacity-80 mt-1">
              Ethical SEO strategies for sustainable rankings and long-term growth.
            </p>
            <p className="text-xs mt-2 opacity-60">~8 min read</p>
          </Link>
        </li>
        <li className="border rounded-md p-4 hover:bg-black/5 transition-colors">
          <Link href="/black-hat-seo" className="block">
            <h2 className="text-xl font-semibold">Black Hat SEO</h2>
            <p className="text-sm opacity-80 mt-1">
              Risks, tactics, and penalties of manipulative SEO strategies.
            </p>
            <p className="text-xs mt-2 opacity-60">~8 min read</p>
          </Link>
        </li>
        <li className="border rounded-md p-4 hover:bg-black/5 transition-colors">
          <Link href="/white-hat-seo-vs-black-hat-seo" className="block">
            <h2 className="text-xl font-semibold">White Hat SEO vs Black Hat SEO</h2>
            <p className="text-sm opacity-80 mt-1">
              A practical comparison to evaluate trade-offs and choose wisely.
            </p>
            <p className="text-xs mt-2 opacity-60">~9 min read</p>
          </Link>
        </li>
      </ul>
    </main>
  );
}


