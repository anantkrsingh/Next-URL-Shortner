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

  return (
    <>
      {/* API Endpoints */}
      <div className="space-y-6 sm:space-y-8">
        {endpoints.map((endpoint, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">{endpoint.title}</h2>
                  <p className="text-white/70 mt-1 text-sm sm:text-base">{endpoint.description}</p>
                </div>
                <button
                  onClick={() => handleTryInBrowser(endpoint)}
                  className="bg-white/20 hover:bg-white/30 border border-white/30 text-white px-4 py-2 rounded-lg transition-colors text-sm w-full sm:w-auto"
                >
                  Try in Browser
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-white mb-3">Request</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="text-sm font-medium text-white/70">Method:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium w-fit ${
                        endpoint.method === 'POST' 
                          ? 'bg-blue-500/30 text-blue-200 border border-blue-400/30' 
                          : 'bg-green-500/30 text-green-200 border border-green-400/30'
                      }`}>
                        {endpoint.method}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="text-sm font-medium text-white/70">Endpoint:</span>
                      <code className="bg-white/10 text-white px-2 py-1 rounded text-xs sm:text-sm break-all border border-white/20">{endpoint.endpoint}</code>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="text-sm font-medium text-white/70">Base URL:</span>
                      <code className="bg-white/10 text-white px-2 py-1 rounded text-xs sm:text-sm break-all border border-white/20">https://tinyur.in</code>
                    </div>
                  </div>

                  {endpoint.parameters.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-white mb-2">Parameters</h4>
                      <div className="space-y-2">
                        {endpoint.parameters.map((param: Parameter, paramIndex: number) => (
                          <div key={paramIndex} className="bg-white/10 p-3 rounded border border-white/20">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <span className="font-medium text-sm text-white">{param.name}</span>
                              <div className="flex flex-wrap gap-1">
                                <span className="text-xs bg-white/20 text-white px-2 py-1 rounded border border-white/20">{param.type}</span>
                                {param.required && (
                                  <span className="text-xs bg-red-500/30 text-red-200 px-2 py-1 rounded border border-red-400/30">Required</span>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-white/70 mt-1">{param.description}</p>
                            <p className="text-xs text-white/60 mt-1 break-all">Example: {param.example}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {endpoint.method === "POST" && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-white mb-2">Request Body</h4>
                      <div className="bg-black/40 text-gray-100 p-3 sm:p-4 rounded-lg relative border border-white/20">
                        <button
                          onClick={() => copyToClipboard(JSON.stringify({ 
                            url: "https://example.com/very-long-url",
                            customAlias: "my-custom-alias"
                          }, null, 2))}
                          className="absolute top-2 right-2 bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded text-xs border border-white/20"
                        >
                          Copy
                        </button>
                        <pre className="text-xs sm:text-sm overflow-x-auto">
                          <code>{JSON.stringify({ 
                            url: "https://example.com/very-long-url",
                            customAlias: "my-custom-alias"
                          }, null, 2)}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-medium text-white mb-3">Response</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Success Response</h4>
                      <div className="bg-black/40 text-gray-100 p-3 sm:p-4 rounded-lg relative border border-white/20">
                        <button
                          onClick={() => copyToClipboard(JSON.stringify(endpoint.response.success, null, 2))}
                          className="absolute top-2 right-2 bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded text-xs border border-white/20"
                        >
                          Copy
                        </button>
                        <pre className="text-xs sm:text-sm overflow-x-auto">
                          <code>{JSON.stringify(endpoint.response.success, null, 2)}</code>
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Error Response</h4>
                      <div className="bg-black/40 text-gray-100 p-3 sm:p-4 rounded-lg relative border border-white/20">
                        <button
                          onClick={() => copyToClipboard(JSON.stringify(endpoint.response.error, null, 2))}
                          className="absolute top-2 right-2 bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded text-xs border border-white/20"
                        >
                          Copy
                        </button>
                        <pre className="text-xs sm:text-sm overflow-x-auto">
                          <code>{JSON.stringify(endpoint.response.error, null, 2)}</code>
                        </pre>
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center sm:justify-end z-50 p-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 w-full max-w-2xl h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto shadow-2xl rounded-lg sm:rounded-2xl">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white">Test API Endpoint</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white/70 hover:text-white p-1"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Endpoint
                  </label>
                  <input
                    type="text"
                    value={`https://tinyur.in${selectedEndpoint?.endpoint || ""}`}
                    readOnly
                    className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/10 text-white text-sm sm:text-base"
                  />
                </div>

                {selectedEndpoint?.method === "POST" && (
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Request Body (JSON)
                    </label>
                    <textarea
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-white/20 rounded-lg font-mono text-xs sm:text-sm bg-white/10 text-white"
                      placeholder="Enter JSON request body..."
                    />
                  </div>
                )}

                <button
                  onClick={handleTestRequest}
                  disabled={loading}
                  className="w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                >
                  {loading ? "Testing..." : "Test Request"}
                </button>

                {response && (
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Response
                    </label>
                    <div className="bg-black/40 text-gray-100 p-3 sm:p-4 rounded-lg border border-white/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs sm:text-sm font-medium text-white">
                          Status: <span className={response.status >= 200 && response.status < 300 ? "text-green-400" : "text-red-400"}>
                            {response.status}
                          </span>
                        </span>
                        <button
                          onClick={() => copyToClipboard(JSON.stringify(response, null, 2))}
                          className="bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded text-xs border border-white/20"
                        >
                          Copy
                        </button>
                      </div>
                      <pre className="text-xs sm:text-sm overflow-x-auto">
                        <code>{JSON.stringify(response, null, 2)}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
