import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Are Branded Links? Complete Guide | TinyUR",
  description: "Learn how branded short links boost trust, increase click-through rates, and strengthen your brand identity in every share.",
  alternates: {
    canonical: "https://tinyur.in/branded-links-guide",
  },
  openGraph: {
    title: "What Are Branded Links? Complete Guide | TinyUR",
    description: "Learn how branded short links boost trust, increase click-through rates, and strengthen your brand identity.",
    url: "https://tinyur.in/branded-links-guide",
    type: "article",
  },
};

export default function BrandedLinksGuidePage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <article className="max-w-4xl mx-auto">
        {/* Header */}
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
            <span className="text-white/40 text-sm">~8 min read</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            What Are Branded Links?
          </h1>
          
          <p className="text-xl text-white/70 leading-relaxed">
            Discover how branded short links can transform your marketing strategy, build trust, and increase engagement.
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12 backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">Understanding Branded Links</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              A branded link (also called a custom short link or vanity URL) is a shortened URL that uses your own custom domain name instead of a generic shortener domain. For example:
            </p>
            <div className="bg-black/40 rounded-lg p-4 border border-white/10 mb-4">
              <p className="text-white/50 mb-2">Generic short link:</p>
              <code className="text-blue-400">bit.ly/3xK9mP2</code>
              
              <p className="text-white/50 mt-4 mb-2">Branded short link:</p>
              <code className="text-green-400">yourbrand.link/summer-sale</code>
            </div>
            <p className="text-white/70 leading-relaxed">
              The difference is clear: branded links reinforce your brand identity with every share, while generic links are forgettable and can appear suspicious.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Why Branded Links Matter</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🔒 Build Trust</h3>
                <p className="text-white/70">
                  Users are more likely to click links that clearly display your brand name. Generic short links can look suspicious and reduce click-through rates.
                </p>
              </div>

              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">📈 Increase CTR</h3>
                <p className="text-white/70">
                  Studies show branded links can increase click-through rates by up to 39% compared to generic short links.
                </p>
              </div>

              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🎯 Brand Recognition</h3>
                <p className="text-white/70">
                  Every link becomes a branding opportunity. Consistent use of branded links strengthens brand recall and recognition.
                </p>
              </div>

              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">📊 Better Analytics</h3>
                <p className="text-white/70">
                  Track performance across campaigns with custom slugs that make sense, making data analysis more intuitive.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">How to Create Branded Links</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">1. Choose Your Custom Domain</h3>
                <p className="text-white/70 mb-3">
                  Select a short, memorable domain that represents your brand:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Use your brand name: <code className="text-blue-400">nike.link</code></li>
                  <li>Create a branded shortener: <code className="text-blue-400">go.yourcompany.com</code></li>
                  <li>Use creative TLDs: <code className="text-blue-400">yourbrand.to</code> or <code className="text-blue-400">yourbrand.ly</code></li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">2. Set Up DNS Configuration</h3>
                <p className="text-white/70">
                  Point your custom domain to your URL shortening service by configuring DNS records (typically CNAME or A records).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">3. Create Meaningful Slugs</h3>
                <p className="text-white/70 mb-3">
                  Use descriptive, memorable slugs that hint at the destination:
                </p>
                <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                  <p className="text-green-400 mb-1">✓ Good: yourbrand.link/spring-collection</p>
                  <p className="text-green-400 mb-1">✓ Good: yourbrand.link/webinar-2024</p>
                  <p className="text-red-400 mt-3 mb-1">✗ Bad: yourbrand.link/x7k2p</p>
                  <p className="text-red-400">✗ Bad: yourbrand.link/link1</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Best Practices for Branded Links</h2>
            
            <div className="space-y-4">
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">Keep It Short and Simple</h3>
                <p className="text-white/70">
                  The whole point of URL shortening is brevity. Keep your custom slugs concise while maintaining clarity.
                </p>
              </div>

              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">Use Consistent Naming Conventions</h3>
                <p className="text-white/70">
                  Develop a naming system for your links (e.g., campaign-name, product-category) to maintain organization.
                </p>
              </div>

              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">Make Links Memorable</h3>
                <p className="text-white/70">
                  Create links that people can remember and even type manually if needed.
                </p>
              </div>

              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">Track and Analyze Performance</h3>
                <p className="text-white/70">
                  Use analytics to understand which links perform best and optimize your strategy accordingly.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 backdrop-blur-sm bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20">
            <h2 className="text-3xl font-bold text-white mb-4">Real-World Impact</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Major brands have seen significant improvements after switching to branded links:
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span><strong className="text-white">39% higher CTR</strong> compared to generic short links</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span><strong className="text-white">Improved brand recall</strong> with consistent link branding across channels</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span><strong className="text-white">Better user trust</strong> leading to reduced bounce rates</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span><strong className="text-white">Enhanced social media performance</strong> with recognizable links</span>
              </li>
            </ul>
          </section>

          <section className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">Get Started with Branded Links</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Ready to elevate your link sharing strategy? TinyUR supports custom domains, allowing you to create branded short links that build trust and drive engagement.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Creating Branded Links
            </Link>
          </section>
        </div>
      </article>
    </div>
  );
}
