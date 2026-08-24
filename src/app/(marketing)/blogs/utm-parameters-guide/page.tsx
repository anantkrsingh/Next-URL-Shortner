import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UTM Parameters Explained: Track Every Click That Matters | Tinyur",
  description:
    "A complete guide to UTM parameters — what each tag means, how to build a naming convention that doesn't collapse under scale, and how to pair them with short links for clean tracking.",
  alternates: {
    canonical: "https://tinyur.in/blogs/utm-parameters-guide",
  },
  openGraph: {
    title: "UTM Parameters Explained: Track Every Click That Matters | Tinyur",
    description:
      "Learn what UTM parameters do, how to structure them consistently, and how short links keep them clean and shareable.",
    url: "https://tinyur.in/blogs/utm-parameters-guide",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "UTM Parameters Explained: Track Every Click That Matters",
    description:
      "A complete, practical guide to building and tracking UTM parameters with short links.",
  },
};

export default function UtmParametersGuidePage() {
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
            UTM Parameters Explained: Track Every Click That Matters
          </h1>

          <p className="text-xl text-white/70 leading-relaxed">
            UTM tags turn every link you share into a labeled data point. Here&apos;s how they work, how to structure them so they scale, and how short links keep the whole system readable.
          </p>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12 backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">What a UTM Parameter Actually Is</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              UTM stands for Urchin Tracking Module, named after Urchin Software, the web analytics company Google acquired in 2005 whose tagging scheme became the basis for Google Analytics campaign tracking. A UTM parameter is just a query string key-value pair appended to a URL — it doesn&apos;t change what page loads, but analytics tools read those parameters and use them to label the resulting session.
            </p>
            <p className="text-white/70 leading-relaxed">
              Without UTM tags, analytics can usually tell you a visit came from &quot;social&quot; or &quot;referral&quot; in broad strokes. With UTM tags, you can tell that a visit came from a specific Instagram story, a specific newsletter send, or a specific paid ad variant — the difference between knowing something worked and knowing exactly what worked.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">The Five Standard Parameters</h2>
            <div className="space-y-6">
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">
                  <code className="text-blue-400">utm_source</code> — Where the traffic came from
                </h3>
                <p className="text-white/70">
                  The platform or publisher sending the click: <code className="text-blue-400">newsletter</code>, <code className="text-blue-400">twitter</code>, <code className="text-blue-400">google</code>, <code className="text-blue-400">partner-blog</code>. Required on virtually every UTM link.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">
                  <code className="text-blue-400">utm_medium</code> — The channel type
                </h3>
                <p className="text-white/70">
                  The category of traffic: <code className="text-blue-400">email</code>, <code className="text-blue-400">social</code>, <code className="text-blue-400">cpc</code>, <code className="text-blue-400">organic</code>, <code className="text-blue-400">affiliate</code>. This is what lets you group &quot;all email traffic&quot; regardless of which specific newsletter sent it.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">
                  <code className="text-blue-400">utm_campaign</code> — The initiative
                </h3>
                <p className="text-white/70">
                  The name of the specific push this link belongs to: <code className="text-blue-400">summer_sale_2026</code>, <code className="text-blue-400">product_launch_v2</code>. Ties multiple sources and mediums together under one umbrella you can report on as a unit.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">
                  <code className="text-blue-400">utm_term</code> — The keyword or audience
                </h3>
                <p className="text-white/70">
                  Originally built for paid search keywords, it&apos;s now also used to distinguish audience segments in paid social — <code className="text-blue-400">lookalike_1pct</code>, <code className="text-blue-400">retarget_cart</code>. Optional, but useful once you&apos;re running more than one variant of the same ad.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">
                  <code className="text-blue-400">utm_content</code> — The specific asset
                </h3>
                <p className="text-white/70">
                  Distinguishes between near-identical links pointing to the same place — useful for A/B testing two versions of an email, or telling apart the &quot;header button&quot; and &quot;footer button&quot; on the same page: <code className="text-blue-400">header-cta</code> vs <code className="text-blue-400">footer-cta</code>.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Why UTM Links and Short Links Belong Together</h2>
            <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10 mb-6">
              <p className="text-white/70 mb-3">
                A fully tagged UTM URL is not something you want anyone to actually see, type, or trust:
              </p>
              <div className="bg-black/40 rounded-lg p-4 border border-white/10 mb-3">
                <p className="text-red-400 text-sm break-all mb-1">
                  https://example.com/products/wireless-headphones?utm_source=instagram&amp;utm_medium=social&amp;utm_campaign=summer_sale_2026&amp;utm_content=story-swipeup
                </p>
                <p className="text-green-400 text-sm break-all">tinyur.in/ig-headphones</p>
              </div>
              <p className="text-white/70">
                Wrapping it in a short link fixes three problems at once: it becomes short enough to fit in a bio, a story sticker, or a printed flyer; it stops leaking your internal campaign naming to anyone who inspects the URL; and it gives you a second, independent layer of click data — see our{" "}
                <Link prefetch={false} href="/blogs/url-shortening-best-practices" className="underline underline-offset-2 text-blue-400">
                  URL shortening best practices
                </Link>{" "}
                guide — that still works even if the destination page&apos;s analytics script fails to load.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Building a Naming Convention That Survives Scale</h2>
            <div className="space-y-6">
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🔡 Lowercase, Always</h3>
                <p className="text-white/70">
                  UTM parameters are case-sensitive in most analytics platforms. <code className="text-blue-400">Instagram</code> and <code className="text-blue-400">instagram</code> will be reported as two different sources unless you enforce lowercase everywhere from day one.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">➖ Pick One Separator and Stick to It</h3>
                <p className="text-white/70">
                  Choose hyphens or underscores for multi-word values and never mix them. <code className="text-blue-400">summer_sale</code> and <code className="text-blue-400">summer-sale</code> will fragment your reporting into two rows that should have been one.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">📋 Keep a Shared Source of Truth</h3>
                <p className="text-white/70">
                  Maintain a spreadsheet or shared doc listing every approved <code className="text-blue-400">utm_source</code> and <code className="text-blue-400">utm_medium</code> value in use. Anyone building a new campaign link should pick from that list rather than inventing a new label — it&apos;s the single biggest thing that keeps multi-person marketing teams from polluting their own data.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🏷️ Match Short Link Slugs to Campaigns</h3>
                <p className="text-white/70">
                  Name the short link slug after the same campaign it&apos;s tagged with — <code className="text-blue-400">tinyur.in/summer-sale-ig</code> for a link tagged <code className="text-blue-400">utm_campaign=summer_sale</code> and <code className="text-blue-400">utm_source=instagram</code>. When the slug and the tags tell the same story, auditing months of campaigns later takes minutes instead of hours.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Common Mistakes to Avoid</h2>
            <div className="space-y-6">
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🚫 Tagging Internal Links</h3>
                <p className="text-white/70">
                  Never put UTM parameters on links between pages of your own site. Doing so overwrites the visitor&apos;s original session source with your internal navigation, destroying the very attribution data you were trying to capture.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🚫 Overloading utm_campaign</h3>
                <p className="text-white/70">
                  Cramming the source, date, and content into <code className="text-blue-400">utm_campaign</code> alone (<code className="text-blue-400">ig_story_summer_2026_v3</code>) instead of splitting across the proper fields makes filtering and grouping in analytics nearly impossible.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🚫 Forgetting Encoded Spaces</h3>
                <p className="text-white/70">
                  Spaces in parameter values must be encoded as <code className="text-blue-400">%20</code> or replaced with a separator — a raw space breaks the URL. Using hyphens or underscores avoids this entirely.
                </p>
              </div>
            </div>
          </section>

          <section className="backdrop-blur-sm bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20">
            <h2 className="text-3xl font-bold text-white mb-4">Key Takeaways</h2>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>UTM parameters label a click&apos;s source, medium, campaign, term, and content for analytics</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>Wrap tagged URLs in short links to keep them shareable and to hide internal campaign naming</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>Lock in lowercase values and one separator convention before your first campaign, not after ten</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>Keep a shared list of approved source and medium values across your whole team</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>Never tag links between pages on your own site</span>
              </li>
            </ul>
          </section>

          <div className="mt-12 flex flex-wrap items-center gap-4 text-sm">
            <Link prefetch={false} href="/blogs" className="underline underline-offset-2 text-blue-400 hover:text-blue-300">
              ← Back to Blogs
            </Link>
            <Link prefetch={false} href="/blogs/qr-codes-vs-short-links" className="underline underline-offset-2 text-blue-400 hover:text-blue-300">
              QR Codes vs Short Links
            </Link>
            <Link prefetch={false} href="/click-counter" className="underline underline-offset-2 text-blue-400 hover:text-blue-300">
              URL Click Counter
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
