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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* API Docs and Blogs Links */}
      <div className="absolute top-4 right-4 flex gap-4 z-20 flex-wrap justify-end">
        <Link
          href="/"
          className="text-white hover:text-blue-300 text-shadow-md underline underline-offset-2 font-bold text-base sm:text-lg transition-colors"
        >
          Home
        </Link>
        <Link
          href="/api-docs"
          className="text-white hover:text-blue-300 text-shadow-md underline underline-offset-2 font-bold text-base sm:text-lg transition-colors"
        >
          API Docs
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl">
        <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 p-6 sm:p-8 shadow-lg">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
            Blogs
          </h1>
          <div className="space-y-4">
            {blogs.map((blog, index) => (
              <Link
                key={index}
                href={blog.href}
                className="block bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-2xl border border-white/20 p-5 sm:p-6 transition-all hover:border-white/30 hover:shadow-lg"
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                  {blog.title}
                </h2>
                <p className="text-sm sm:text-base text-white/80 mb-3">
                  {blog.description}
                </p>
                <p className="text-xs sm:text-sm text-white/60">
                  {blog.readTime}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <p className="mt-6 text-center text-white/70 text-sm max-w-xl mx-auto">
          Explore technical articles covering web development, security, databases, and more.
        </p>
      </div>
    </div>
  );
}


