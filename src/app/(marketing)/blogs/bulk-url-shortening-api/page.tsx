import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bulk URL Shortening with the API: Automate Link Creation | Tinyur",
  description:
    "How to automate short link creation at scale using the TinyUR API — batching requests, handling custom aliases, error handling, and patterns for CSV imports and CI pipelines.",
  alternates: {
    canonical: "https://tinyur.in/blogs/bulk-url-shortening-api",
  },
  openGraph: {
    title: "Bulk URL Shortening with the API: Automate Link Creation | Tinyur",
    description:
      "A practical guide to automating short link creation at scale with code examples.",
    url: "https://tinyur.in/blogs/bulk-url-shortening-api",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Bulk URL Shortening with the API: Automate Link Creation",
    description:
      "Automate short link creation at scale — batching, error handling, and CSV import patterns.",
  },
};

export default function BulkUrlShorteningApiPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <article className="max-w-4xl mx-auto">
        <header className="mb-12">
          <Link prefetch={false}
            href="/blogs"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blogs
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30">
              URL Shortening
            </span>
            <span className="text-white/40 text-sm">~10 min read</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Bulk URL Shortening with the API: Automate Link Creation
          </h1>

          <p className="text-xl text-white/70 leading-relaxed">
            When you need hundreds of short links instead of one, clicking through a UI stops being an option. Here&apos;s how to automate the job with code.
          </p>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12 backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">When You Need Bulk Shortening</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              A single short link is a copy-paste job. A product catalog with a thousand SKUs, a batch of tracked links for every influencer in an affiliate program, or a CI pipeline that needs a fresh preview link per pull request is a different problem entirely — one that only automation solves cleanly.
            </p>
            <p className="text-white/70 leading-relaxed">
              The TinyUR API exposes a single, focused endpoint — <code className="text-blue-400">POST /api/shorten</code> — for creating a short link from a URL and an optional custom alias. There&apos;s no separate &quot;bulk&quot; endpoint, and that&apos;s fine: a plain loop with sensible pacing gets you the same result reliably. Full parameter details live on the{" "}
              <Link prefetch={false} href="/api-docs" className="underline underline-offset-2 text-blue-400">
                API docs
              </Link>{" "}
              page.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">The Core Request</h2>
            <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10 mb-6">
              <p className="text-white/70 mb-3">
                Every call takes a JSON body with a required <code className="text-blue-400">url</code> and an optional <code className="text-blue-400">customAlias</code> (3–50 characters, letters, numbers, hyphens, and underscores only):
              </p>
              <div className="bg-black/40 rounded-lg p-4 border border-white/10 overflow-x-auto">
                <pre className="text-sm text-white/80"><code>{`curl -X POST https://tinyur.in/api/shorten \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com/products/wireless-headphones",
    "customAlias": "headphones-launch"
  }'`}</code></pre>
              </div>
              <p className="text-white/70 mt-3">
                A successful response returns the original URL, the short code, and the full short URL. If the alias is already taken by a different destination, the API returns a <code className="text-blue-400">400</code> with an error message instead of silently overwriting it.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Scripting a Batch from a CSV</h2>
            <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10 mb-6">
              <p className="text-white/70 mb-3">
                The most common real-world case is a spreadsheet of destination URLs — a product feed, a list of campaign landing pages — that needs a short link generated per row. A small Node.js script handles this cleanly:
              </p>
              <div className="bg-black/40 rounded-lg p-4 border border-white/10 overflow-x-auto">
                <pre className="text-sm text-white/80"><code>{`import { parse } from "csv-parse/sync";
import { readFileSync, writeFileSync } from "fs";

const rows = parse(readFileSync("links.csv"), { columns: true });
const results = [];

for (const row of rows) {
  const res = await fetch("https://tinyur.in/api/shorten", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url: row.destination,
      customAlias: row.alias || undefined,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error(\`Failed for \${row.destination}: \${data.error}\`);
    continue;
  }

  results.push({ ...row, shortUrl: data.shortUrl });

  // Small delay between requests — considerate of the service,
  // and avoids tripping rate limits on large batches.
  await new Promise((r) => setTimeout(r, 150));
}

writeFileSync("links-with-short-urls.csv", toCsv(results));`}</code></pre>
              </div>
              <p className="text-white/70 mt-3">
                Two details matter more than the happy path here: checking <code className="text-blue-400">res.ok</code> before trusting the response, and pacing requests instead of firing them all at once. Both keep a large batch from silently losing rows or getting throttled partway through.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Patterns Worth Following</h2>
            <div className="space-y-6">
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🐢 Throttle, Don&apos;t Flood</h3>
                <p className="text-white/70">
                  Sending thousands of requests in a tight loop with no delay looks identical to abusive traffic from the server&apos;s point of view. Space requests out — even a modest delay between calls — and batch large jobs into chunks with pauses between them.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🔁 Make Retries Idempotent</h3>
                <p className="text-white/70">
                  If a request fails on a network blip, retrying with the same <code className="text-blue-400">customAlias</code> is safe — a duplicate alias with the same destination is handled gracefully. Retrying with a freshly generated alias on every attempt, by contrast, risks littering your account with abandoned partial links.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">📝 Log the Mapping, Not Just the Result</h3>
                <p className="text-white/70">
                  Keep a record of which source row produced which short URL — a CSV with an appended column, as in the script above, or a simple database table. Without it, regenerating or auditing a batch months later means starting from scratch.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🏷️ Derive Aliases from Structured Data</h3>
                <p className="text-white/70">
                  When source rows have a natural identifier — a SKU, a campaign name, an influencer handle — build the alias from it (<code className="text-blue-400">sku-4471</code>, <code className="text-blue-400">creator-jdoe-q3</code>) instead of leaving it blank. See our{" "}
                  <Link prefetch={false} href="/blogs/url-shortening-best-practices" className="underline underline-offset-2 text-blue-400">
                    URL shortening best practices
                  </Link>{" "}
                  guide for more on naming conventions that stay readable at scale.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">✅ Validate Before You Submit</h3>
                <p className="text-white/70">
                  Filter out blank, malformed, or duplicate URLs client-side before the batch runs. It&apos;s cheaper to catch a bad row in a local check than to debug why a request came back with an error deep into a thousand-row job.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Automating Inside a Pipeline</h2>
            <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
              <p className="text-white/70">
                The same request shape works from a CI job, a serverless function, or a CMS webhook — anywhere you can make an HTTP call. A common pattern is generating a short, shareable preview link automatically whenever new content is published, so the link is ready the moment the announcement goes out instead of being created by hand afterward.
              </p>
            </div>
          </section>

          <section className="backdrop-blur-sm bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20">
            <h2 className="text-3xl font-bold text-white mb-4">Key Takeaways</h2>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>A single, well-scripted loop over the shorten endpoint handles bulk creation without needing a dedicated bulk API</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>Always check the response status — a failed request returns a JSON error, not an exception</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>Throttle requests and chunk large batches instead of firing them all at once</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>Derive custom aliases from structured source data so links stay readable and auditable</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>Keep a persistent log mapping source rows to generated short URLs</span>
              </li>
            </ul>
          </section>

          <div className="mt-12 flex flex-wrap items-center gap-4 text-sm">
            <Link prefetch={false} href="/blogs" className="underline underline-offset-2 text-blue-400 hover:text-blue-300">
              ← Back to Blogs
            </Link>
            <Link prefetch={false} href="/api-docs" className="underline underline-offset-2 text-blue-400 hover:text-blue-300">
              API Docs
            </Link>
            <Link prefetch={false} href="/blogs/url-shortening-best-practices" className="underline underline-offset-2 text-blue-400 hover:text-blue-300">
              URL Shortening Best Practices
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
