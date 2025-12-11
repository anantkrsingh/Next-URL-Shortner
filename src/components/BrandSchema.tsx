export default function BrandSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Tinyur",
          alternateName: "Tinyur URL Shortener",
          url: "https://tinyur.in",
          logo: "https://tinyur.in/icon.png",
          description: "Tinyur is a fast and secure URL shortener.",
          sameAs: [
            "https://instagram.com/tinyur_official",
            "https://linkedin.com/company/tinyur",
          ],
        }),
      }}
    />
  );
}
