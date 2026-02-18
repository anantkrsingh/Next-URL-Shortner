import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blogs | Tinyur",
  description:
    "Explore technical articles from Tinyur covering web development, security, databases, and more.",
  alternates: {
    canonical: "https://tinyur.in/blogs",
  },
  openGraph: {
    title: "Blogs | Tinyur",
    description:
      "Explore technical articles from Tinyur covering web development, security, databases, and more.",
    url: "https://tinyur.in/blogs",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Blogs | Tinyur",
    description:
      "Explore technical articles from Tinyur covering web development, security, databases, and more.",
  },
};

export default function BlogsPage() {
  const blogs = [
    {
      href: "/how-url-shortners-work",
      title: "How URL Shorteners work",
      description: "A deep dive into the mechanics of shortening, redirecting, tracking, and the infrastructure behind reliable short links.",
      readTime: "~10 min read",
    },
    {
      href: "/white-hat-seo",
      title: "White Hat SEO",
      description: "Ethical SEO strategies for sustainable rankings and long-term growth.",
      readTime: "~8 min read",
    },
    {
      href: "/black-hat-seo",
      title: "Black Hat SEO",
      description: "Risks, tactics, and penalties of manipulative SEO strategies.",
      readTime: "~8 min read",
    },
    {
      href: "/white-hat-seo-vs-black-hat-seo",
      title: "White Hat SEO vs Black Hat SEO",
      description: "A practical comparison to evaluate trade-offs and choose wisely.",
      readTime: "~9 min read",
    },
    {
      href: "/symmetric-vs-asymmetric-encryption",
      title: "Symmetric vs Asymmetric Key Encryption",
      description: "Complete guide to encryption: algorithms, performance, security, and when to use symmetric vs asymmetric encryption.",
      readTime: "~12 min read",
    },
    {
      href: "/salting-and-hashing",
      title: "Salting and Hashing",
      description: "Password security best practices: cryptographic hashing, salt generation, rainbow tables, bcrypt, and Argon2.",
      readTime: "~11 min read",
    },
    {
      href: "/sql-vs-nosql",
      title: "SQL vs NoSQL Databases",
      description: "Comprehensive database comparison: structure, ACID vs BASE, scalability, and choosing the right database for your project.",
      readTime: "~13 min read",
    },
    {
      href: "/react-vs-nextjs",
      title: "React.js vs Next.js",
      description: "Complete framework comparison: SSR vs CSR, performance, routing, SEO, and when to choose each framework.",
      readTime: "~14 min read",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden pt-24 pb-12">
      {/* API Docs and Blogs Links */}
      <div className="absolute top-4 right-4 flex gap-4 z-20 flex-wrap justify-end">
        <Link
          href="/"
          className="text-white/70 hover:text-white font-medium text-sm transition-colors"
        >
          Home
        </Link>
        <Link
          href="/api-docs"
          className="px-4 py-2 rounded-full text-sm font-medium text-white transition-all hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          API Docs
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Blog</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Deep dives into web development, security, and scalable systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog, index) => (
            <Link
              key={index}
              href={blog.href}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:-translate-y-1"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)"
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                    Article
                  </span>
                  <span className="text-xs text-white/40 font-mono">
                    {blog.readTime}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">
                  {blog.title}
                </h2>

                <p className="text-white/60 leading-relaxed mb-6">
                  {blog.description}
                </p>

                <div className="flex items-center text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  Read article
                  <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


