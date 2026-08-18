const faqs = [
  {
    q: "Is TinyUR free to use?",
    a: "Yes. TinyUR is free to use for personal, educational, and business sharing. You can shorten unlimited links from the homepage without creating an account. The service is supported in part by advertising, which helps keep core features free.",
  },
  {
    q: "How do I create a custom short link?",
    a: "Paste your long URL, enable the custom alias option, and enter a short name such as my-campaign. If that alias is available, your link will be tinyur.in/my-campaign. Aliases may include letters, numbers, and hyphens.",
  },
  {
    q: "Do shortened URLs expire?",
    a: "Links remain active indefinitely unless they are removed for abuse, malware, phishing, or other Terms of Service violations. If you need a link taken down, email contact@tinyur.in with the short code.",
  },
  {
    q: "Can I track clicks on my short links?",
    a: "Yes. Use the URL Click Counter tool with your short code to see how many times a TinyUR link has been visited. This is useful for campaigns, bios, and print materials.",
  },
  {
    q: "Is TinyUR safe to use?",
    a: "TinyUR runs over HTTPS. We prohibit phishing, malware, spam, and other harmful uses. You can preview a destination with the Unshorten tool before opening a short link.",
  },
  {
    q: "Do I need an account?",
    a: "No account is required to shorten a URL, unshorten a link, or check click counts. A developer API is also available for integrations.",
  },
  {
    q: "Can I use TinyUR for WhatsApp, Instagram, or email?",
    a: "Yes. Short links are designed for places where long URLs wrap, look messy, or hit character limits — including WhatsApp, Instagram bios, email, SMS, and print.",
  },
  {
    q: "How do I contact TinyUR?",
    a: "Visit the Contact page or email contact@tinyur.in. We typically respond within 1–2 business days.",
  },
];

export default function HomeSections() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="bg-gray-50 py-16 px-4">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 md:text-4xl">
            Why Choose TinyUR?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
            A free URL shortener with custom aliases, click counts, an unshorten
            preview, and a public API — built for sharing on the web and in apps.
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Feature
              color="bg-blue-500"
              title="Lightning Fast"
              body="Shorten URLs instantly and redirect visitors quickly. Built for everyday sharing without extra steps."
            />
            <Feature
              color="bg-green-500"
              title="HTTPS & Privacy-Minded"
              body="Links are served over HTTPS. We do not sell your personal data. Advertising partners may use cookies as described in our policies."
            />
            <Feature
              color="bg-purple-500"
              title="Custom Aliases"
              body="Create memorable short links that match a campaign, product, or brand instead of a random string."
            />
            <Feature
              color="bg-orange-500"
              title="Click Analytics"
              body="Track how many times a shortened link has been clicked using the built-in click counter."
            />
            <Feature
              color="bg-red-500"
              title="Developer API"
              body="Integrate URL shortening into your apps with a simple REST API. Docs are available on the site."
            />
            <Feature
              color="bg-indigo-500"
              title="Always Free Core Tools"
              body="Shorten, unshorten, and count clicks at no charge. No premium paywall for the basic workflow."
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 md:text-4xl">
            Shorten a URL in 3 steps
          </h2>
          <p className="mb-12 text-center text-gray-600">
            No account required. Paste, optionally customize, then copy and share.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            <Step
              n="1"
              title="Paste your long URL"
              body="Copy any https link from a browser, app, or document and paste it into the box above."
            />
            <Step
              n="2"
              title="Add a custom alias (optional)"
              body="Choose a short name so people remember tinyur.in/your-name instead of a random code."
            />
            <Step
              n="3"
              title="Copy and share"
              body="Copy the short URL and send it on WhatsApp, Instagram, email, SMS, or print it on a flyer."
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
            What is a URL shortener?
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              A URL shortener turns a long web address into a compact link that is
              easier to share. Product pages, tracking parameters, and nested
              folders often produce URLs that wrap in messages or look untrustworthy.
              A short link like tinyur.in/demo is simpler to paste into chat, a
              profile bio, or a printed QR-adjacent call to action.
            </p>
            <p>
              TinyUR is a free URL shortener for India and worldwide users. You can
              create a short link without signing up, optionally pick a custom
              alias, check click counts, and preview a destination with Unshorten
              before you open it. Developers can call the public API to create
              short links from their own products.
            </p>
            <p>
              Common uses include WhatsApp broadcasts, Instagram bios (one clean
              link), email campaigns that should not break across lines, SMS
              character limits, YouTube descriptions, and offline materials such as
              business cards and posters.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
            Popular ways people use TinyUR
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <UseCase
              title="WhatsApp & messaging"
              body="Keep group chats and broadcasts readable. Short links are easier to tap and look more professional than a wrapped URL."
            />
            <UseCase
              title="Instagram bio"
              body="You only get one bio link. A custom alias is easier to remember and can point to a landing page you control."
            />
            <UseCase
              title="Email & newsletters"
              body="Long URLs often wrap in email clients. Short links stay on one line and are simpler to track with click counts."
            />
            <UseCase
              title="Print & offline"
              body="Put a typeable short URL on flyers, banners, and visiting cards so people can reach you without scanning a QR code."
            />
            <UseCase
              title="YouTube & video"
              body="Share product, affiliate, or resource links in descriptions and comments without pasting a full query string."
            />
            <UseCase
              title="SMS campaigns"
              body="Every character counts in SMS. A short domain plus alias fits more message text around the link."
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 md:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mb-10 text-center text-gray-600">
            Quick answers about TinyUR, short links, and how the service works.
          </p>
          <div className="space-y-3">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-gray-200 bg-white px-5 py-4"
              >
                <summary className="cursor-pointer list-none font-semibold text-gray-900">
                  {item.q}
                </summary>
                <p className="mt-3 text-gray-600 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Feature({
  color,
  title,
  body,
}: {
  color: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]">
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${color}`}>
        <span className="text-lg font-bold text-white">{title.charAt(0)}</span>
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600">{body}</p>
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
      <div className="mb-3 text-3xl font-black text-blue-600">{n}</div>
      <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600">{body}</p>
    </div>
  );
}

function UseCase({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
      <h3 className="mb-2 text-lg font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600">{body}</p>
    </div>
  );
}
