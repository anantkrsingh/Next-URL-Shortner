import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | TinyUR",
  description: "Terms of Service for TinyUR URL Shortener - Read our terms and conditions.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] p-8 md:p-12">
        <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium mb-6 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last updated: February 18, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using TinyUR, you accept and agree to be bound by the terms and provisions 
              of this agreement. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 leading-relaxed">
              TinyUR provides a free URL shortening service that allows users to create shortened versions 
              of long URLs. The service includes features such as custom aliases, click tracking, and URL 
              unshortening capabilities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Acceptable Use</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree not to use TinyUR to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Shorten URLs that link to illegal, harmful, or malicious content</li>
              <li>Distribute spam, malware, viruses, or other harmful software</li>
              <li>Engage in phishing, fraud, or other deceptive practices</li>
              <li>Violate intellectual property rights of others</li>
              <li>Harass, abuse, or harm other individuals</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to our systems</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Service Availability</h2>
            <p className="text-gray-700 leading-relaxed">
              We strive to maintain high availability of our service, but we do not guarantee uninterrupted 
              access. We reserve the right to modify, suspend, or discontinue the service at any time without 
              prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Content and Links</h2>
            <p className="text-gray-700 leading-relaxed">
              TinyUR is not responsible for the content of shortened URLs or the websites they link to. 
              Users are solely responsible for the URLs they shorten and share. We reserve the right to 
              remove or disable any shortened URL that violates these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              The TinyUR service, including its design, code, and branding, is protected by intellectual 
              property rights. You may not copy, modify, distribute, or reverse engineer any part of our 
              service without explicit permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              TinyUR is provided &quot;as is&quot; without warranties of any kind. We shall not be liable for any 
              damages arising from the use or inability to use our service, including but not limited to 
              direct, indirect, incidental, or consequential damages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify and hold harmless TinyUR and its operators from any claims, damages, 
              losses, or expenses arising from your use of the service or violation of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. API Usage</h2>
            <p className="text-gray-700 leading-relaxed">
              If you use our API, you agree to use it responsibly and not exceed reasonable rate limits. 
              We reserve the right to restrict or terminate API access for abuse or excessive usage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to terminate or suspend access to our service immediately, without prior 
              notice, for any reason, including breach of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We may modify these terms at any time. Continued use of the service after changes constitutes 
              acceptance of the modified terms. We will update the &quot;Last updated&quot; date at the top of this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These terms shall be governed by and construed in accordance with applicable laws, without 
              regard to conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-gray-700 mt-4">
              <strong>Email:</strong>{" "}
              <a href="mailto:kavachinnovation@gmail.com" className="text-blue-600 hover:text-blue-700">
                kavachinnovation@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
