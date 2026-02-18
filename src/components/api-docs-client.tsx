"use client";

import { useState, useEffect } from "react";

interface ApiResponse {
  data?: unknown;
  error?: string;
  status: number;
}

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example: string;
}

interface EndpointResponse {
  success: Record<string, string>;
  error: Record<string, string>;
}

interface Endpoint {
  title: string;
  method: string;
  endpoint: string;
  description: string;
  parameters: Parameter[];
  response: EndpointResponse;
}

interface ApiDocsClientProps {
  endpoints: Endpoint[];
}

export function ThemeSwitcher() {
  // Theme switcher removed - using consistent dark theme
  return null;
}

export default function ApiDocsClient({ endpoints }: ApiDocsClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(null);
  const [requestBody, setRequestBody] = useState("");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTryInBrowser = (endpoint: Endpoint) => {
    setSelectedEndpoint(endpoint);
    setRequestBody(JSON.stringify({
      url: "https://google.com",
      customAlias: "my-custom-alias"
    }, null, 2));
    setResponse(null);
    setIsModalOpen(true);
  };

  const handleTestRequest = async () => {
    if (!selectedEndpoint) return;

    setLoading(true);
    setResponse(null);

    try {
      const url = selectedEndpoint.endpoint;
      const options: RequestInit = {
        method: selectedEndpoint.method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (selectedEndpoint.method === "POST" && requestBody) {
        options.body = requestBody;
      }

      const res = await fetch(url, options);
      const data = await res.json();

      setResponse({
        data,
        status: res.status,
        error: res.ok ? undefined : data.error || "Request failed"
      });
    } catch (error) {
      setResponse({
        data: null,
        status: 0,
        error: error instanceof Error ? error.message : "Network error"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      // Check if clipboard API is available
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback method for older browsers or non-HTTPS environments
        const textArea = document.createElement("textarea");
        textArea.value = text;
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
    }
  };

  // ... imports

  return (
    <>
      <style jsx global>{`
        .grain-button {
          background-image: url("/grain.png"), linear-gradient(135deg, #3b82f6, #8b5cf6);
          background-size: 100px 100px, 100% 100%;
          background-blend-mode: overlay, normal;
        }
        .grain-button:hover {
          background-image: url("/grain.png"), linear-gradient(135deg, #2563eb, #7c3aed);
        }
      `}</style>

      {/* API Endpoints */}
      <div className="space-y-6 sm:space-y-8">
        {endpoints.map((endpoint, index) => (
          <div key={index} className="bg-white rounded-2xl border border-gray-200 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] overflow-hidden transition-all hover:shadow-xl">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${endpoint.method === 'POST'
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-green-100 text-green-700 border border-green-200'
                      }`}>
                      {endpoint.method}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">{endpoint.title}</h2>
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{endpoint.description}</p>
                </div>
                <button
                  onClick={() => handleTryInBrowser(endpoint)}
                  className="relative overflow-hidden bg-blue-500 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg hover:bg-blue-600 transition-all active:scale-95 w-full sm:w-auto text-sm sm:text-base"
                >
                  <div 
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage: "url(/grain.png)",
                      backgroundSize: "200px 200px",
                      backgroundRepeat: "repeat"
                    }}
                  />
                  <span className="relative z-10">Try in Browser</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Request Section */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Request Details
                    </h3>

                    <div className="space-y-3">
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition-colors">
                        <span className="text-xs font-medium text-gray-500 block mb-1">ENDPOINT URL</span>
                        <code className="text-blue-600 font-mono text-sm break-all">
                          https://tinyur.in{endpoint.endpoint}
                        </code>
                      </div>
                    </div>
                  </div>

                  {endpoint.parameters.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Parameters</h4>
                      <div className="space-y-3">
                        {endpoint.parameters.map((param: Parameter, paramIndex: number) => (
                          <div key={paramIndex} className="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-sm font-bold text-gray-900">{param.name}</span>
                                <span className="text-[10px] bg-gray-200 text-gray-700 px-2 py-0.5 rounded border border-gray-300 uppercase tracking-wide">{param.type}</span>
                              </div>
                              {param.required && (
                                <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded border border-red-200 font-medium uppercase tracking-wide">Required</span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed mb-2">{param.description}</p>
                            <div className="text-xs text-gray-500 font-mono bg-white p-2 rounded border border-gray-200">
                              Example: {param.example}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {endpoint.method === "POST" && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Request Body</h4>
                      <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-300 shadow-inner group">
                        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                          <span className="text-xs text-gray-400 font-mono">JSON</span>
                          <button
                            onClick={() => copyToClipboard(JSON.stringify({
                              url: "https://example.com/very-long-url",
                              customAlias: "my-custom-alias"
                            }, null, 2))}
                            className="text-xs text-gray-400 hover:text-white transition-colors"
                          >
                            Copy
                          </button>
                        </div>
                        <div className="p-4 overflow-x-auto">
                          <pre className="text-xs sm:text-sm text-blue-300 font-mono">
                            <code>{JSON.stringify({
                              url: "https://example.com/very-long-url",
                              customAlias: "my-custom-alias"
                            }, null, 2)}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Response Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Response Details
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Success (200)</span>
                      </div>
                      <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-300 shadow-inner group">
                        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                          <span className="text-xs text-gray-400 font-mono">JSON</span>
                          <button
                            onClick={() => copyToClipboard(JSON.stringify(endpoint.response.success, null, 2))}
                            className="text-xs text-gray-400 hover:text-white transition-colors"
                          >
                            Copy
                          </button>
                        </div>
                        <div className="p-4 overflow-x-auto">
                          <pre className="text-xs sm:text-sm text-green-300 font-mono">
                            <code>{JSON.stringify(endpoint.response.success, null, 2)}</code>
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">Error</span>
                      </div>
                      <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-300 shadow-inner group">
                        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                          <span className="text-xs text-gray-400 font-mono">JSON</span>
                          <button
                            onClick={() => copyToClipboard(JSON.stringify(endpoint.response.error, null, 2))}
                            className="text-xs text-gray-400 hover:text-white transition-colors"
                          >
                            Copy
                          </button>
                        </div>
                        <div className="p-4 overflow-x-auto">
                          <pre className="text-xs sm:text-sm text-red-300 font-mono">
                            <code>{JSON.stringify(endpoint.response.error, null, 2)}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center sm:justify-end z-50">
          <div className="bg-[#0f0f0f] border-l border-white/10 w-full max-w-2xl h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <h2 className="text-xl font-bold text-white">Test API Endpoint</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white/50 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div>
                <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">
                  Target Endpoint
                </label>
                <div className="flex items-center gap-2 bg-black/40 p-3 rounded-lg border border-white/10 font-mono text-sm text-white">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${selectedEndpoint?.method === 'POST' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                    }`}>
                    {selectedEndpoint?.method}
                  </span>
                  <span>https://tinyur.in{selectedEndpoint?.endpoint}</span>
                </div>
              </div>

              {selectedEndpoint?.method === "POST" && (
                <div>
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">
                    Request Body
                  </label>
                  <textarea
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    rows={8}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-sm font-mono text-blue-100 focus:outline-none focus:border-blue-500/50 transition-colors"
                    placeholder="{ ... }"
                  />
                </div>
              )}

              <button
                onClick={handleTestRequest}
                disabled={loading}
                className="w-full grain-button text-white py-3 px-4 rounded-xl font-bold tracking-wide shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] border border-white/10"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending Request...
                  </span>
                ) : "Send Request"}
              </button>

              {response && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2 flex justify-between items-center">
                    <span>Response</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${response.status >= 200 && response.status < 300
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-red-500/10 text-red-400'
                      }`}>
                      STATUS: {response.status}
                    </span>
                  </label>
                  <div className="bg-[#0a0a0a] rounded-xl border border-white/10 shadow-inner overflow-hidden">
                    <div className="flex items-center justify-end px-3 py-1.5 bg-white/[0.03] border-b border-white/5">
                      <button
                        onClick={() => copyToClipboard(JSON.stringify(response, null, 2))}
                        className="text-xs text-white/40 hover:text-white transition-colors"
                      >
                        Copy JSON
                      </button>
                    </div>
                    <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-gray-300">
                      <code>{JSON.stringify(response, null, 2)}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
