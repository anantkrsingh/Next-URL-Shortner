"use client";

import { useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa";
import { TextField, Button, CircularProgress } from "@mui/material";
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

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 p-6 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <TextField
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              label="Paste your URL here"
              variant="outlined"
              required
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.8)",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.6)",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "rgba(255, 255, 255, 0.8)",
                },
              }}
            />
            <Button
              type="submit"
              variant="outlined"
              disabled={loading}
              sx={{
                color: "white",
                borderColor: "rgba(255, 255, 255, 0.3)",
                "&:hover": {
                  borderColor: "rgba(255, 255, 255, 0.5)",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                "&.Mui-disabled": {
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  color: "rgba(255, 255, 255, 0.5)",
                },
                minWidth: "120px",
                height: "56px",
              }}
            >
              {loading ? <CircularProgress size={20} sx={{ color: "white" }} /> : "Shorten"}
            </Button>
          </div>

          {useCustomAlias && (
            <TextField
              type="text"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              label="Custom alias (optional)"
              variant="outlined"
              fullWidth
              inputProps={{
                pattern: "[a-zA-Z0-9_-]+",
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.8)",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.6)",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "rgba(255, 255, 255, 0.8)",
                },
              }}
            />
          )}

          <div className="flex items-center justify-between">
            <Button
              type="button"
              onClick={() => setUseCustomAlias(!useCustomAlias)}
              variant="text"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                },
                textTransform: "none",
                fontSize: "0.875rem",
              }}
            >
              {useCustomAlias ? "Hide" : "Add"} custom alias
            </Button>
          </div>
        </form>

        {shortUrl && (
          <div className="mt-4 p-3 bg-white/10 rounded-lg border border-white/20 flex items-center gap-2">
            <a
              className="flex-1 text-white underline hover:text-blue-200 truncate"
              href={shortUrl.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortUrl.shortUrl}
            </a>
            <Button
              onClick={copyToClipboard}
              variant="outlined"
              size="small"
              sx={{
                color: "white",
                borderColor: "rgba(255, 255, 255, 0.3)",
                minWidth: "auto",
                padding: "8px",
                "&:hover": {
                  borderColor: "rgba(255, 255, 255, 0.5)",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
              title="Copy"
            >
              {copied ? <FaCheck /> : <FaCopy />}
            </Button>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-500/20 border border-red-400/30 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}
      </div>
      <p className="mt-6 text-center text-white/70 text-sm max-w-xl mx-auto">
        TinyUR is a free tool to shorten URLs and generate short links. URL shortener allows to create a shortened link making it easy to share.
      </p>
    </div>
  );
}
