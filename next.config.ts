import type { NextConfig } from "next";

const movedBlogSlugs = [
  "how-url-shortners-work",
  "branded-links-guide",
  "url-shortening-best-practices",
  "white-hat-seo",
  "black-hat-seo",
  "white-hat-seo-vs-black-hat-seo",
  "react-vs-nextjs",
  "sql-vs-nosql",
  "symmetric-vs-asymmetric-encryption",
  "salting-and-hashing",
];

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return movedBlogSlugs.map((slug) => ({
      source: `/${slug}`,
      destination: `/blogs/${slug}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
