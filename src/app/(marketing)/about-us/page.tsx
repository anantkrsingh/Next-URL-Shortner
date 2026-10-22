import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - TinyUR",
  description: "Learn more about TinyUR, the modern URL shortening service built with Next.js",
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About TinyUR
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A modern, fast, and reliable URL shortening service built with cutting-edge technology
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16 backdrop-blur-md bg-white/5 rounded-lg p-8 border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            At TinyUR, we believe in making the web more accessible and shareable. Our mission is to provide 
            a simple, fast, and reliable URL shortening service that helps individuals and businesses share 
            links effortlessly across the digital landscape.
          </p>
        </section>

        {/* What We Offer */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="backdrop-blur-md bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all">
              <h3 className="text-xl font-semibold text-white mb-3">⚡ Lightning Fast</h3>
              <p className="text-gray-300">
                Built with Next.js and optimized for performance, our service delivers shortened URLs in milliseconds.
              </p>
            </div>
            <div className="backdrop-blur-md bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all">
              <h3 className="text-xl font-semibold text-white mb-3">📊 Click Analytics</h3>
              <p className="text-gray-300">
                Track your shortened URLs with detailed click analytics to understand your audience better.
              </p>
            </div>
            <div className="backdrop-blur-md bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all">
              <h3 className="text-xl font-semibold text-white mb-3">🔓 Unshorten Tool</h3>
              <p className="text-gray-300">
                Preview any shortened URL before visiting to ensure safety and transparency.
              </p>
            </div>
            <div className="backdrop-blur-md bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all">
              <h3 className="text-xl font-semibold text-white mb-3">🔌 Developer API</h3>
              <p className="text-gray-300">
                Integrate URL shortening into your applications with our comprehensive API.
              </p>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-16 backdrop-blur-md bg-white/5 rounded-lg p-8 border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-4">Built With Modern Tech</h2>
          <p className="text-gray-300 mb-6">
            TinyUR is built using the latest web technologies to ensure reliability, performance, and scalability:
          </p>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">▹</span>
              <span><strong className="text-white">Next.js 16</strong> - React framework for production</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">▹</span>
              <span><strong className="text-white">Prisma</strong> - Next-generation ORM for database management</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">▹</span>
              <span><strong className="text-white">TypeScript</strong> - Type-safe development</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">▹</span>
              <span><strong className="text-white">Tailwind CSS</strong> - Modern utility-first styling</span>
            </li>
          </ul>
        </section>

        <section className="mb-16 backdrop-blur-md bg-white/5 rounded-lg p-8 border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-4">Why We Built TinyUR</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Long links are awkward to share. They wrap across several lines in chat apps, eat most of a
            text message, get broken by email clients, and are almost impossible to read aloud or type
            from a poster. Many popular shorteners solve this but then hide basic features behind
            sign-up walls, expire free links, or show interstitial pages before the redirect.
          </p>
          <p className="text-gray-300 leading-relaxed">
            TinyUR is our answer: paste a link, get a short one, and share it. No account is needed for
            basic shortening, and redirects go straight to the destination. Signing up adds a dashboard
            for your links, and paid plans add higher limits and API access for teams that create links
            at scale.
          </p>
        </section>

        <section className="mb-16 backdrop-blur-md bg-white/5 rounded-lg p-8 border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            When you shorten a URL, TinyUR stores it with a unique code, or the custom alias you choose.
            When someone opens the short link, our server looks up that code, adds one to its click count,
            and redirects the visitor to the original address. Frequently used links are served from a
            cache, so the redirect happens in milliseconds.
          </p>
          <p className="text-gray-300 leading-relaxed">
            We count clicks without collecting personal profiles of the people who click. If you want to
            understand more of the mechanics, our article on{" "}
            <Link prefetch={false} href="/blogs/how-url-shortners-work" className="text-blue-400 hover:underline">
              how URL shorteners work
            </Link>{" "}
            goes into detail.
          </p>
        </section>

        <section className="mb-16 backdrop-blur-md bg-white/5 rounded-lg p-8 border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-4">Link Safety and Abuse</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Short links can be misused to hide phishing pages, malware, or spam. Our{" "}
            <Link prefetch={false} href="/terms-of-service" className="text-blue-400 hover:underline">
              Terms of Service
            </Link>{" "}
            prohibit these uses, and we disable links that break them. Anyone can check where a short link
            leads before opening it with our free{" "}
            <Link prefetch={false} href="/unshorten" className="text-blue-400 hover:underline">
              Unshorten tool
            </Link>
            .
          </p>
          <p className="text-gray-300 leading-relaxed">
            If you find a TinyUR link pointing to harmful content, report it to{" "}
            <a href="mailto:contact@tinyur.in" className="text-blue-400 hover:underline">
              contact@tinyur.in
            </a>{" "}
            with the full short URL. We review every report.
          </p>
        </section>

        <section className="mb-16 backdrop-blur-md bg-white/5 rounded-lg p-8 border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-4">Contact</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            TinyUR is operated from India. For support, privacy requests, or to report a
            harmful short link, email{" "}
            <a href="mailto:contact@tinyur.in" className="text-blue-400 hover:underline">
              contact@tinyur.in
            </a>{" "}
            or use the{" "}
            <Link prefetch={false} href="/contact" className="text-blue-400 hover:underline">
              Contact page
            </Link>
            . We typically respond within 1–2 business days.
          </p>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-8">
            Start shortening your URLs today and experience the difference.
          </p>
          <Link prefetch={false}
            href="/"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try TinyUR Now
          </Link>
        </section>
      </div>
    </div>
  );
}
