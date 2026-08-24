"use client";

import { useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa6";
import { useApiKey, useGenerateApiKey, useRevokeApiKey } from "@/hooks/useApiKey";

export default function ApiKeySection() {
  const { data: apiKey, isLoading } = useApiKey();
  const generateKey = useGenerateApiKey();
  const revokeKey = useRevokeApiKey();

  const [revealedKey, setRevealedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [confirmingRevoke, setConfirmingRevoke] = useState(false);

  const hasKey = Boolean(apiKey);

  const handleGenerate = async () => {
    setCopied(false);
    const result = await generateKey.mutateAsync();
    setRevealedKey(result.key);
  };

  const handleRevoke = async () => {
    await revokeKey.mutateAsync();
    setRevealedKey(null);
    setConfirmingRevoke(false);
  };

  const copyKey = async () => {
    if (!revealedKey) return;
    try {
      await navigator.clipboard.writeText(revealedKey);
    } catch {
      // ignore — the key is still selectable/visible in the box
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-2xl p-6 sm:p-8">
        <h2 className="text-xl font-bold text-white">API access</h2>
        <p className="mt-1 max-w-lg text-sm text-white/60">
          Generate a personal API key to shorten links directly to your
          account from scripts and apps.
        </p>

        {isLoading ? (
          <p className="mt-6 text-sm text-white/50">Loading…</p>
        ) : (
          <div className="mt-6 space-y-4">
            {revealedKey && (
              <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-4">
                <p className="text-sm font-semibold text-amber-200">
                  Copy your key now — you won&apos;t be able to see it again.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <code className="glass-input flex-1 overflow-x-auto px-3 py-2.5 text-sm break-all text-white">
                    {revealedKey}
                  </code>
                  <button
                    type="button"
                    onClick={copyKey}
                    className="glass-input shrink-0 p-2.5"
                    title="Copy"
                  >
                    {copied ? (
                      <FaCheck className="h-4 w-4 text-green-400" />
                    ) : (
                      <FaCopy className="h-4 w-4 text-white/80" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {hasKey && apiKey ? (
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <code className="text-sm text-white/80">{apiKey.maskedKey}</code>
                    <p className="mt-1 text-xs text-white/40">
                      Created {new Date(apiKey.createdAt).toLocaleDateString()}
                      {apiKey.lastUsedAt &&
                        ` · Last used ${new Date(apiKey.lastUsedAt).toLocaleDateString()}`}
                      {!apiKey.lastUsedAt && " · Never used"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleGenerate}
                      disabled={generateKey.isPending}
                      className="glass-input px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 disabled:opacity-60"
                    >
                      {generateKey.isPending ? "Regenerating…" : "Regenerate"}
                    </button>
                    {confirmingRevoke ? (
                      <button
                        type="button"
                        onClick={handleRevoke}
                        disabled={revokeKey.isPending}
                        className="rounded-xl bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-200 transition-colors hover:bg-red-500/30 disabled:opacity-60"
                      >
                        {revokeKey.isPending ? "Revoking…" : "Confirm revoke"}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmingRevoke(true)}
                        className="px-4 py-2 text-sm font-semibold text-red-300 hover:text-red-200"
                      >
                        Revoke
                      </button>
                    )}
                  </div>
                </div>
                {confirmingRevoke && (
                  <p className="mt-3 text-xs text-white/50">
                    Any script using this key will stop working immediately.{" "}
                    <button
                      type="button"
                      onClick={() => setConfirmingRevoke(false)}
                      className="text-blue-300 hover:text-blue-200"
                    >
                      Cancel
                    </button>
                  </p>
                )}
              </div>
            ) : (
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/60">You don&apos;t have an API key yet.</p>
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={generateKey.isPending}
                  className="glass-btn mt-4 px-5 py-2.5 text-sm font-semibold disabled:opacity-60"
                >
                  {generateKey.isPending ? "Generating…" : "Generate API key"}
                </button>
              </div>
            )}

            {generateKey.isError && (
              <p className="rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-200">
                {generateKey.error instanceof Error
                  ? generateKey.error.message
                  : "Could not generate a key."}
              </p>
            )}
          </div>
        )}
      </section>

      <section className="glass-panel rounded-2xl p-6 sm:p-8">
        <h2 className="text-lg font-bold text-white">Using your key</h2>
        <p className="mt-1 text-sm text-white/60">
          Pass it as a Bearer token on{" "}
          <code className="text-white/80">POST /api/shorten</code> and the
          short link is saved to your account, just like shortening while
          signed in. Leave the header off and it works exactly as it does
          today. A wrong or revoked key gets rejected with an error rather
          than falling back to anonymous.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl bg-black/40 p-4 text-xs text-white/80">
{`curl -X POST https://tinyur.in/api/shorten \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com/very-long-url"}'`}
        </pre>
      </section>
    </div>
  );
}
