"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import QRCode from "qrcode";
import { FaCheck, FaCopy, FaDownload, FaQrcode } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import type { ShortUrlResponse } from "@/hooks/useShorten";

export default function ShortUrlResultCard({ result }: { result: ShortUrlResponse }) {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  // Generate the QR code once per link, client-side — no third-party QR
  // API call, so the destination URL never leaves the browser.
  useEffect(() => {
    let cancelled = false;

    QRCode.toDataURL(result.shortUrl, {
      width: 320,
      margin: 1,
      color: { dark: "#0b1220", light: "#ffffff" },
    })
      .then((dataUrl) => {
        if (!cancelled) setQrDataUrl(dataUrl);
      })
      .catch(() => {
        if (!cancelled) setQrDataUrl(null);
      });

    return () => {
      cancelled = true;
    };
  }, [result.shortUrl]);

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(result.shortUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = result.shortUrl;
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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `${result.shortCode}-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="glass-panel mt-6 overflow-hidden rounded-2xl">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
        <div className="min-w-0 flex-1">
          <a
            className="flex items-center gap-2 truncate text-lg font-bold text-white transition-colors hover:text-blue-200"
            href={result.shortUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="truncate">{result.shortUrl}</span>
            <FaExternalLinkAlt className="h-3 w-3 shrink-0 text-white/50" />
          </a>
          <p className="mt-1 truncate text-sm text-white/50">{result.originalUrl}</p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={copyToClipboard}
            className="glass-input flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            {copied ? (
              <FaCheck className="h-4 w-4 text-green-400" />
            ) : (
              <FaCopy className="h-4 w-4" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            type="button"
            onClick={() => setShowQr((v) => !v)}
            aria-expanded={showQr}
            className={`glass-input flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 ${
              showQr ? "bg-white/15" : ""
            }`}
          >
            <FaQrcode className="h-4 w-4" />
            QR code
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {showQr && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10"
          >
            <div className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:items-center sm:justify-center">
              <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-xl bg-white p-3 shadow-lg">
                {qrDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={qrDataUrl} alt={`QR code for ${result.shortUrl}`} className="h-full w-full" />
                ) : (
                  <div className="h-full w-full animate-pulse rounded-lg bg-gray-200" />
                )}
              </div>
              <div className="text-center sm:text-left">
                <p className="font-semibold text-white">Scan to open this link</p>
                <p className="mt-1 max-w-xs text-sm text-white/50">
                  Print it, share it, or drop it into a slide — it points straight to{" "}
                  {result.shortUrl}.
                </p>
                <button
                  type="button"
                  onClick={downloadQr}
                  disabled={!qrDataUrl}
                  className="glass-btn mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold disabled:opacity-50"
                >
                  <FaDownload className="h-3.5 w-3.5" />
                  Download PNG
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
