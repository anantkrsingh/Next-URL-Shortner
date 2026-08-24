"use client";

import { useState } from "react";
import { FiGlobe, FiLock } from "react-icons/fi";

export default function DomainsSection({ onUpgrade }: { onUpgrade: () => void }) {
  const [domain, setDomain] = useState("");

  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-2xl p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">Branded domains</h2>
            <p className="mt-1 max-w-lg text-sm text-white/60">
              Use your own domain (e.g. go.yourbrand.com) instead of the shared
              TinyUR domain for every link you create.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/70">
            <FiLock className="h-3 w-3" /> Pro feature
          </span>
        </div>

        <div className="mt-6 flex max-w-lg flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="go.yourbrand.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            disabled
            className="w-full glass-input px-4 py-2.5 opacity-60"
          />
          <button
            type="button"
            disabled
            className="glass-btn shrink-0 px-5 py-2.5 font-semibold opacity-50"
            title="Upgrade to Pro to add a branded domain"
          >
            Add domain
          </button>
        </div>

        <button
          type="button"
          onClick={onUpgrade}
          className="mt-4 text-sm font-semibold text-blue-300 hover:text-blue-200"
        >
          Upgrade to Pro to unlock branded domains →
        </button>
      </section>

      <section className="glass-panel rounded-2xl p-6 sm:p-8">
        <h3 className="text-lg font-bold text-white">Preview</h3>
        <p className="mt-1 text-sm text-white/60">
          What a branded link looks like once a domain is connected.
        </p>
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <FiGlobe className="h-5 w-5 shrink-0 text-blue-300" />
          <div className="min-w-0">
            <p className="truncate font-semibold text-white">go.yourbrand.com/launch</p>
            <p className="truncate text-xs text-white/50">
              → https://yourbrand.com/2026/product-launch
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
