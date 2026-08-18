"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "tinyur-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="fixed bottom-0 left-0 right-0 z-[60] border-t border-gray-200 bg-white p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] md:p-5"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-relaxed text-gray-700">
          We use cookies and similar technologies, including Google AdSense, to
          operate this site, measure usage, and show relevant ads. See our{" "}
          <Link href="/privacy-policy" className="font-semibold text-blue-600 hover:underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/cookie-policy" className="font-semibold text-blue-600 hover:underline">
            Cookie Policy
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
