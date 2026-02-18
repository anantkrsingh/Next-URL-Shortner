"use client";

import { useState } from "react";
import { CircularProgress } from "@mui/material";

interface ClickCountResponse {
  shortCode: string;
  clicks: number;
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

async function getClickCount(shortCode: string): Promise<ClickCountResponse> {
  const response = await fetch(`/api/clicks/${shortCode}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch click count");
  }
  
  return response.json();
}

export default function ClickCounter() {
  const [input, setInput] = useState("");
  const [clickData, setClickData] = useState<ClickCountResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setClickData(null);

    try {
      const shortCode = extractShortCode(input);
      if (!shortCode) {
        throw new Error("Please enter a valid short code or URL");
      }
      const data = await getClickCount(shortCode);
      setClickData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
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
                {loading ? <CircularProgress size={20} sx={{ color: "white" }} /> : "Check"}
              </span>
            </button>
          </div>
        </form>

        {clickData && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-white/90 backdrop-blur-md rounded-xl border border-white/30">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {clickData.clicks}
                </div>
                <div className="text-gray-600 text-sm mb-4">
                  Total Clicks
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white/90 backdrop-blur-md rounded-xl border border-white/30 space-y-2">
              <div>
                <span className="text-gray-600 text-sm">Short Code:</span>
                <div className="text-gray-900 font-mono break-all">
                  {clickData.shortCode}
                </div>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Original URL:</span>
                <a
                  href={clickData.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline break-all block mt-1"
                >
                  {clickData.originalUrl}
                </a>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Created:</span>
                <div className="text-gray-900">
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

