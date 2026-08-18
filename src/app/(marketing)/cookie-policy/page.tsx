import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy | TinyUR",
  description:
    "How TinyUR uses cookies and similar technologies, including Google AdSense advertising cookies.",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] md:p-12">
        <Link href="/" className="mb-6 inline-block font-medium text-blue-600 hover:text-blue-700">
          ← Back to Home
        </Link>

        <h1 className="mb-4 text-4xl font-bold text-gray-900">Cookie Policy</h1>
        <p className="mb-8 text-gray-600">Last updated: August 18, 2026</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">1. What are cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit a
              website. Similar technologies include pixels, local storage, and
              device identifiers. TinyUR uses these to run the site, remember
              preferences such as cookie consent, understand traffic, and (where
              applicable) display advertising.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">2. Cookies we use</h2>
            <ul className="ml-4 list-inside list-disc space-y-2">
              <li>
                <strong>Essential:</strong> needed for security, load balancing, and
                remembering that you accepted this notice.
              </li>
              <li>
                <strong>Analytics:</strong> help us understand which pages are used
                (for example Firebase Analytics where enabled).
              </li>
              <li>
                <strong>Advertising:</strong> Google AdSense and related Google
                services may set cookies to serve and measure ads, including
                personalized ads where allowed by law and your choices.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">3. Google AdSense</h2>
            <p className="mb-4">
              Third-party vendors, including Google, use cookies to serve ads based
              on a user&apos;s prior visits to this website or other websites. Google&apos;s
              use of advertising cookies enables it and its partners to serve ads
              based on your visit to this site and/or other sites on the Internet.
            </p>
            <p>
              You may opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Ads Settings
              </a>
              . You can also visit{" "}
              <a
                href="https://www.aboutads.info/choices/"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                aboutads.info/choices
              </a>{" "}
              to opt out of some third-party vendors&apos; use of cookies for
              personalized advertising.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">4. Managing cookies</h2>
            <p>
              Most browsers let you block or delete cookies. If you block all
              cookies, some features of TinyUR may not work correctly. Advertising
              partners may still serve non-personalized ads where required.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">5. More information</h2>
            <p>
              For how we handle personal data, read the{" "}
              <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
              . Questions:{" "}
              <a href="mailto:contact@tinyur.in" className="text-blue-600 hover:underline">
                contact@tinyur.in
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
