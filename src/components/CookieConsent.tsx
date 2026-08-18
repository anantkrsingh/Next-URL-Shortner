"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

const STORAGE_KEY = "tinyur-cookie-consent";
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
}

function getSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "accepted";
  } catch {
    return true;
  }
}

function getServerSnapshot() {
  return false;
}

export default function CookieConsent() {
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* ignore */
    }
    emit();
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="fixed right-4 bottom-4 left-4 z-[60] rounded-2xl border border-white/15 bg-[#060814]/70 p-4 shadow-2xl backdrop-blur-2xl md:right-6 md:bottom-6 md:left-6 md:p-5"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-relaxed text-white/80">
          We use cookies and similar technologies, including Google AdSense, to
          operate this site, measure usage, and show relevant ads. See our{" "}
          <Link href="/privacy-policy" className="font-semibold text-blue-300 hover:underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/cookie-policy" className="font-semibold text-blue-300 hover:underline">
            Cookie Policy
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="glass-btn shrink-0 px-5 py-2.5 text-sm font-semibold"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
