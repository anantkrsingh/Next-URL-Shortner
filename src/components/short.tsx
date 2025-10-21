"use client";

import { useState } from "react";
import CoolCheckbox from "./cool-checkbox";
import { FaCheck, FaLongArrowAltRight, FaSpinner } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { analytics } from "../lib/firebase";
import { logEvent } from "firebase/analytics";
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

  const pasteFromClipboard = async () => {
    try {
      // Check if clipboard API is available
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text && text.startsWith("http")) {
          setUrl(text);
        }
      } else {
        console.warn("Clipboard API not available for reading");
      }
    } catch (err) {
      console.error("Failed to paste:", err);
    }
  };

  return (
    <div className="max-w-4xl flex flex-1 justify-center items-center w-full relative z-10">
      <div className="bg-black/20 border border-dashed backdrop-blur-xl shadow-2xl border-white/60 p-8 lg:p-12 relative">
        {/* Top-left corner */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 5 5"
          className="absolute top-[-6px] left-[-6px] fill-white"
        >
          <path d="M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z"></path>
        </svg>
        {/* Top-right corner */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 5 5"
          className="absolute top-[-6px] right-[-6px] fill-white"
        >
          <path d="M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z"></path>
        </svg>
        {/* Bottom-left corner */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 5 5"
          className="absolute bottom-[-6px] left-[-6px] fill-white"
        >
          <path d="M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z"></path>
        </svg>
        {/* Bottom-right corner */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 5 5"
          className="absolute bottom-[-6px] right-[-6px] fill-white"
        >
          <path d="M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z"></path>
        </svg>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="url"
              className="block text-shadow-lg  text-lg font-semibold text-white mb-4"
            >
              Enter your URL to shorten
            </label>
            <div className="flex flex-row  gap-2">
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="URL to shorten"
                className="w-full px-6 py-4 text-md bg-black/40 border-1 border-white/30 focus:border-white rounded-xl  focus:rounded-2xl text-white placeholder-gray-300 outline-none transition-all duration-300 backdrop-blur-sm"
                required
              />
              {/* <button
                type="button"
                onClick={pasteFromClipboard}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-800 hover:bg-white/30 text-white rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/30 hover:border-white/50"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </button> */}
              <button
                type="submit"
                disabled={loading}
                className="px-6 bg-gray-800/20 hover:bg-white/30 text-white rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/30 hover:border-white/50"
              >
                {loading ? <FaSpinner /> : <FaLongArrowAltRight />}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <CoolCheckbox
              label="Use custom alias"
              checked={useCustomAlias}
              onToggle={(checked) => setUseCustomAlias(checked)}
            />
          </div>

          {shortUrl && (
            <div>
              <p className="flex items-center justify-left flex-wrap gap-1">
                Your shortened URL is ready!{" "}
                <a
                  className="text-white underline"
                  href={shortUrl.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {shortUrl.shortUrl}
                </a>
                <button
                  onClick={copyToClipboard}
                  className="px-6 text-white rounded-xl transition-all duration-200 "
                >
                  {copied ? <FaCheck /> : <FaCopy />}
                </button>
              </p>
            </div>
          )}

          {/* Custom Alias Input */}
          {useCustomAlias && (
            <div>
              <label
                htmlFor="customAlias"
                className="block text-shadow-lg text-lg font-semibold text-white mb-4"
              >
                Custom alias (optional)
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="customAlias"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value)}
                  placeholder="my-custom-alias"
                  className="w-full px-6 py-4 text-md bg-black/40 border-1 border-white/30 rounded-4xl text-white placeholder-gray-300 outline-none transition-all duration-300 backdrop-blur-sm"
                  pattern="[a-zA-Z0-9_-]+"
                  title="Only letters, numbers, hyphens, and underscores are allowed"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                  {customAlias.length}/50
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-300">
                Only letters, numbers, hyphens, and underscores. 3-50
                characters.
              </p>
            </div>
          )}
        </form>

        {/* Error Display */}
        {error && (
          <div className="mt-8 p-6 bg-red-500/20 border border-red-400/30 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-red-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-200 text-lg">{error}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
