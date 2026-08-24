"use client";

import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useClickCount } from "@/hooks/useClickCount";

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

export default function ClickCounter() {
  const [input, setInput] = useState("");
  const [validationError, setValidationError] = useState("");
  const clickCountMutation = useClickCount();

  const clickData = clickCountMutation.data ?? null;
  const loading = clickCountMutation.isPending;
  const error =
    validationError ||
    (clickCountMutation.error instanceof Error ? clickCountMutation.error.message : "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    const shortCode = extractShortCode(input);
    if (!shortCode) {
      setValidationError("Please enter a valid short code or URL");
      return;
    }
    clickCountMutation.mutate(shortCode);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 text-center drop-shadow-lg">
        Check Click Count
      </h1>
      <p className="text-white/90 text-center mb-8 text-base sm:text-lg drop-shadow-md">
        Track how many times your shortened link has been clicked
      </p>
      
      <div className="rounded-3xl p-4 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter short code or URL (e.g., abc123)"
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
                {loading ? <CircularProgress size={20} sx={{ color: "white" }} /> : "Check"}
              </span>
            </button>
          </div>
        </form>

        {clickData && (
          <div className="mt-6 space-y-4">
            <div className="glass-panel rounded-xl p-4">
              <div className="text-center">
                <div className="mb-2 text-5xl font-bold text-white">
                  {clickData.clicks}
                </div>
                <div className="mb-4 text-sm text-white/60">
                  Total Clicks
                </div>
              </div>
            </div>
            
            <div className="glass-panel space-y-2 rounded-xl p-4">
              <div>
                <span className="text-sm text-white/60">Short Code:</span>
                <div className="break-all font-mono text-white">
                  {clickData.shortCode}
                </div>
              </div>
              <div>
                <span className="text-sm text-white/60">Original URL:</span>
                <a
                  href={clickData.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block break-all text-blue-300 underline hover:text-blue-200"
                >
                  {clickData.originalUrl}
                </a>
              </div>
              <div>
                <span className="text-sm text-white/60">Created:</span>
                <div className="text-white">
                  {new Date(clickData.createdAt).toLocaleDateString("en-US", {
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
          <div className="mt-4 p-4 bg-red-500/90 backdrop-blur-md border border-red-400/50 rounded-xl text-white text-sm font-medium">
            {error}
          </div>
        )}
      </div>
      <p className="mt-6 text-center text-white/90 text-sm max-w-xl mx-auto drop-shadow-md">
        Enter a short code or full URL to check how many times the shortened link has been clicked.
      </p>
    </div>
  );
}

