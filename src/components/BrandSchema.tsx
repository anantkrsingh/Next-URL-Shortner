export default function BrandSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://tinyur.in/#organization",
              name: "Tinyur",
              alternateName: "Tinyur URL Shortener",
              url: "https://tinyur.in",
              logo: "https://tinyur.in/icon.png",
              description: "Tinyur is a fast and secure URL shortener.",
              sameAs: [
                "https://instagram.com/tinyur_official",
                "https://linkedin.com/company/tinyur",
              ],
            },
            {
              "@type": "WebSite",
              "@id": "https://tinyur.in/#website",
              name: "Tinyur",
              alternateName: ["Tinyur URL Shortener", "tinyur.in"],
              url: "https://tinyur.in",
              publisher: { "@id": "https://tinyur.in/#organization" },
            },
            {
              "@type": "WebApplication",
              "@id": "https://tinyur.in/#webapplication",
              name: "Tinyur",
              url: "https://tinyur.in",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Any",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              publisher: { "@id": "https://tinyur.in/#organization" },
            },
          ],
        }),
      }}
    />
  );
}
