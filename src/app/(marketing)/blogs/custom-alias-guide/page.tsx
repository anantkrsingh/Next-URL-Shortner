import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Choose a Custom Short Link Alias People Remember | Tinyur",
  description:
    "A practical guide to custom URL aliases: what makes an alias memorable, naming patterns for campaigns, characters to avoid, and mistakes that make short links harder to trust.",
  alternates: {
    canonical: "https://tinyur.in/blogs/custom-alias-guide",
  },
  openGraph: {
    title: "How to Choose a Custom Short Link Alias People Remember | Tinyur",
    description:
      "Naming patterns, character rules, and common mistakes for custom short link aliases.",
    url: "https://tinyur.in/blogs/custom-alias-guide",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "How to Choose a Custom Short Link Alias People Remember",
    description:
      "Naming patterns, character rules, and common mistakes for custom short link aliases.",
  },
};

export default function CustomAliasGuidePage() {
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
            <span className="text-white/40 text-sm">~8 min read</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            How to Choose a Custom Short Link Alias People Remember
          </h1>

          <p className="text-xl text-white/70 leading-relaxed">
            A random short code like <code className="text-blue-400">tinyur.in/x7Kp2</code> works fine in a clickable post. The moment someone has to read it aloud, type it, or decide whether to trust it, a well-chosen alias wins.
          </p>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12 backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">When a Custom Alias Is Worth It</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Auto-generated codes are short and guaranteed unique, which is all you need for links that are only ever clicked. Custom aliases earn their keep anywhere a human interacts with the link text itself:
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span><strong className="text-white">Spoken links</strong> — podcasts, webinars, videos, and conference talks where people hear the link once</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span><strong className="text-white">Printed links</strong> — posters, packaging, business cards, and slides that have to be typed by hand</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span><strong className="text-white">Trust-sensitive links</strong> — emails and messages where a readable word reassures people about where they&apos;re going</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span><strong className="text-white">Links you&apos;ll reuse</strong> — a resume, portfolio, or signup page you share for months</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Five Rules for a Good Alias</h2>
            <div className="space-y-6">
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">1. Describe the destination</h3>
                <p className="text-white/70">
                  The alias should tell people what they&apos;ll get: <code className="text-blue-400">/webinar-signup</code>, <code className="text-blue-400">/menu</code>, <code className="text-blue-400">/priya-resume</code>. If someone sees only the link, they should be able to guess the page.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">2. Keep it short, but not cryptic</h3>
                <p className="text-white/70">
                  One to three words is the sweet spot. <code className="text-blue-400">/q3-report</code> is better than both <code className="text-blue-400">/q3r</code> (meaningless) and <code className="text-blue-400">/quarterly-financial-report-third-quarter</code> (defeats the point of a short link).
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">3. Use lowercase and hyphens</h3>
                <p className="text-white/70">
                  Short link aliases are usually case-sensitive, so <code className="text-blue-400">/Menu</code> and <code className="text-blue-400">/menu</code> can be different links. Sticking to lowercase removes the guesswork. Hyphens are easier to read and say than underscores, which can disappear when a link is underlined.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">4. Avoid look-alike characters</h3>
                <p className="text-white/70">
                  In printed or spoken links, the letter <code className="text-blue-400">l</code>, the digit <code className="text-blue-400">1</code>, and capital <code className="text-blue-400">I</code> are easily confused, as are <code className="text-blue-400">O</code> and <code className="text-blue-400">0</code>. Words avoid this problem almost entirely.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">5. Don&apos;t put dates in evergreen links</h3>
                <p className="text-white/70">
                  <code className="text-blue-400">/pricing-2026</code> looks stale next year. Add a date only when the content really is tied to it, like an event or a yearly report.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Naming Patterns for Campaigns</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Once you create more than a handful of links, a consistent pattern stops aliases from colliding and makes them easier to find later. Pick one pattern and use it everywhere:
            </p>
            <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10 mb-6">
              <ul className="space-y-3 text-white/70">
                <li><code className="text-blue-400">/topic-channel</code> — <code className="text-blue-400">/launch-email</code>, <code className="text-blue-400">/launch-insta</code>, <code className="text-blue-400">/launch-poster</code></li>
                <li><code className="text-blue-400">/event-purpose</code> — <code className="text-blue-400">/devfest-slides</code>, <code className="text-blue-400">/devfest-feedback</code></li>
                <li><code className="text-blue-400">/brand-product</code> — <code className="text-blue-400">/acme-shoes</code>, <code className="text-blue-400">/acme-bags</code></li>
              </ul>
            </div>
            <p className="text-white/70 leading-relaxed">
              The topic-channel pattern is especially useful because each channel gets its own link and therefore its own click count. You can compare how the email performed against the Instagram post without any extra tooling. For deeper attribution, combine it with UTM tags on the destination URL — see our <Link prefetch={false} href="/blogs/utm-parameters-guide" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">UTM parameters guide</Link>.
            </p>
          </section>

          <section className="mb-12 backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">Alias Rules on TinyUR</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              TinyUR aliases can be 3 to 50 characters long and may contain letters, numbers, hyphens, and underscores. Spaces, slashes, dots, and emoji aren&apos;t allowed because they either break URLs or get encoded into unreadable strings when shared.
            </p>
            <p className="text-white/70 leading-relaxed">
              Aliases are first come, first served. If the one you want is taken, add context rather than a random number: <code className="text-blue-400">/menu-cafe-pune</code> is still readable, while <code className="text-blue-400">/menu7</code> looks like a typo.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Mistakes That Hurt Trust</h2>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span><strong className="text-white">Misleading aliases.</strong> An alias like <code className="text-blue-400">/free-gift</code> that leads to a signup wall teaches people not to click your links.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span><strong className="text-white">Impersonating other brands.</strong> Aliases using another company&apos;s name look like phishing, and links like these are removed when reported.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span><strong className="text-white">Reusing an alias for something new.</strong> Old posts and printed material keep pointing at it. Create a new alias instead.</span>
              </li>
            </ul>
            <p className="text-white/70 leading-relaxed mt-6">
              For more on how readers judge whether a short link is safe, read <Link prefetch={false} href="/blogs/link-phishing-safety" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">Short Link Safety: Spotting Malicious Redirects</Link>.
            </p>
          </section>

          <section className="backdrop-blur-sm bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">Key Takeaways</h2>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>Use custom aliases wherever people will read, hear, or type the link</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>Describe the destination in one to three lowercase, hyphenated words</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>Use one link per channel so each gets its own click count</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>Never make an alias promise something the page doesn&apos;t deliver</span>
              </li>
            </ul>
          </section>

          <div className="mt-12 flex flex-wrap items-center gap-4 text-sm">
            <Link prefetch={false} href="/blogs" className="underline underline-offset-2 text-blue-400 hover:text-blue-300">
              ← Back to Blogs
            </Link>
            <Link prefetch={false} href="/blogs/branded-links-guide" className="underline underline-offset-2 text-blue-400 hover:text-blue-300">
              What Are Branded Links?
            </Link>
            <Link prefetch={false} href="/" className="underline underline-offset-2 text-blue-400 hover:text-blue-300">
              Create a Short Link
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
