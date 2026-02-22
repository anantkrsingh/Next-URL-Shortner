import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Shortening Best Practices: Security, Analytics & Management | TinyUR",
  description: "Essential strategies for creating effective short links: security, analytics, custom domains, and link management at scale.",
  alternates: {
    canonical: "https://tinyur.in/url-shortening-best-practices",
  },
  openGraph: {
    title: "URL Shortening Best Practices | TinyUR",
    description: "Essential strategies for creating effective short links: security, analytics, custom domains, and link management.",
    url: "https://tinyur.in/url-shortening-best-practices",
    type: "article",
  },
};

export default function URLShorteningBestPracticesPage() {
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
            <span className="text-white/40 text-sm">~9 min read</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            URL Shortening Best Practices
          </h1>
          
          <p className="text-xl text-white/70 leading-relaxed">
            Master the art of URL shortening with proven strategies for security, performance, and effective link management.
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12 backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">Why Best Practices Matter</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              URL shortening seems simple on the surface, but implementing it effectively requires careful consideration of security, user experience, analytics, and scalability. Poor practices can lead to broken links, security vulnerabilities, and lost opportunities.
            </p>
            <p className="text-white/70 leading-relaxed">
              This guide covers essential best practices that will help you create, manage, and optimize short links for maximum impact.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">1. Security Best Practices</h2>
            
            <div className="space-y-6">
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🔒 Validate Destination URLs</h3>
                <p className="text-white/70 mb-3">
                  Always validate and sanitize destination URLs before creating short links:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Block malicious domains and known phishing sites</li>
                  <li>Verify URL format and protocol (prefer HTTPS)</li>
                  <li>Implement URL blacklists and reputation checking</li>
                  <li>Scan for malware and suspicious patterns</li>
                </ul>
              </div>

              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🛡️ Implement Rate Limiting</h3>
                <p className="text-white/70 mb-3">
                  Protect your service from abuse with rate limiting:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Limit link creation per IP address or user</li>
                  <li>Implement CAPTCHA for suspicious activity</li>
                  <li>Monitor for automated bot behavior</li>
                  <li>Set reasonable quotas for free tier users</li>
                </ul>
              </div>

              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🔐 Use HTTPS Everywhere</h3>
                <p className="text-white/70">
                  Ensure all short links use HTTPS to protect user privacy and prevent man-in-the-middle attacks. Modern browsers flag HTTP sites as "Not Secure," which damages trust.
                </p>
              </div>

              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">⚠️ Provide Link Preview Options</h3>
                <p className="text-white/70">
                  Allow users to preview destinations before clicking. Add a "+" to the end of short links to show preview pages, helping users verify safety.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">2. Link Creation Best Practices</h2>
            
            <div className="space-y-6">
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">📝 Create Meaningful Slugs</h3>
                <p className="text-white/70 mb-3">
                  Custom slugs improve memorability and trust:
                </p>
                <div className="bg-black/40 rounded-lg p-4 border border-white/10 mb-3">
                  <p className="text-green-400 mb-1">✓ Good: tinyur.in/summer-sale-2024</p>
                  <p className="text-green-400 mb-1">✓ Good: tinyur.in/product-launch</p>
                  <p className="text-red-400 mt-3 mb-1">✗ Bad: tinyur.in/a7x9k2</p>
                  <p className="text-red-400">✗ Bad: tinyur.in/12345</p>
                </div>
                <p className="text-white/70">
                  Descriptive slugs are easier to share verbally and build more trust than random strings.
                </p>
              </div>

              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🎯 Use Consistent Naming Conventions</h3>
                <p className="text-white/70 mb-3">
                  Develop a systematic approach to naming:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li><code className="text-blue-400">campaign-name</code> for marketing campaigns</li>
                  <li><code className="text-blue-400">product-feature</code> for product pages</li>
                  <li><code className="text-blue-400">event-date</code> for time-sensitive content</li>
                  <li><code className="text-blue-400">channel-content</code> for multi-channel tracking</li>
                </ul>
              </div>

              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">⏰ Consider Link Expiration</h3>
                <p className="text-white/70">
                  Set expiration dates for time-sensitive campaigns. This prevents outdated promotions from circulating and keeps your link database clean.
                </p>
              </div>

              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🔄 Enable Link Editing</h3>
                <p className="text-white/70">
                  Allow destination URL updates without changing the short link. This is crucial for fixing mistakes or updating campaigns without breaking existing shares.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">3. Analytics and Tracking</h2>
            
            <div className="space-y-6">
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">📊 Track Essential Metrics</h3>
                <p className="text-white/70 mb-3">
                  Monitor these key performance indicators:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Total clicks and unique visitors</li>
                  <li>Geographic location of clicks</li>
                  <li>Referrer sources (social media, email, direct)</li>
                  <li>Device types and browsers</li>
                  <li>Click timestamps for temporal analysis</li>
                </ul>
              </div>

              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🏷️ Use UTM Parameters</h3>
                <p className="text-white/70 mb-3">
                  Combine short links with UTM parameters for detailed campaign tracking:
                </p>
                <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                  <code className="text-blue-400 text-sm break-all">
                    tinyur.in/sale → example.com/products?utm_source=twitter&utm_campaign=summer_sale
                  </code>
                </div>
              </div>

              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🔍 Respect User Privacy</h3>
                <p className="text-white/70">
                  Balance analytics with privacy by anonymizing IP addresses, complying with GDPR/CCPA, and being transparent about data collection in your privacy policy.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">4. Performance Optimization</h2>
            
            <div className="space-y-6">
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">⚡ Implement Caching</h3>
                <p className="text-white/70">
                  Cache short link lookups to reduce database queries and improve redirect speed. Use Redis or similar in-memory stores for frequently accessed links.
                </p>
              </div>

              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🌍 Use CDN for Global Performance</h3>
                <p className="text-white/70">
                  Deploy your URL shortener behind a CDN to ensure fast redirects worldwide, regardless of user location.
                </p>
              </div>

              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🔢 Optimize Short Code Generation</h3>
                <p className="text-white/70">
                  Use efficient algorithms for generating short codes. Base62 encoding (a-z, A-Z, 0-9) provides 62^n possible combinations for n-character codes.
                </p>
              </div>

              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">📈 Plan for Scale</h3>
                <p className="text-white/70">
                  Design your system to handle growth. Use database indexing, implement horizontal scaling, and consider sharding for massive scale.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">5. User Experience</h2>
            
            <div className="space-y-6">
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🎨 Create Custom 404 Pages</h3>
                <p className="text-white/70">
                  When a short link doesn't exist, show a helpful 404 page with navigation options instead of a generic error.
                </p>
              </div>

              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">📱 Ensure Mobile Optimization</h3>
                <p className="text-white/70">
                  Most link clicks happen on mobile devices. Ensure fast redirects and mobile-friendly preview pages.
                </p>
              </div>

              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">♿ Support Accessibility</h3>
                <p className="text-white/70">
                  Make preview pages and management interfaces accessible to users with disabilities following WCAG guidelines.
                </p>
              </div>

              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🔗 Provide QR Codes</h3>
                <p className="text-white/70">
                  Generate QR codes for short links to enable easy offline-to-online transitions in print materials and physical spaces.
                </p>
              </div>
            </div>
          </section>

          <section className="backdrop-blur-sm bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20">
            <h2 className="text-3xl font-bold text-white mb-4">Key Takeaways</h2>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>Prioritize security with URL validation, rate limiting, and HTTPS</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>Create meaningful, memorable slugs with consistent naming conventions</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>Track essential metrics while respecting user privacy</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>Optimize performance with caching, CDN, and efficient algorithms</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">▹</span>
                <span>Focus on user experience with mobile optimization and accessibility</span>
              </li>
            </ul>
          </section>
        </div>
      </article>
    </div>
  );
}
