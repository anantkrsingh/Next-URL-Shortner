"use client";

import { useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa";
import { CircularProgress } from "@mui/material";
import { analytics } from "../lib/firebase";
import { logEvent } from "firebase/analytics";
import Image from "next/image";
interface ShortUrlResponse {
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
}

export default function Short() {
  const [url, setUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [useCustomAlias, setUseCustomAlias] = useState(false);
  const [shortUrl, setShortUrl] = useState<ShortUrlResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl(null);

    try {
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

      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setShortUrl(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
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
              className="flex-1 min-h-[56px] h-[56px] px-4 bg-white/90 backdrop-blur-md border border-white/30 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="relative overflow-hidden w-full sm:w-auto sm:min-w-[120px] min-h-[56px] h-[56px] bg-blue-500 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="w-full min-h-[56px] h-[56px] px-4 bg-white/90 backdrop-blur-md border border-white/30 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
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
          <div className="mt-6 p-4 bg-white/90 backdrop-blur-md rounded-xl border border-white/30 flex items-center gap-3">
            <a
              className="flex-1 text-gray-900 font-medium hover:text-blue-600 truncate transition-colors"
              href={shortUrl.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortUrl.shortUrl}
            </a>
            <button
              onClick={copyToClipboard}
              className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              title="Copy"
            >
              {copied ? <FaCheck className="text-green-600" /> : <FaCopy className="text-gray-600" />}
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
