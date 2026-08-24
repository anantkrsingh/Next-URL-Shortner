"use client";

import { useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { AnimatePresence, motion } from "motion/react";
import { FaCheck, FaCopy, FaQrcode } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/useAuthStore";
import { useUsage } from "@/hooks/useAccount";
import { useRecentLinks } from "@/hooks/useRecentLinks";

export default function RecentLinksSection() {
  useCurrentUser(); // ensures the auth store is populated regardless of mount order
  const user = useAuthStore((s) => s.user);

  const usageQuery = useUsage({ enabled: Boolean(user) });
  const { links: localLinks, loaded: localLoaded } = useRecentLinks();

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [expandedCode, setExpandedCode] = useState<string | null>(null);
  const [qrCache, setQrCache] = useState<Record<string, string>>({});

  const rows = user
    ? (usageQuery.data?.recentLinks ?? []).map((link) => ({
        shortCode: link.shortCode,
        shortUrl: `${typeof window !== "undefined" ? window.location.origin : ""}/${link.shortCode}`,
        originalUrl: link.originalUrl,
        createdAt: link.createdAt,
      }))
    : localLinks;

  const isLoading = user ? usageQuery.isLoading : !localLoaded;

  if (!isLoading && rows.length === 0) return null;

  const copyLink = async (shortUrl: string, shortCode: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shortUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = shortUrl;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    } finally {
      setCopiedCode(shortCode);
      setTimeout(() => setCopiedCode((c) => (c === shortCode ? null : c)), 2000);
    }
  };

  const toggleQr = (shortUrl: string, shortCode: string) => {
    setExpandedCode((prev) => (prev === shortCode ? null : shortCode));

    if (!qrCache[shortCode]) {
      QRCode.toDataURL(shortUrl, {
        width: 240,
        margin: 1,
        color: { dark: "#0b1220", light: "#ffffff" },
      })
        .then((dataUrl) => setQrCache((prev) => ({ ...prev, [shortCode]: dataUrl })))
        .catch(() => {
          // Leave it unset — the panel just keeps its loading placeholder.
        });
    }
  };

  return (
    <div className="glass-panel mt-6 rounded-2xl p-5 sm:p-6">
      <h2 className="mb-4 text-lg font-bold text-white">Your Recent Links</h2>

      {isLoading ? (
        <p className="text-sm text-white/50">Loading…</p>
      ) : (
        <ul className="space-y-3">
          {rows.map((link) => (
            <li
              key={link.shortCode}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <a
                    href={link.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 truncate font-semibold text-white hover:text-blue-200"
                  >
                    <span className="truncate">{link.shortUrl}</span>
                    <FaExternalLinkAlt className="h-3 w-3 shrink-0 text-white/50" />
                  </a>
                  <p className="truncate text-sm text-white/50">{link.originalUrl}</p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => copyLink(link.shortUrl, link.shortCode)}
                    className="glass-input p-2"
                    title="Copy"
                  >
                    {copiedCode === link.shortCode ? (
                      <FaCheck className="h-4 w-4 text-green-400" />
                    ) : (
                      <FaCopy className="h-4 w-4 text-white/80" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleQr(link.shortUrl, link.shortCode)}
                    aria-expanded={expandedCode === link.shortCode}
                    className={`glass-input p-2 ${
                      expandedCode === link.shortCode ? "bg-white/15" : ""
                    }`}
                    title="QR code"
                  >
                    <FaQrcode className="h-4 w-4 text-white/80" />
                  </button>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {expandedCode === link.shortCode && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden border-t border-white/10"
                  >
                    <div className="flex items-center gap-4 p-4">
                      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-white p-2">
                        {qrCache[link.shortCode] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={qrCache[link.shortCode]}
                            alt={`QR code for ${link.shortUrl}`}
                            className="h-full w-full"
                          />
                        ) : (
                          <div className="h-full w-full animate-pulse rounded bg-gray-200" />
                        )}
                      </div>
                      {qrCache[link.shortCode] && (
                        <a
                          href={qrCache[link.shortCode]}
                          download={`${link.shortCode}-qr.png`}
                          className="text-sm font-semibold text-blue-300 hover:text-blue-200"
                        >
                          Download PNG
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      )}

      {!user && localLoaded && localLinks.length > 0 && (
        <p className="mt-4 text-xs text-white/40">
          Saved on this device only.{" "}
          <Link prefetch={false} href="/signup" className="text-blue-300 hover:text-blue-200">
            Create an account
          </Link>{" "}
          to keep your links anywhere you sign in.
        </p>
      )}
    </div>
  );
}
