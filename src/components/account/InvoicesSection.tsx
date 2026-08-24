"use client";

import { FiFileText } from "react-icons/fi";

export default function InvoicesSection() {
  return (
    <section className="glass-panel rounded-2xl p-6 sm:p-8">
      <h2 className="text-xl font-bold text-white">Invoices</h2>
      <p className="mt-1 text-sm text-white/60">
        Billing history for your account will appear here.
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
        </table>

        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
            <FiFileText className="h-5 w-5 text-white/50" />
          </span>
          <p className="text-sm font-semibold text-white/70">No invoices yet</p>
          <p className="max-w-sm text-sm text-white/45">
            You&apos;re on the Free plan, so there&apos;s nothing to bill. Invoices will
            show up here automatically once you upgrade to a paid plan.
          </p>
        </div>
      </div>
    </section>
  );
}
