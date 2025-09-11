"use client";

import { useState, useEffect } from "react";

interface ApiResponse {
  data?: unknown;
  error?: string;
  status: number;
}

type Theme = "light" | "dark" | "system";

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
  const [theme, setTheme] = useState<Theme>("system");
  const [, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme || "system";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    if (newTheme === "system") {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(systemPrefersDark);
      if (systemPrefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    } else if (newTheme === "dark") {
      setIsDark(true);
      root.classList.add("dark");
    } else {
      setIsDark(false);
      root.classList.remove("dark");
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  return (
    <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1 w-full sm:w-auto">
      <button
        onClick={() => handleThemeChange("light")}
        className={`flex-1 sm:flex-none px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm transition-colors ${
          theme === "light" 
            ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm" 
            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        Light
      </button>
      <button
        onClick={() => handleThemeChange("dark")}
        className={`flex-1 sm:flex-none px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm transition-colors ${
          theme === "dark" 
            ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm" 
            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        Dark
      </button>
      <button
        onClick={() => handleThemeChange("system")}
        className={`flex-1 sm:flex-none px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm transition-colors ${
          theme === "system" 
            ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm" 
            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        System
      </button>
    </div>
  );
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
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">{endpoint.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm sm:text-base">{endpoint.description}</p>
                </div>
                <button
                  onClick={() => handleTryInBrowser(endpoint)}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm w-full sm:w-auto"
                >
                  Try in Browser
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-3">Request</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Method:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium w-fit ${
                        endpoint.method === 'POST' 
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' 
                          : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      }`}>
                        {endpoint.method}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Endpoint:</span>
                      <code className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-2 py-1 rounded text-xs sm:text-sm break-all">{endpoint.endpoint}</code>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Base URL:</span>
                      <code className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-2 py-1 rounded text-xs sm:text-sm break-all">https://tinyur.in</code>
                    </div>
                  </div>

                  {endpoint.parameters.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Parameters</h4>
                      <div className="space-y-2">
                        {endpoint.parameters.map((param: Parameter, paramIndex: number) => (
                          <div key={paramIndex} className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <span className="font-medium text-sm text-gray-900 dark:text-white">{param.name}</span>
                              <div className="flex flex-wrap gap-1">
                                <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-2 py-1 rounded">{param.type}</span>
                                {param.required && (
                                  <span className="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded">Required</span>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{param.description}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 break-all">Example: {param.example}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {endpoint.method === "POST" && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Request Body</h4>
                      <div className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg relative">
                        <button
                          onClick={() => copyToClipboard(JSON.stringify({ 
                            url: "https://example.com/very-long-url",
                            customAlias: "my-custom-alias"
                          }, null, 2))}
                          className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded text-xs hover:bg-gray-600"
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
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-3">Response</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Success Response</h4>
                      <div className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg relative">
                        <button
                          onClick={() => copyToClipboard(JSON.stringify(endpoint.response.success, null, 2))}
                          className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded text-xs hover:bg-gray-600"
                        >
                          Copy
                        </button>
                        <pre className="text-xs sm:text-sm overflow-x-auto">
                          <code>{JSON.stringify(endpoint.response.success, null, 2)}</code>
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Error Response</h4>
                      <div className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg relative">
                        <button
                          onClick={() => copyToClipboard(JSON.stringify(endpoint.response.error, null, 2))}
                          className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded text-xs hover:bg-gray-600"
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
        <div className="fixed inset-0 bg-black/20 bg-opacity-20 flex items-center justify-center sm:justify-end z-50 p-4">
          <div className="bg-white dark:bg-gray-800 w-full max-w-2xl h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto transition-colors shadow-2xl rounded-lg sm:rounded-none">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">Test API Endpoint</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Endpoint
                  </label>
                  <input
                    type="text"
                    value={`https://tinyur.in${selectedEndpoint?.endpoint || ""}`}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base"
                  />
                </div>

                {selectedEndpoint?.method === "POST" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Request Body (JSON)
                    </label>
                    <textarea
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-xs sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter JSON request body..."
                    />
                  </div>
                )}

                <button
                  onClick={handleTestRequest}
                  disabled={loading}
                  className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                >
                  {loading ? "Testing..." : "Test Request"}
                </button>

                {response && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Response
                    </label>
                    <div className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs sm:text-sm font-medium">
                          Status: <span className={response.status >= 200 && response.status < 300 ? "text-green-400" : "text-red-400"}>
                            {response.status}
                          </span>
                        </span>
                        <button
                          onClick={() => copyToClipboard(JSON.stringify(response, null, 2))}
                          className="bg-gray-700 text-white px-2 py-1 rounded text-xs hover:bg-gray-600"
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
