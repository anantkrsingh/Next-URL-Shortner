"use client";

import { useState } from "react";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import { PLANS } from "@/lib/plans";

export default function SubscriptionSection() {
  const [yearly, setYearly] = useState(true);
  const currentPlanId = "free";

  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-2xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-wide text-white/40 uppercase">
              Current plan
            </p>
            <h2 className="mt-1 text-2xl font-bold text-white">Free</h2>
          </div>
          <Link prefetch={false}
            href="/contact"
            className="glass-input px-5 py-2.5 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Compare plans
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-white">Plans</h2>
          <div className="glass-panel flex items-center gap-1 rounded-full p-1">
            <button
              type="button"
              onClick={() => setYearly(true)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                yearly ? "bg-white/15 text-white" : "text-white/60"
              }`}
            >
              Yearly
            </button>
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                !yearly ? "bg-white/15 text-white" : "text-white/60"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((plan) => {
            const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
            const isCurrent = plan.id === currentPlanId;

            return (
              <div
                key={plan.id}
                className={`glass-panel relative flex flex-col rounded-2xl p-6 ${
                  plan.highlighted ? "ring-2 ring-blue-400/60" : ""
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 px-3 py-1 text-xs font-bold text-white">
                    Most popular
                  </span>
                )}

                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <p className="mt-1 text-sm text-white/60">{plan.tagline}</p>

                <div className="mt-4">
                  {plan.custom ? (
                    <p className="text-3xl font-bold text-white">Custom</p>
                  ) : (
                    <p className="text-3xl font-bold text-white">
                      ${price}
                      <span className="text-base font-normal text-white/50">/mo</span>
                    </p>
                  )}
                  <p className="mt-1 text-xs text-white/40">{plan.priceNote}</p>
                </div>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-white/75">
                      <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {isCurrent ? (
                  <span className="mt-6 block cursor-default rounded-xl bg-white/10 px-4 py-2.5 text-center font-semibold text-white/50">
                    Current plan
                  </span>
                ) : (
                  <Link prefetch={false}
                    href="/contact"
                    className="glass-btn mt-6 block px-4 py-2.5 text-center font-semibold"
                  >
                    {plan.cta}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-xs text-white/40">
          Pricing shown reflects TinyURL&apos;s publicly listed plans as a reference
          and may not exactly match live pricing.
        </p>
      </section>
    </div>
  );
}
