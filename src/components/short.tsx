"use client";

import { useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa";
import { CircularProgress } from "@mui/material";
import { analytics } from "../lib/firebase";
import { logEvent } from "firebase/analytics";
import { useShortenUrl } from "@/hooks/useShorten";

export default function Short() {
  const [url, setUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [useCustomAlias, setUseCustomAlias] = useState(false);
  const [copied, setCopied] = useState(false);

  const shortenMutation = useShortenUrl();
  const shortUrl = shortenMutation.data ?? null;
  const loading = shortenMutation.isPending;
  const error =
    shortenMutation.error instanceof Error ? shortenMutation.error.message : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestBody: { url: string; customAlias?: string } = { url };
    if (useCustomAlias && customAlias.trim()) {
      requestBody.customAlias = customAlias.trim();
    }

    // Add analytics
    if (analytics) {
      logEvent(analytics, "short_url_created", {
        url,
        customAlias,
        useCustomAlias,
      });
    }

    shortenMutation.mutate(requestBody);
  };

  const copyToClipboard = async () => {
    if (shortUrl) {
      try {
        // Check if clipboard API is available
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(shortUrl.shortUrl);
        } else {
          // Fallback method for older browsers or non-HTTPS environments
          const textArea = document.createElement("textarea");
          textArea.value = shortUrl.shortUrl;
          textArea.style.position = "fixed";
          textArea.style.left = "-999999px";
          textArea.style.top = "-999999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
        // Still show copied state even if there was an error
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 text-center drop-shadow-lg">
        Shorten Your URL
      </h1>
      <p className="text-white/90 text-center mb-8 text-base sm:text-lg drop-shadow-md">
        Fast, free, and privacy-friendly URL shortening
      </p>
      
      <div className="rounded-3xl p-4 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your URL here"
              required
              className="glass-input flex-1 min-h-[56px] h-[56px] px-4"
            />
            <button
              type="submit"
              disabled={loading}
              className="glass-btn relative overflow-hidden w-full sm:w-auto sm:min-w-[120px] min-h-[56px] h-[56px] font-semibold disabled:opacity-50"
            >
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: "url(/grain.png)",
                  backgroundSize: "200px 200px",
                  backgroundRepeat: "repeat"
                }}
              />
              <span className="relative z-10">
                {loading ? <CircularProgress size={20} sx={{ color: "white" }} /> : "Shorten"}
              </span>
            </button>
          </div>

          {useCustomAlias && (
            <input
              type="text"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              placeholder="Custom alias (optional)"
              pattern="[a-zA-Z0-9_-]+"
              className="glass-input w-full min-h-[56px] h-[56px] px-4"
            />
          )}

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setUseCustomAlias(!useCustomAlias)}
              className="text-white hover:text-blue-200 font-medium text-sm transition-colors drop-shadow-md"
            >
              {useCustomAlias ? "Hide" : "Use"} custom alias
            </button>
          </div>
        </form>

        {shortUrl && (
          <div className="glass-panel mt-6 flex items-center gap-3 rounded-xl p-4">
            <a
              className="flex-1 truncate font-medium text-white hover:text-blue-200 transition-colors"
              href={shortUrl.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortUrl.shortUrl}
            </a>
            <button
              onClick={copyToClipboard}
              className="glass-input p-2"
              title="Copy"
            >
              {copied ? <FaCheck className="text-green-400" /> : <FaCopy className="text-white/80" />}
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-500/90 backdrop-blur-md border border-red-400/50 rounded-xl text-white text-sm font-medium">
            {error}
          </div>
        )}
      </div>

      <p className="mt-6 text-center text-white/90 text-sm max-w-xl mx-auto drop-shadow-md">
        TinyUR is a free tool to shorten URLs and generate short links. URL shortener allows to create a shortened link making it easy to share.
      </p>
      
    </div>
  );
}
