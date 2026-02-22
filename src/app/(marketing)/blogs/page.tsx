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
      title: "How URL Shorteners Work",
      description: "A deep dive into the mechanics of shortening, redirecting, tracking, and the infrastructure behind reliable short links.",
      readTime: "~10 min read",
      category: "URL Shortening",
    },
    {
      href: "/branded-links-guide",
      title: "What Are Branded Links?",
      description: "Learn how branded short links boost trust, increase click-through rates, and strengthen your brand identity in every share.",
      readTime: "~8 min read",
      category: "URL Shortening",
    },
    {
      href: "/url-shortening-best-practices",
      title: "URL Shortening Best Practices",
      description: "Essential strategies for creating effective short links: security, analytics, custom domains, and link management at scale.",
      readTime: "~9 min read",
      category: "URL Shortening",
    },
    {
      href: "/white-hat-seo",
      title: "White Hat SEO",
      description: "Ethical SEO strategies for sustainable rankings and long-term growth.",
      readTime: "~8 min read",
      category: "SEO",
    },
    {
      href: "/black-hat-seo",
      title: "Black Hat SEO",
      description: "Risks, tactics, and penalties of manipulative SEO strategies.",
      readTime: "~8 min read",
      category: "SEO",
    },
    {
      href: "/white-hat-seo-vs-black-hat-seo",
      title: "White Hat SEO vs Black Hat SEO",
      description: "A practical comparison to evaluate trade-offs and choose wisely.",
      readTime: "~9 min read",
      category: "SEO",
    },
  ];

  return (
    <div className="min-h-screen p-4 relative overflow-hidden pt-24 pb-16">
      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 tracking-tight">
            TinyUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Blog</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Insights on URL shortening, link management, and digital marketing strategies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <Link
              key={index}
              href={blog.href}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2"
            >
              {/* Animated gradient on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "radial-gradient(circle at top right, rgba(59, 130, 246, 0.1) 0%, transparent 60%)"
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    blog.category === "URL Shortening" 
                      ? "text-blue-400 bg-blue-500/10 border border-blue-500/30" 
                      : "text-purple-400 bg-purple-500/10 border border-purple-500/30"
                  }`}>
                    {blog.category}
                  </span>
                  <span className="text-xs text-white/40 font-mono">
                    {blog.readTime}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
                  {blog.title}
                </h2>

                <p className="text-white/60 leading-relaxed mb-6 text-sm line-clamp-3">
                  {blog.description}
                </p>

                <div className="flex items-center text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                  Read more
                  <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


