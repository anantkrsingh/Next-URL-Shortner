import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | TinyUR",
  description: "Privacy Policy for TinyUR URL Shortener - Learn how we protect your data and privacy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen px-4 py-12 pt-28">
      <div className="glass-panel glass-doc mx-auto max-w-4xl rounded-2xl p-8 md:p-12">
        <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium mb-6 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: August 18, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to TinyUR. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you about how we handle your data when you use our URL shortening service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you use TinyUR, we may collect the following information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>URLs that you shorten</li>
              <li>Custom aliases you create (if any)</li>
              <li>Click statistics for your shortened URLs</li>
              <li>Basic analytics data (timestamp of URL creation and clicks)</li>
              <li>IP addresses for security and fraud prevention purposes</li>
              <li>Device and browser information from cookies and similar technologies</li>
              <li>Contact details you send us (for example, if you email support)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>To provide and maintain our URL shortening service</li>
              <li>To track click statistics for shortened URLs</li>
              <li>To prevent abuse and ensure service security</li>
              <li>To improve our service and user experience</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Storage and Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your data against 
              unauthorized access, alteration, disclosure, or destruction. Your data is stored securely on 
              our servers and is retained only for as long as necessary to provide our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies, Analytics, and Advertising</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              TinyUR uses cookies and similar technologies as described in our{" "}
              <Link href="/cookie-policy" className="text-blue-600 hover:text-blue-700">
                Cookie Policy
              </Link>
              . We may use analytics to understand how the site is used.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This site displays advertisements served by Google AdSense. Google and its partners
              use cookies to serve and measure ads, including ads based on your visits to this
              site and other sites. We do not sell your personal information. Advertising partners
              process data under their own policies.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You can opt out of personalized Google ads at{" "}
              <a
                href="https://www.google.com/settings/ads"
                className="text-blue-600 hover:text-blue-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Ads Settings
              </a>
              . Additional opt-out tools are available at{" "}
              <a
                href="https://www.aboutads.info/choices/"
                className="text-blue-600 hover:text-blue-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                aboutads.info
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Third-Party Links</h2>
            <p className="text-gray-700 leading-relaxed">
              Our service allows you to shorten URLs that may link to third-party websites. We are not 
              responsible for the privacy practices or content of these external sites. We encourage you 
              to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Access the data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children&apos;s Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our service is not directed to children under the age of 13. We do not knowingly collect 
              personal information from children under 13. If you are a parent or guardian and believe 
              your child has provided us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date at the top 
              of this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="text-gray-700 mt-4">
              <strong>Email:</strong>{" "}
              <a href="mailto:contact@tinyur.in" className="text-blue-600 hover:text-blue-700">
                contact@tinyur.in
              </a>
              {" "}or use our{" "}
              <Link href="/contact" className="text-blue-600 hover:text-blue-700">
                Contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
