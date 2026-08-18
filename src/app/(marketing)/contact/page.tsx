import { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | TinyUR",
  description:
    "Contact TinyUR for support, privacy requests, abuse reports, or product questions. Email contact@tinyur.in.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen px-4 py-12 pt-28">
      <div className="glass-panel glass-doc mx-auto max-w-4xl rounded-2xl p-8 md:p-12">
        <Link href="/" className="mb-6 inline-block font-medium text-blue-600 hover:text-blue-700">
          ← Back to Home
        </Link>

        <h1 className="mb-4 text-4xl font-bold text-gray-900">Contact TinyUR</h1>
        <p className="mb-10 text-gray-600 leading-relaxed">
          Questions, feature ideas, privacy requests, or reports of abusive short
          links — we read every message. We typically reply within 1–2 business
          days (Monday–Friday).
        </p>

        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <div className="glass-panel rounded-xl p-5">
            <h2 className="mb-2 text-lg font-semibold text-gray-900">Email</h2>
            <a href="mailto:contact@tinyur.in" className="text-blue-600 hover:underline">
              contact@tinyur.in
            </a>
          </div>
          <div className="glass-panel rounded-xl p-5">
            <h2 className="mb-2 text-lg font-semibold text-gray-900">Hours</h2>
            <p className="text-gray-700">Monday–Friday, 9:00 AM – 6:00 PM IST</p>
          </div>
          <div className="glass-panel rounded-xl p-5">
            <h2 className="mb-2 text-lg font-semibold text-gray-900">Location</h2>
            <p className="text-gray-700">India</p>
          </div>
        </div>

        <h2 className="mb-4 text-2xl font-bold text-gray-900">Send a message</h2>
        <p className="mb-6 text-gray-600">
          Fill in the form and we will store your request. You can also email{" "}
          <a href="mailto:contact@tinyur.in" className="text-blue-600 hover:underline">
            contact@tinyur.in
          </a>
          .
        </p>

        <ContactForm />

        <section className="mt-14 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Common requests</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong className="text-gray-900">Remove a short link:</strong> Email
              the full tinyur.in URL and a short reason. We review abuse, malware,
              and copyright reports.
            </p>
            <p>
              <strong className="text-gray-900">Privacy:</strong> To access, correct,
              or delete personal data we may hold, email us from the address you
              used to contact us and describe the request. See the{" "}
              <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
            <p>
              <strong className="text-gray-900">API:</strong> Documentation lives on{" "}
              <Link href="/api-docs" className="text-blue-600 hover:underline">
                API Docs
              </Link>
              . For integration questions, include your use case in the email.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
