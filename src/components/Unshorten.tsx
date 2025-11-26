"use client";

import { useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { FaExternalLinkAlt } from "react-icons/fa";

interface UnshortenResponse {
  shortCode: string;
  originalUrl: string;
  createdAt: string;
}

function extractShortCode(input: string): string {
  const trimmed = input.trim();
  
  // If it's a URL, extract the short code from the path
  try {
    const url = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
    const pathParts = url.pathname.split('/').filter(part => part.length > 0);
    
    // Get the last non-empty part of the path
    if (pathParts.length > 0) {
      return pathParts[pathParts.length - 1];
    }
  } catch {
    // If URL parsing fails, check if it's a path starting with /
    if (trimmed.startsWith('/')) {
      const pathParts = trimmed.split('/').filter(part => part.length > 0);
      if (pathParts.length > 0) {
        return pathParts[pathParts.length - 1];
      }
    }
  }
  
  // If it's not a URL, assume it's already a short code
  return trimmed;
}

async function getOriginalUrl(shortCode: string): Promise<UnshortenResponse> {
  const response = await fetch(`/api/unshorten/${shortCode}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch original URL");
  }
  
  return response.json();
}

export default function Unshorten() {
  const [input, setInput] = useState("");
  const [urlData, setUrlData] = useState<UnshortenResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUrlData(null);

    try {
      const shortCode = extractShortCode(input);
      if (!shortCode) {
        throw new Error("Please enter a valid short code or URL");
      }
      const data = await getOriginalUrl(shortCode);
      setUrlData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Unshorten URL
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2 flex-col sm:flex-row">
            <TextField
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              label="Enter short code or URL"
              variant="outlined"
              required
              fullWidth
              placeholder="e.g., abc123 or https://tinyur.in/abc123"
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
                minWidth: { xs: "100%", sm: "120px" },
                height: "56px",
              }}
            >
              {loading ? (
                <CircularProgress size={20} sx={{ color: "white" }} />
              ) : (
                "Unshorten"
              )}
            </Button>
          </div>
        </form>

        {urlData && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-white/10 rounded-lg border border-white/20">
              <div className="text-center mb-4">
                <div className="text-white/70 text-sm mb-2">Original URL</div>
                <div className="text-lg font-semibold text-white break-all">
                  {urlData.originalUrl}
                </div>
              </div>
              <div className="flex justify-center">
                <a
                  href={urlData.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-lg text-blue-300 hover:text-blue-200 transition-colors"
                >
                  <span>Visit URL</span>
                  <FaExternalLinkAlt className="text-sm" />
                </a>
              </div>
            </div>
            
            <div className="p-4 bg-white/10 rounded-lg border border-white/20 space-y-2">
              <div>
                <span className="text-white/70 text-sm">Short Code:</span>
                <div className="text-white font-mono break-all">
                  {urlData.shortCode}
                </div>
              </div>
              <div>
                <span className="text-white/70 text-sm">Created:</span>
                <div className="text-white">
                  {new Date(urlData.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-500/20 border border-red-400/30 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}
      </div>
      <p className="mt-6 text-center text-white/70 text-sm max-w-xl mx-auto">
        Enter a short code or full URL to see the original destination URL before clicking.
      </p>
    </div>
  );
}

