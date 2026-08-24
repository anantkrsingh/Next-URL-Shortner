import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Short Link Safety: How to Spot and Avoid Malicious Redirects | Tinyur",
  description:
    "Short links hide their destination by design, which is exactly what phishing campaigns exploit. Learn how to preview links safely, what a trustworthy shortener does differently, and how to protect the people who click your links.",
  alternates: {
    canonical: "https://tinyur.in/blogs/link-phishing-safety",
  },
  openGraph: {
    title: "Short Link Safety: How to Spot and Avoid Malicious Redirects | Tinyur",
    description:
      "How to preview short links safely, spot phishing patterns, and choose a trustworthy URL shortener.",
    url: "https://tinyur.in/blogs/link-phishing-safety",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Short Link Safety: How to Spot and Avoid Malicious Redirects",
    description:
      "A practical guide to staying safe around shortened links, for both clickers and link creators.",
  },
};

export default function LinkPhishingSafetyPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <article className="max-w-4xl mx-auto">
        <header className="mb-12">
          <Link
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
            <span className="text-white/40 text-sm">~9 min read</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Short Link Safety: How to Spot and Avoid Malicious Redirects
          </h1>

          <p className="text-xl text-white/70 leading-relaxed">
            A short link hides its destination on purpose — that&apos;s the entire feature. It&apos;s also the exact property phishing campaigns lean on. Here&apos;s how to click safely and build responsibly.
          </p>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12 backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">Why Short Links Attract Abuse</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              A well-formed phishing URL is easy to spot: <code className="text-blue-400">paypa1-secure-login.ru</code> looks nothing like <code className="text-blue-400">paypal.com</code>, and most people notice. A short link erases that tell. <code className="text-blue-400">tinyur.in/8fK2q</code> gives no visual signal about where it leads — which is precisely why attackers wrap malicious destinations behind shorteners in phishing emails, SMS (&quot;smishing&quot;), and social DMs.
            </p>
            <p className="text-white/70 leading-relaxed">
              This isn&apos;t a flaw unique to any one shortener — it&apos;s a structural trade-off of the format itself. The fix isn&apos;t avoiding short links; it&apos;s knowing how to check one before you trust it, and choosing tools built by people who take that responsibility seriously.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">How to Check a Short Link Before Clicking</h2>
            <div className="space-y-6">
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">👀 Preview the Destination First</h3>
                <p className="text-white/70">
                  Use an{" "}
                  <Link href="/unshorten" className="underline underline-offset-2 text-blue-400">
                    unshorten tool
                  </Link>{" "}
                  to resolve a short link to its real destination without visiting it. Paste the link in, read the full URL it reveals, and only proceed if it points somewhere you recognize and expect.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🔎 Check the Sender and Context, Not Just the Link</h3>
                <p className="text-white/70">
                  A short link from a verified colleague in an ongoing conversation is very different from an unsolicited one in a text claiming to be your bank. Phishing depends on urgency and unfamiliarity — messages about &quot;account suspended,&quot; &quot;package held,&quot; or &quot;unusual sign-in&quot; that arrive out of nowhere deserve extra scrutiny regardless of what the link resolves to.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🔐 Never Enter Credentials After a Redirect Chain</h3>
                <p className="text-white/70">
                  If a link bounces through two or three redirects before landing on a login page, stop. Legitimate services rarely need multiple hops to reach a sign-in form. Navigate to the service directly by typing its known address instead of trusting the redirect.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">📱 Be Extra Cautious on Mobile</h3>
                <p className="text-white/70">
                  Small screens make it harder to spot a suspicious domain after a redirect, and mobile browsers often hide the full URL bar by default. Expand the address bar or use a preview link whenever a short link arrives by SMS.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">What a Trustworthy Shortener Should Do</h2>
            <div className="space-y-6">
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">✅ Validate URLs on Creation</h3>
                <p className="text-white/70">
                  Reject malformed input and enforce a real URL format before a link is even created, rather than accepting arbitrary strings that could be used to smuggle scripts or malformed redirects.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">✅ Offer a Preview Path</h3>
                <p className="text-white/70">
                  A dedicated way to resolve a short link&apos;s destination without following it — like our own{" "}
                  <Link href="/unshorten" className="underline underline-offset-2 text-blue-400">
                    unshorten page
                  </Link>{" "}
                  — gives cautious users a safe way to inspect a link before they commit to opening it.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">✅ Rate-Limit Link Creation</h3>
                <p className="text-white/70">
                  Reasonable limits on how many links a single source can create in a short window make it harder to mass-produce disposable phishing links, which is exactly the kind of abuse rate limiting is meant to slow down. See our{" "}
                  <Link href="/blogs/url-shortening-best-practices" className="underline underline-offset-2 text-blue-400">
                    URL shortening best practices
                  </Link>{" "}
                  guide for more on this.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">✅ Serve Every Redirect Over HTTPS</h3>
                <p className="text-white/70">
                  The short link hop itself should always be encrypted, so nothing between the click and the redirect can intercept or tamper with where the visitor ends up.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">If You&apos;re the One Sharing Short Links</h2>
            <div className="space-y-6">
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🏷️ Prefer Branded, Custom Slugs</h3>
                <p className="text-white/70">
                  A recognizable custom alias like <code className="text-blue-400">tinyur.in/acme-webinar</code> builds far more trust than a random string, because it gives recipients something legible to judge before they click. Our{" "}
                  <Link href="/blogs/branded-links-guide" className="underline underline-offset-2 text-blue-400">
                    branded links guide
                  </Link>{" "}
                  goes deeper on this.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">📢 Tell People Where a Link Goes</h3>
                <p className="text-white/70">
                  Pair every shared short link with a short sentence describing the destination — &quot;here&apos;s the slide deck: tinyur.in/q3-deck&quot; instead of a bare link with no context. It costs nothing and makes your own links easier to trust.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🧹 Retire Links You No Longer Use</h3>
                <p className="text-white/70">
                  Old, forgotten short links are occasionally hijacked if the destination domain later expires and gets registered by someone else. Periodically audit and deactivate links you no longer need.
                </p>
              </div>
            </div>
          </section>

          <section className="backdrop-blur-sm bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20">
            <h2 className="text-3xl font-bold text-white mb-4">Key Takeaways</h2>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>Short links hide destinations by design — treat unfamiliar ones with the same caution as any unknown link</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>Use an unshorten tool to preview a destination before clicking, especially from unsolicited messages</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>Judge the sender and context, not just the link — urgency is the most common phishing tell</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>Choose shorteners that validate URLs, rate-limit creation, and offer a safe preview path</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>As a creator, use branded slugs and context so your own links are easy for others to trust</span>
              </li>
            </ul>
          </section>

          <div className="mt-12 flex flex-wrap items-center gap-4 text-sm">
            <Link href="/blogs" className="underline underline-offset-2 text-blue-400 hover:text-blue-300">
              ← Back to Blogs
            </Link>
            <Link href="/unshorten" className="underline underline-offset-2 text-blue-400 hover:text-blue-300">
              Unshorten a Link
            </Link>
            <Link href="/blogs/url-shortening-best-practices" className="underline underline-offset-2 text-blue-400 hover:text-blue-300">
              URL Shortening Best Practices
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
