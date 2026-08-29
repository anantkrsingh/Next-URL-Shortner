"use client";

import { FiFileText } from "react-icons/fi";
import { useInvoices } from "@/hooks/useSubscription";

const STATUS_STYLES: Record<string, string> = {
  completed: "bg-green-500/20 text-green-200",
  pending: "bg-amber-500/20 text-amber-200",
  failed: "bg-red-500/20 text-red-200",
};

const PLAN_LABELS: Record<string, string> = {
  free: "Free",
  pro: "Pro",
  bulk: "Bulk & API",
  enterprise: "Enterprise",
};

export default function InvoicesSection() {
  const { data: invoices, isLoading } = useInvoices();

  return (
    <section className="glass-panel rounded-2xl p-6 sm:p-8">
      <h2 className="text-xl font-bold text-white">Invoices</h2>
      <p className="mt-1 text-sm text-white/60">
        Every checkout attempt, successful or not.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs font-semibold tracking-wide text-white/40 uppercase">
              <th className="py-2 pr-4">Date</th>
              <th className="py-2 pr-4">Plan</th>
              <th className="py-2 pr-4">Amount</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          {invoices && invoices.length > 0 && (
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-white/5 last:border-0">
                  <td className="py-3 pr-4 text-white/70">
                    {new Date(invoice.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 pr-4 text-white/70">
                    {PLAN_LABELS[invoice.plan] ?? invoice.plan}{" "}
                    <span className="text-white/40">· {invoice.billingCycle}</span>
                  </td>
                  <td className="py-3 pr-4 text-white/70">
                    ₹{(invoice.amount / 100).toLocaleString("en-IN")}
                  </td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                        STATUS_STYLES[invoice.status] ?? "bg-white/10 text-white/60"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>

        {!isLoading && invoices && invoices.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
              <FiFileText className="h-5 w-5 text-white/50" />
            </span>
            <p className="text-sm font-semibold text-white/70">No invoices yet</p>
            <p className="max-w-sm text-sm text-white/45">
              You&apos;re on the Free plan, so there&apos;s nothing to bill. Invoices
              will show up here automatically once you upgrade to a paid plan.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
