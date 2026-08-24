"use client";

import { useState } from "react";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import { PLANS, type Plan } from "@/lib/plans";
import { useCurrentUser } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/useAuthStore";

function ctaFor(plan: Plan, signedIn: boolean): { label: string; href: string } {
  if (plan.custom) return { label: "Contact sales", href: "/contact" };
  if (!plan.payable) return { label: "Get started free", href: "/signup" };
  return {
    label: plan.cta,
    href: signedIn ? "/account" : "/signup",
  };
}

export default function PricingPlans() {
  useCurrentUser(); // populates the auth store so CTAs know where to send a visitor
  const user = useAuthStore((s) => s.user);
  const [yearly, setYearly] = useState(true);

  return (
    <div>
      <div className="mb-10 flex justify-center">
        <div className="glass-panel flex items-center gap-1 rounded-full p-1">
          <button
            type="button"
            onClick={() => setYearly(true)}
            className={`rounded-full px-5 py-1.5 text-sm font-semibold transition-colors ${
              yearly ? "bg-white/15 text-white" : "text-white/60"
            }`}
          >
            Yearly
          </button>
          <button
            type="button"
            onClick={() => setYearly(false)}
            className={`rounded-full px-5 py-1.5 text-sm font-semibold transition-colors ${
              !yearly ? "bg-white/15 text-white" : "text-white/60"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {PLANS.map((plan) => {
          const inrPrice = plan.inr ? (yearly ? plan.inr.yearly : plan.inr.monthly) : null;
          const cta = ctaFor(plan, Boolean(user));

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

              <h2 className="text-lg font-bold text-white">{plan.name}</h2>
              <p className="mt-1 text-sm text-white/60">{plan.tagline}</p>

              <div className="mt-4">
                {plan.custom ? (
                  <p className="text-3xl font-bold text-white">Custom</p>
                ) : inrPrice !== null ? (
                  <p className="text-3xl font-bold text-white">
                    ₹{inrPrice.toLocaleString("en-IN")}
                    <span className="text-base font-normal text-white/50">/mo</span>
                  </p>
                ) : (
                  <p className="text-3xl font-bold text-white">Free</p>
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

              <Link prefetch={false}
                href={cta.href}
                className="glass-btn mt-6 block px-4 py-2.5 text-center font-semibold"
              >
                {cta.label}
              </Link>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-center text-xs text-white/40">
        Feature lists are modeled on TinyURL&apos;s publicly listed plans, priced
        in INR. Checkout runs through PhonePe. Paid plans are refundable within
        48 hours — see the{" "}
        <Link prefetch={false} href="/refund-policy" className="text-blue-300 hover:text-blue-200">
          Refund Policy
        </Link>
        .
      </p>
    </div>
  );
}
