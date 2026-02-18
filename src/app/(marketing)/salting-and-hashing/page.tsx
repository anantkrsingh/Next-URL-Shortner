import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Salting and Hashing: Password Security Best Practices | Tinyur",
  description:
    "Learn how hashing and salting protect passwords: hash functions, salt generation, rainbow table attacks, bcrypt, Argon2, and modern password storage security.",
  keywords: [
    "password hashing",
    "password salting",
    "bcrypt",
    "Argon2",
    "SHA-256",
    "rainbow tables",
    "password security",
    "cryptographic hash",
    "secure password storage",
    "authentication security",
  ],
  authors: [{ name: "Tinyur Team", url: "https://tinyur.in" }],
  alternates: {
    canonical: "https://tinyur.in/salting-and-hashing",
  },
  openGraph: {
    title: "Salting and Hashing: Password Security Best Practices | Tinyur",
    description:
      "Comprehensive guide to password hashing and salting: algorithms, rainbow table defense, bcrypt, Argon2, and security best practices.",
    url: "https://tinyur.in/salting-and-hashing",
    type: "article",
    siteName: "Tinyur",
    locale: "en_US",
    authors: ["Tinyur Team"],
    tags: [
      "hashing",
      "salting",
      "password security",
      "bcrypt",
      "authentication",
      "cryptography",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salting and Hashing: Password Security Best Practices | Tinyur",
    description:
      "Comprehensive guide to password hashing and salting: algorithms, rainbow table defense, bcrypt, Argon2, and security best practices.",
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

export default function SaltingAndHashingPage() {
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
          <li aria-current="page" className="opacity-90">Salting and Hashing</li>
        </ol>
      </nav>
      
      <header>
        <p className="text-sm opacity-70">Security • ~11 min read</p>
        <h1 className="text-3xl font-bold mt-1">Salting and Hashing: Password Security Best Practices</h1>
        <p className="opacity-80 mt-2">
          Storing passwords securely is critical for protecting user accounts. This guide
          covers cryptographic hashing, salt generation, rainbow table attacks, and modern
          algorithms like bcrypt and Argon2 for bulletproof password storage.
        </p>
      </header>

      <nav className="mt-6 p-4 border rounded-md">
        <p className="font-semibold mb-2">On this page</p>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>
            <a href="#why-hash">Why hash passwords?</a>
          </li>
          <li>
            <a href="#what-is-hashing">What is hashing?</a>
          </li>
          <li>
            <a href="#rainbow-tables">Rainbow table attacks</a>
          </li>
          <li>
            <a href="#salting">Salt: the defense</a>
          </li>
          <li>
            <a href="#hash-functions">Hash functions compared</a>
          </li>
          <li>
            <a href="#modern-algorithms">Modern password hashing</a>
          </li>
          <li>
            <a href="#implementation">Implementation guide</a>
          </li>
          <li>
            <a href="#common-mistakes">Common mistakes</a>
          </li>
          <li>
            <a href="#best-practices">Best practices</a>
          </li>
        </ol>
      </nav>

      <section id="why-hash" className="mt-8">
        <h2 className="text-2xl font-semibold">Why hash passwords?</h2>
        <p className="mt-3">
          Storing passwords in plaintext is a catastrophic security failure. When a database
          is breached, attackers gain instant access to all user accounts. Hashing transforms
          passwords into irreversible digests, so even if your database is compromised, the
          original passwords remain protected.
        </p>
        <p className="mt-3">
          High-profile breaches (LinkedIn 2012, Adobe 2013, Yahoo 2013-2014) exposed millions
          of inadequately protected passwords. Proper hashing and salting would have prevented
          mass credential theft.
        </p>
      </section>

      <section id="what-is-hashing" className="mt-8">
        <h2 className="text-2xl font-semibold">What is hashing?</h2>
        <p className="mt-3">
          A cryptographic hash function takes an input (password) and produces a fixed-size
          output (hash/digest). Hash functions are designed to be:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li>
            <strong>Deterministic</strong>: Same input always produces same output.
          </li>
          <li>
            <strong>One-way</strong>: Computationally infeasible to reverse (find input from hash).
          </li>
          <li>
            <strong>Avalanche effect</strong>: Tiny input change produces drastically different hash.
          </li>
          <li>
            <strong>Collision-resistant</strong>: Hard to find two inputs with same hash.
          </li>
          <li>
            <strong>Fast to compute</strong>: But not too fast (for password hashing).
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Example</h3>
        <div className="mt-3 p-4 bg-gray-900 rounded-md font-mono text-sm">
          <p>Input: &quot;password123&quot;</p>
          <p>SHA-256: &quot;ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f&quot;</p>
          <p className="mt-2">Input: &quot;password124&quot;</p>
          <p>SHA-256: &quot;8bb6118f8fd6935ad0876a3be34a717d32708ffd27258c28e26e0a03f7e55c12&quot;</p>
        </div>
        <p className="mt-3 text-sm opacity-80">
          Note how a single character change produces a completely different hash.
        </p>
      </section>

      <section id="rainbow-tables" className="mt-8">
        <h2 className="text-2xl font-semibold">Rainbow table attacks</h2>
        <p className="mt-3">
          A rainbow table is a precomputed database mapping common passwords to their hashes.
          Attackers can instantly &quot;crack&quot; hashed passwords by looking them up in the table.
        </p>

        <h3 className="text-xl font-semibold mt-6">How the attack works</h3>
        <ol className="list-decimal list-inside mt-3 space-y-2">
          <li>Attacker precomputes hashes for millions of common passwords.</li>
          <li>Database breach exposes password hashes.</li>
          <li>Attacker looks up each hash in their rainbow table.</li>
          <li>Match found = password cracked in milliseconds.</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6">Example scenario</h3>
        <div className="mt-3 p-4 bg-gray-900 rounded-md font-mono text-sm">
          <p>Database stores: &quot;ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f&quot;</p>
          <p className="mt-2">Rainbow table lookup:</p>
          <p>ef92b778... → &quot;password123&quot; ✓</p>
        </div>
        <p className="mt-3">
          Without additional defenses, unsalted hashes provide minimal protection against
          determined attackers with rainbow tables.
        </p>
      </section>

      <section id="salting" className="mt-8">
        <h2 className="text-2xl font-semibold">Salt: the defense</h2>
        <p className="mt-3">
          A <strong>salt</strong> is a unique, random string added to each password before
          hashing. This makes every hash unique, even for identical passwords, completely
          defeating rainbow table attacks.
        </p>

        <h3 className="text-xl font-semibold mt-6">How salting works</h3>
        <ol className="list-decimal list-inside mt-3 space-y-2">
          <li>Generate cryptographically secure random salt (16+ bytes).</li>
          <li>Combine salt + password.</li>
          <li>Hash the combined string.</li>
          <li>Store salt + hash together in database (salt is not secret).</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6">Example with salt</h3>
        <div className="mt-3 p-4 bg-gray-900 rounded-md font-mono text-sm overflow-x-auto">
          <p>User 1:</p>
          <p>Password: &quot;password123&quot;</p>
          <p>Salt: &quot;a4f8d2e1c9b7&quot;</p>
          <p>Hash(salt + password): &quot;3d5e7a1b...&quot;</p>
          <p className="mt-3">User 2 (same password!):</p>
          <p>Password: &quot;password123&quot;</p>
          <p>Salt: &quot;x7k2m9n4p1q8&quot;</p>
          <p>Hash(salt + password): &quot;9f2c4e6a...&quot;</p>
        </div>
        <p className="mt-3">
          Same password → different salts → completely different hashes. Rainbow tables
          become useless because attackers must recompute hashes for every salt.
        </p>

        <h3 className="text-xl font-semibold mt-6">Why salts work</h3>
        <ul className="list-disc list-inside mt-3 space-y-1">
          <li>Each password has unique hash, preventing batch lookups.</li>
          <li>Attackers must crack each password individually.</li>
          <li>Rainbow tables would need to be regenerated for each salt (infeasible).</li>
          <li>Salts can be stored in plaintext alongside hashes (they&apos;re not secret).</li>
        </ul>
      </section>

      <section id="hash-functions" className="mt-8">
        <h2 className="text-2xl font-semibold">Hash functions compared</h2>

        <h3 className="text-xl font-semibold mt-6">Fast hash functions (DO NOT use for passwords)</h3>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li>
            <strong>MD5</strong>: Cryptographically broken. Vulnerable to collisions. Never use.
          </li>
          <li>
            <strong>SHA-1</strong>: Deprecated. Collision attacks demonstrated. Avoid.
          </li>
          <li>
            <strong>SHA-256/SHA-512</strong>: Secure but too fast (~1 billion hashes/sec on GPU).
            Enables brute force attacks. Not designed for passwords.
          </li>
        </ul>
        <p className="mt-3">
          These algorithms are excellent for file integrity verification but terrible for
          password storage because they&apos;re optimized for speed.
        </p>

        <h3 className="text-xl font-semibold mt-6">Slow hash functions (Password-specific)</h3>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li>
            <strong>bcrypt</strong>: Deliberately slow, configurable work factor. Industry standard
            for 20+ years. Uses Blowfish cipher. Limited to 72-character passwords.
          </li>
          <li>
            <strong>scrypt</strong>: Memory-hard algorithm resists GPU/ASIC attacks. Requires
            significant RAM to compute. Used by cryptocurrencies.
          </li>
          <li>
            <strong>Argon2</strong>: Winner of 2015 Password Hashing Competition. Three variants:
            Argon2i (side-channel resistant), Argon2d (GPU resistant), Argon2id (hybrid, recommended).
          </li>
          <li>
            <strong>PBKDF2</strong>: Older standard (NIST approved). Uses repeated hashing (iterations).
            Effective but bcrypt/Argon2 are better.
          </li>
        </ul>
      </section>

      <section id="modern-algorithms" className="mt-8">
        <h2 className="text-2xl font-semibold">Modern password hashing</h2>

        <h3 className="text-xl font-semibold mt-6">bcrypt</h3>
        <p className="mt-3">
          bcrypt remains the gold standard for most applications. Key features:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-1">
          <li>Built-in salt generation (16 bytes)</li>
          <li>Adjustable cost factor (work factor: 2^cost rounds)</li>
          <li>Mature libraries in all major languages</li>
          <li>Industry-proven over decades</li>
        </ul>
        <div className="mt-3 p-4 bg-gray-900 rounded-md font-mono text-sm">
          <p>bcrypt output example:</p>
          <p className="break-all">$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqJxN2.aSe</p>
          <p className="mt-2 text-xs opacity-70">$2b$ = algorithm | $12$ = cost | salt + hash</p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Argon2</h3>
        <p className="mt-3">
          State-of-the-art password hashing. Recommended for new projects:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-1">
          <li>Memory-hard: requires configurable RAM (defends against GPUs/ASICs)</li>
          <li>Time-cost: configurable iterations</li>
          <li>Parallelism: configurable threads</li>
          <li>Use Argon2id for best security</li>
        </ul>
        <div className="mt-3 p-4 bg-gray-900 rounded-md font-mono text-sm">
          <p>Argon2id output example:</p>
          <p className="break-all text-xs">$argon2id$v=19$m=65536,t=3,p=4$c29tZXNhbHQ$RdescudvJCsgt3ub+b+dWRWJTmaaJObG</p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Cost/work factor tuning</h3>
        <p className="mt-3">
          Password hashing should be slow enough to frustrate brute force attacks but fast
          enough not to degrade user experience:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-1">
          <li>Target: 250-500ms per hash on your production hardware</li>
          <li>bcrypt: cost factor 12-14 (as of 2025)</li>
          <li>Argon2: 64-128 MB memory, 3-4 iterations</li>
          <li>Increase cost factor annually as hardware improves</li>
        </ul>
      </section>

      <section id="implementation" className="mt-8">
        <h2 className="text-2xl font-semibold">Implementation guide</h2>

        <h3 className="text-xl font-semibold mt-6">Registration flow</h3>
        <ol className="list-decimal list-inside mt-3 space-y-2">
          <li>User submits password over HTTPS.</li>
          <li>Server validates password strength (length, complexity).</li>
          <li>Generate salt and hash password (bcrypt/Argon2).</li>
          <li>Store username + salt + hash in database.</li>
          <li>Discard plaintext password immediately.</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6">Login flow</h3>
        <ol className="list-decimal list-inside mt-3 space-y-2">
          <li>User submits credentials over HTTPS.</li>
          <li>Retrieve stored salt + hash for that username.</li>
          <li>Hash submitted password with stored salt.</li>
          <li>Compare computed hash with stored hash (constant-time comparison).</li>
          <li>Grant/deny access based on match.</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6">Code example (Node.js + bcrypt)</h3>
        <div className="mt-3 p-4 bg-gray-900 rounded-md font-mono text-sm overflow-x-auto">
          <pre>{`const bcrypt = require('bcrypt');

// Registration
async function hashPassword(password) {
  const saltRounds = 12;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash; // Store this in database
}

// Login
async function verifyPassword(password, storedHash) {
  const match = await bcrypt.compare(password, storedHash);
  return match; // true if valid
}`}</pre>
        </div>
      </section>

      <section id="common-mistakes" className="mt-8">
        <h2 className="text-2xl font-semibold">Common mistakes</h2>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li>
            <strong>Using fast hashes</strong>: SHA-256 alone is not suitable for passwords.
          </li>
          <li>
            <strong>No salt</strong>: Makes rainbow table attacks trivial.
          </li>
          <li>
            <strong>Reusing salts</strong>: Defeats the purpose of salting.
          </li>
          <li>
            <strong>Keeping salts secret</strong>: Salts should be random, not secret. Storing them
            with hashes is fine.
          </li>
          <li>
            <strong>Rolling your own crypto</strong>: Use established libraries (bcrypt, Argon2).
          </li>
          <li>
            <strong>Not using constant-time comparison</strong>: Vulnerable to timing attacks.
          </li>
          <li>
            <strong>Pepper instead of proper algorithms</strong>: Adding a secret &quot;pepper&quot; to SHA-256
            doesn&apos;t make it suitable for passwords.
          </li>
          <li>
            <strong>Client-side hashing only</strong>: Server must hash; client hashing alone is insecure.
          </li>
        </ul>
      </section>

      <section id="best-practices" className="mt-8">
        <h2 className="text-2xl font-semibold">Best practices</h2>

        <h3 className="text-xl font-semibold mt-6">Algorithm selection</h3>
        <ul className="list-disc list-inside mt-3 space-y-1">
          <li>New projects: Use <strong>Argon2id</strong>.</li>
          <li>Existing projects: <strong>bcrypt</strong> is still excellent.</li>
          <li>Avoid: MD5, SHA-1, plain SHA-256, homegrown solutions.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Configuration</h3>
        <ul className="list-disc list-inside mt-3 space-y-1">
          <li>Salt: minimum 16 bytes, cryptographically random.</li>
          <li>bcrypt cost: 12-14 (2025 standard).</li>
          <li>Argon2: 64-128 MB memory, 3-4 iterations, 4 threads.</li>
          <li>Test on your hardware; target 250-500ms per hash.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Security measures</h3>
        <ul className="list-disc list-inside mt-3 space-y-1">
          <li>Always transmit passwords over HTTPS/TLS.</li>
          <li>Rate limit login attempts (prevent brute force).</li>
          <li>Implement account lockout after repeated failures.</li>
          <li>Use constant-time comparison to prevent timing attacks.</li>
          <li>Log authentication events for security monitoring.</li>
          <li>Never log plaintext passwords.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Ongoing maintenance</h3>
        <ul className="list-disc list-inside mt-3 space-y-1">
          <li>Rehash passwords on login if cost factor is outdated.</li>
          <li>Monitor algorithm recommendations (e.g., OWASP guidelines).</li>
          <li>Keep cryptographic libraries updated.</li>
          <li>Enforce strong password policies (length, complexity).</li>
          <li>Consider multi-factor authentication (MFA) as additional layer.</li>
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
          headline: 'Salting and Hashing: Password Security Best Practices',
          description:
            'Comprehensive guide to password hashing and salting: algorithms, rainbow tables, bcrypt, Argon2, and best practices.',
          author: { '@type': 'Organization', name: 'Tinyur Team', url: 'https://tinyur.in' },
          publisher: {
            '@type': 'Organization',
            name: 'Tinyur',
            logo: { '@type': 'ImageObject', url: 'https://tinyur.in/icon.png' },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://tinyur.in/salting-and-hashing',
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
              name: 'Salting and Hashing',
              item: 'https://tinyur.in/salting-and-hashing',
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
              name: 'What is password salting?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Salting adds a unique random string to each password before hashing, making every hash unique and defeating rainbow table attacks.',
              },
            },
            {
              '@type': 'Question',
              name: 'Should I use SHA-256 for password hashing?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. SHA-256 is too fast and enables brute force attacks. Use purpose-built password hashing algorithms like bcrypt or Argon2.',
              },
            },
            {
              '@type': 'Question',
              name: 'What is the best password hashing algorithm?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Argon2id is the current state-of-the-art. bcrypt is also excellent and widely used. Both are significantly better than fast hash functions.',
              },
            },
          ],
        })}
      </Script>
    </article>
  );
}

