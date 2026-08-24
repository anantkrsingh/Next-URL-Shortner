"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import { PLANS, yearlyTotal, type BillingCycle, type Plan } from "@/lib/plans";
import { useSubscription } from "@/hooks/useSubscription";
import BillingDetailsModal from "./BillingDetailsModal";

const PAYMENT_BANNERS: Record<string, { tone: "success" | "error" | "pending"; text: string }> = {
  success: { tone: "success", text: "Payment received — your plan is now active." },
  failed: { tone: "error", text: "That payment didn't go through. No charge was made." },
  pending: { tone: "pending", text: "Your payment is still processing. This can take a minute." },
  error: { tone: "error", text: "Something went wrong starting checkout. Please try again." },
};

export default function SubscriptionSection() {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("payment");
  const banner = paymentStatus ? PAYMENT_BANNERS[paymentStatus] : null;

  const [yearly, setYearly] = useState(true);
  const [checkoutPlan, setCheckoutPlan] = useState<Plan | null>(null);

  const { data: subscription, isLoading: subscriptionLoading } = useSubscription();
  const currentPlanId = subscription?.plan ?? "free";
  const billingCycle: BillingCycle = yearly ? "yearly" : "monthly";

  return (
    <div className="space-y-6">
      {banner && (
        <div
          className={`rounded-xl px-4 py-3 text-sm ${
            banner.tone === "success"
              ? "bg-green-500/20 text-green-200"
              : banner.tone === "pending"
                ? "bg-amber-500/20 text-amber-200"
                : "bg-red-500/20 text-red-200"
          }`}
        >
          {banner.text}
        </div>
      )}

      <section className="glass-panel rounded-2xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-wide text-white/40 uppercase">
              Current plan
            </p>
            <h2 className="mt-1 text-2xl font-bold text-white capitalize">
              {subscriptionLoading ? "…" : currentPlanId === "bulk" ? "Bulk & API" : currentPlanId}
            </h2>
            {subscription?.currentPeriodEnd && (
              <p className="mt-1 text-xs text-white/50">
                Renews {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
              </p>
            )}
          </div>
          <Link prefetch={false}
            href="/contact"
            className="glass-input px-5 py-2.5 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Talk to sales
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
            const inrPrice = plan.inr ? (yearly ? plan.inr.yearlyMonthly : plan.inr.monthly) : null;
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
                  ) : inrPrice !== null ? (
                    <p className="text-3xl font-bold text-white">
                      ₹{inrPrice.toLocaleString("en-IN")}
                      <span className="text-base font-normal text-white/50">/mo</span>
                    </p>
                  ) : (
                    <p className="text-3xl font-bold text-white">Free</p>
                  )}
                  <p className="mt-1 text-xs text-white/40">
                    {plan.inr
                      ? yearly
                        ? `billed ₹${yearlyTotal(plan)!.toLocaleString("en-IN")} once a year`
                        : "billed monthly"
                      : plan.priceNote}
                  </p>
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
                ) : plan.payable ? (
                  <button
                    type="button"
                    onClick={() => setCheckoutPlan(plan)}
                    className="glass-btn mt-6 px-4 py-2.5 text-center font-semibold"
                  >
                    {plan.cta}
                  </button>
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
          Feature lists are modeled on TinyURL&apos;s publicly listed plans,
          priced in INR. Checkout runs through PhonePe.
        </p>
      </section>

      {checkoutPlan && (
        <BillingDetailsModal
          plan={checkoutPlan}
          billingCycle={billingCycle}
          onClose={() => setCheckoutPlan(null)}
        />
      )}
    </div>
  );
}
