import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "White Hat SEO: Strategies for Sustainable Growth | Tinyur Blogs",
  description:
    "Learn ethical SEO tactics: content quality, E-E-A-T, site performance, accessibility, and technical SEO for sustainable rankings.",
  alternates: { canonical: "https://tinyur.in/white-hat-seo" },
  openGraph: {
    title: "White Hat SEO: Strategies for Sustainable Growth | Tinyur",
    description:
      "Ethical SEO tactics: content quality, E-E-A-T, performance, accessibility, and technical SEO.",
    url: "https://tinyur.in/white-hat-seo",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "White Hat SEO: Strategies for Sustainable Growth",
    description:
      "Ethical SEO tactics: content quality, E-E-A-T, performance, accessibility, and technical SEO.",
  },
};

export default function WhiteHatSEOPage() {
  return (
    <article className="prose prose-invert max-w-3xl mx-auto px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-sm mb-4">
        <ol className="flex items-center gap-2 opacity-80">
          <li>
            <Link href="/" className="underline underline-offset-2">Home</Link>
          </li>
          <li aria-hidden>›</li>
          <li>
            <Link href="/blogs" className="underline underline-offset-2">Blogs</Link>
          </li>
          <li aria-hidden>›</li>
          <li aria-current="page" className="opacity-90">White Hat SEO</li>
        </ol>
      </nav>

      <header>
        <p className="text-sm opacity-70">SEO • ~8 min read</p>
        <h1 className="text-3xl font-bold mt-1">White Hat SEO: Strategies for Sustainable Growth</h1>
        <p className="opacity-80 mt-2">
          White Hat SEO focuses on user-first, search engine guidelines-compliant practices that build long-term visibility and trust.
        </p>
      </header>

      <p className="mt-6">
        White Hat SEO is about optimizing for people while aligning with search
        engine guidelines. It emphasizes content quality, site experience, and
        accessibility. Compare this with
        {" "}
        <Link href="/black-hat-seo" className="underline underline-offset-2">Black Hat SEO</Link>
        {" "}
        tactics, and see our side-by-side
        {" "}
        <Link href="/white-hat-seo-vs-black-hat-seo" className="underline underline-offset-2">comparison</Link>
        {" "}
        to choose the right strategy.
      </p>

      <h2 className="text-2xl font-semibold mt-8">Core Principles</h2>
      <ul className="list-disc list-inside mt-3">
        <li>High-quality, original, and helpful content (E-E-A-T).</li>
        <li>Technical SEO basics: crawlability, indexability, canonicalization.</li>
        <li>Performance, Core Web Vitals, and mobile friendliness.</li>
        <li>Accessible HTML semantics and inclusive UX.</li>
        <li>Legitimate, relevant link earning (not buying or schemes).</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8">Technical Checklist</h2>
      <ul className="list-disc list-inside mt-3">
        <li>Robots.txt and meta robots configured correctly.</li>
        <li>Structured data (JSON-LD) for rich results when applicable.</li>
        <li>Clean URL structure and internal linking with descriptive anchors.</li>
        <li>Sitemaps kept fresh and accurate.</li>
        <li>Fast, secure (HTTPS), and stable hosting.</li>
      </ul>

      <footer className="mt-10 flex items-center gap-4 text-sm">
        <Link href="/blogs" className="underline underline-offset-2">← Back to Blogs</Link>
        <Link href="/black-hat-seo" className="underline underline-offset-2">Black Hat SEO</Link>
        <Link href="/white-hat-seo-vs-black-hat-seo" className="underline underline-offset-2">White vs Black Hat</Link>
      </footer>
    </article>
  );
}


