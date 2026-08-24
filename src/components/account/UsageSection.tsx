"use client";

import Link from "next/link";
import { useUsage } from "@/hooks/useAccount";

export default function UsageSection() {
  const { data: usage, isError } = useUsage();

  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-4 text-xl font-bold text-white">Account usage</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Total links" value={usage?.totalLinks} />
          <StatCard label="Total clicks" value={usage?.totalClicks} />
          <StatCard label="Links this month" value={usage?.linksThisMonth} />
        </div>
        {isError && (
          <p className="mt-4 rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-200">
            Could not load usage right now.
          </p>
        )}
      </section>

      <section className="glass-panel rounded-2xl p-6 sm:p-8">
        <h3 className="text-lg font-bold text-white">Recent links</h3>
        <p className="mt-1 text-sm text-white/60">Your most recently created short links.</p>

        {usage && usage.recentLinks.length === 0 && (
          <p className="mt-6 text-sm text-white/50">
            You haven&apos;t created any short links yet.
          </p>
        )}

        {usage && usage.recentLinks.length > 0 && (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs font-semibold tracking-wide text-white/40 uppercase">
                  <th className="py-2 pr-4">Short link</th>
                  <th className="py-2 pr-4">Destination</th>
                  <th className="py-2 pr-4">Clicks</th>
                  <th className="py-2">Created</th>
                </tr>
              </thead>
              <tbody>
                {usage.recentLinks.map((link) => (
                  <tr key={link.id} className="border-b border-white/5 last:border-0">
                    <td className="py-3 pr-4 font-semibold text-blue-200">
                      <Link prefetch={false} href={`/${link.shortCode}`} target="_blank">
                        /{link.shortCode}
                      </Link>
                    </td>
                    <td className="max-w-[220px] truncate py-3 pr-4 text-white/70">
                      {link.originalUrl}
                    </td>
                    <td className="py-3 pr-4 text-white/70">{link.clicks}</td>
                    <td className="py-3 text-white/50">
                      {new Date(link.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number | undefined }) {
  return (
    <div className="glass-panel rounded-2xl p-5">
      <p className="text-xs font-semibold tracking-wide text-white/40 uppercase">{label}</p>
      <p className="mt-2 text-3xl font-bold text-white">{value ?? "—"}</p>
    </div>
  );
}
