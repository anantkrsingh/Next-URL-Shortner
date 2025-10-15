import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "How URL Shorteners work | Tinyur",
  description:
    "Understand the full lifecycle of a shortened link: generation, storage, redirection, analytics, reliability and security best practices.",
  keywords: [
    "How URL shorteners work",
    "URL shortener architecture",
    "URL redirection",
    "Base62 encoding",
    "link shortener database schema",
    "URL shortener analytics",
    "URL shortener security",
  ],
  authors: [{ name: "Tinyur Team", url: "https://tinyur.in" }],
  alternates: {
    canonical: "https://tinyur.in/how-url-shortners-work",
  },
  openGraph: {
    title: "How URL Shorteners work | Tinyur",
    description:
      "Understand the full lifecycle of a shortened link: generation, storage, redirection, analytics, reliability and security best practices.",
    url: "https://tinyur.in/how-url-shortners-work",
    type: "article",
    siteName: "Tinyur",
    locale: "en_US",
    authors: ["Tinyur Team"],
    tags: [
      "URL shortener",
      "redirection",
      "Base62",
      "analytics",
      "security",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How URL Shorteners work | Tinyur",
    description:
      "Understand the full lifecycle of a shortened link: generation, storage, redirection, analytics, reliability and security best practices.",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function BlogHowUrlShortenersWork() {
  return (
    <article className="prose prose-invert max-w-3xl mx-auto px-4 py-10">
      {/* Breadcrumbs for UX + SEO */}
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
          <li aria-current="page" className="opacity-90">How URL Shorteners work</li>
        </ol>
      </nav>
      <header>
        <p className="text-sm opacity-70">Guides • ~10 min read</p>
        <h1 className="text-3xl font-bold mt-1">How URL Shorteners work</h1>
        <p className="opacity-80 mt-2">
          URL shorteners convert long, unwieldy URLs into compact links that are
          easy to share and track. Here is the complete breakdown of how
          short links are generated, resolved, and monitored in production.
        </p>
      </header>

      <nav className="mt-6 p-4 border rounded-md">
        <p className="font-semibold mb-2">On this page</p>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>
            <a href="#components">Key components</a>
          </li>
          <li>
            <a href="#generation">Short code generation</a>
          </li>
          <li>
            <a href="#storage">Storage and schema</a>
          </li>
          <li>
            <a href="#resolution">Resolution and redirects</a>
          </li>
          <li>
            <a href="#analytics">Analytics and logging</a>
          </li>
          <li>
            <a href="#reliability">Reliability and scaling</a>
          </li>
          <li>
            <a href="#security">Security considerations</a>
          </li>
          <li>
            <a href="#best-practices">Best practices</a>
          </li>
        </ol>
      </nav>

      <section id="components" className="mt-8">
        <h2 className="text-2xl font-semibold">Key components</h2>
        <ul className="list-disc list-inside mt-3">
          <li>
            <strong>API</strong>: Accepts a long URL, validates it, and returns a
            short code.
          </li>
          <li>
            <strong>Database</strong>: Maps short codes to long URLs and stores
            metadata like createdAt, expiration, and hit counts.
          </li>
          <li>
            <strong>Redirect endpoint</strong>: Resolves a short code and issues a
            301/302 redirect.
          </li>
          <li>
            <strong>Analytics pipeline</strong>: Records visits for reporting.
          </li>
          <li>
            <strong>Cache</strong>: Optional layer (e.g., Redis/edge cache) to
            accelerate hot links and reduce DB pressure.
          </li>
        </ul>
      </section>

      <section id="generation" className="mt-8">
        <h2 className="text-2xl font-semibold">Short code generation</h2>
        <p className="mt-3">
          There are several approaches to produce a unique short code:
        </p>
        <ul className="list-disc list-inside mt-3">
          <li>
            <strong>Hashing</strong>: Hash the long URL (e.g., SHA-256), then
            Base62-encode the first N bytes. Fast but may require collision
            handling.
          </li>
          <li>
            <strong>Random IDs</strong>: Generate cryptographically secure random
            bytes and Base62-encode. Ensure uniqueness via database constraints.
          </li>
          <li>
            <strong>Sequential IDs</strong>: Use an auto-incrementing integer and
            encode in Base62. Very compact links, but be careful about
            predictability.
          </li>
        </ul>
        <p className="mt-3">
          A common choice is to generate 6–8 character Base62 codes; this yields
          millions to trillions of combinations depending on length.
        </p>
      </section>

      <section id="storage" className="mt-8">
        <h2 className="text-2xl font-semibold">Storage and schema</h2>
        <p className="mt-3">
          A minimal relational schema includes a unique index on the short code
          and fields for <code>targetUrl</code>, <code>createdAt</code>,
          <code>expiresAt</code> (optional), and <code>clicks</code>.
        </p>
        <p className="mt-3">
          Many systems add owner information, custom domains, and flags for
          safety reviews or rate limits.
        </p>
      </section>

      <section id="resolution" className="mt-8">
        <h2 className="text-2xl font-semibold">Resolution and redirects</h2>
        <p className="mt-3">
          When a user visits a short link, the service looks up the code in the
          cache/database and issues an HTTP redirect:
        </p>
        <ul className="list-disc list-inside mt-3">
          <li>
            <strong>302 (Found)</strong>: Default, non-cacheable by browsers. Good
            when target may change.
          </li>
          <li>
            <strong>301 (Moved Permanently)</strong>: Cacheable; use when the
            target is immutable.
          </li>
        </ul>
        <p className="mt-3">
          For performance, resolve from an edge cache when possible; fall back to
          the database if not found.
        </p>
      </section>

      <section id="analytics" className="mt-8">
        <h2 className="text-2xl font-semibold">Analytics and logging</h2>
        <p className="mt-3">
          Minimal analytics include timestamps and totals. Rich analytics can
          include geo, user-agent, referrer, and unique visitors. Record events
          asynchronously so redirects remain fast.
        </p>
      </section>

      <section id="reliability" className="mt-8">
        <h2 className="text-2xl font-semibold">Reliability and scaling</h2>
        <ul className="list-disc list-inside mt-3">
          <li>Use unique indexes to prevent collisions.</li>
          <li>Add caching (Redis/edge) for hot paths.</li>
          <li>Replicate reads and separate write workloads.</li>
          <li>Rate-limit API to prevent abuse.</li>
          <li>Use background jobs for analytics and link checks.</li>
        </ul>
      </section>

      <section id="security" className="mt-8">
        <h2 className="text-2xl font-semibold">Security considerations</h2>
        <ul className="list-disc list-inside mt-3">
          <li>Validate and normalize URLs; allow only safe protocols.</li>
          <li>Block known malicious domains via deny-lists.</li>
          <li>
            Sign admin actions and protect with authentication and rate limits.
          </li>
          <li>
            Consider preview pages to reduce phishing/malware risk for unknown
            links.
          </li>
        </ul>
      </section>

      <section id="best-practices" className="mt-8">
        <h2 className="text-2xl font-semibold">Best practices</h2>
        <ul className="list-disc list-inside mt-3">
          <li>Prefer Base62 for compact, URL-safe codes.</li>
          <li>Keep redirect handlers synchronous and fast.</li>
          <li>Expire or archive unused links when appropriate.</li>
          <li>Expose a simple API for programmatic shortening.</li>
        </ul>
      </section>

      <footer className="mt-10 flex items-center gap-4 text-sm">
        <Link href="/blogs" className="underline underline-offset-2">
          ← Back to Blogs
        </Link>
        <Link href="/" className="underline underline-offset-2">
          Home
        </Link>
      </footer>

      {/* Structured Data: Article */}
      <Script id="ld-article" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'How URL Shorteners work',
          description:
            'Understand the lifecycle of a shortened link: generation, storage, redirection, analytics, reliability and security.',
          author: { '@type': 'Tinyur', name: 'Tinyur Team', url: 'https://tinyur.in' },
          publisher: {
            '@type': 'Tinyur',
            name: 'Tinyur',
            logo: { '@type': 'ImageObject', url: 'https://tinyur.in/icon.png' },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://tinyur.in/how-url-shortners-work',
          },
        })}
      </Script>

      {/* Structured Data: Breadcrumbs */}
      <Script id="ld-breadcrumbs" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://tinyur.in/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Blogs',
              item: 'https://tinyur.in/blogs',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'How URL Shorteners work',
              item: 'https://tinyur.in/how-url-shortners-work',
            },
          ],
        })}
      </Script>

      {/* Structured Data: FAQ */}
      <Script id="ld-faq" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What redirect status should I use?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Use 302 when the target might change; 301 for permanent destinations that can be cached.',
              },
            },
            {
              '@type': 'Question',
              name: 'How are short codes generated?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Common approaches include hashing + Base62, cryptographically random IDs, or Base62-encoded sequential IDs.',
              },
            },
            {
              '@type': 'Question',
              name: 'How do URL shorteners track analytics?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'They record events (timestamp, UA, referrer, geo) asynchronously so redirects remain fast.',
              },
            },
          ],
        })}
      </Script>
    </article>
  );
}


