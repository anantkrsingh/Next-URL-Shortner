import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blogs | Tinyur",
  description:
    "Explore technical articles from Tinyur covering web development, security, databases, and more.",
  alternates: {
    canonical: "https://tinyur.in/blogs",
  },
  openGraph: {
    title: "Blogs | Tinyur",
    description:
      "Explore technical articles from Tinyur covering web development, security, databases, and more.",
    url: "https://tinyur.in/blogs",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Blogs | Tinyur",
    description:
      "Explore technical articles from Tinyur covering web development, security, databases, and more.",
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
        <li className="border rounded-md p-4 hover:bg-black/5 transition-colors">
          <Link href="/symmetric-vs-asymmetric-encryption" className="block">
            <h2 className="text-xl font-semibold">Symmetric vs Asymmetric Key Encryption</h2>
            <p className="text-sm opacity-80 mt-1">
              Complete guide to encryption: algorithms, performance, security, and when to use symmetric vs asymmetric encryption.
            </p>
            <p className="text-xs mt-2 opacity-60">~12 min read</p>
          </Link>
        </li>
        <li className="border rounded-md p-4 hover:bg-black/5 transition-colors">
          <Link href="/salting-and-hashing" className="block">
            <h2 className="text-xl font-semibold">Salting and Hashing</h2>
            <p className="text-sm opacity-80 mt-1">
              Password security best practices: cryptographic hashing, salt generation, rainbow tables, bcrypt, and Argon2.
            </p>
            <p className="text-xs mt-2 opacity-60">~11 min read</p>
          </Link>
        </li>
        <li className="border rounded-md p-4 hover:bg-black/5 transition-colors">
          <Link href="/sql-vs-nosql" className="block">
            <h2 className="text-xl font-semibold">SQL vs NoSQL Databases</h2>
            <p className="text-sm opacity-80 mt-1">
              Comprehensive database comparison: structure, ACID vs BASE, scalability, and choosing the right database for your project.
            </p>
            <p className="text-xs mt-2 opacity-60">~13 min read</p>
          </Link>
        </li>
        <li className="border rounded-md p-4 hover:bg-black/5 transition-colors">
          <Link href="/react-vs-nextjs" className="block">
            <h2 className="text-xl font-semibold">React.js vs Next.js</h2>
            <p className="text-sm opacity-80 mt-1">
              Complete framework comparison: SSR vs CSR, performance, routing, SEO, and when to choose each framework.
            </p>
            <p className="text-xs mt-2 opacity-60">~14 min read</p>
          </Link>
        </li>
      </ul>
    </main>
  );
}


