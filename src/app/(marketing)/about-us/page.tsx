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
              <span><strong className="text-white">Next.js 15</strong> - React framework for production</span>
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

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-8">
            Start shortening your URLs today and experience the difference.
          </p>
          <Link
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
