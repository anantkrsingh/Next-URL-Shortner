"use client";

import { FormEvent, useState } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import { apiFetch } from "@/lib/api";
import { chargeAmount, type Plan } from "@/lib/plans";
import { useAuthStore } from "@/store/useAuthStore";
import {
  useBillingDetails,
  useSaveBillingDetails,
  type BillingDetails,
  type BillingDetailsInput,
} from "@/hooks/useBillingDetails";
import { useCheckout } from "@/hooks/useSubscription";

const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

// Loads Razorpay's Checkout.js once and reuses it on later opens.
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const EMPTY_FORM: BillingDetailsInput = {
  fullName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
  isBusiness: false,
  gstNumber: "",
};

function formFromDetails(details: BillingDetails): BillingDetailsInput {
  return {
    fullName: details.fullName,
    email: details.email,
    phone: details.phone,
    addressLine1: details.addressLine1,
    addressLine2: details.addressLine2 ?? "",
    city: details.city,
    state: details.state,
    postalCode: details.postalCode,
    country: details.country,
    isBusiness: details.isBusiness,
    gstNumber: details.gstNumber ?? "",
  };
}

export default function BillingDetailsModal({
  plan,
  billingCycle,
  onClose,
}: {
  plan: Plan;
  billingCycle: "monthly" | "yearly";
  onClose: () => void;
}) {
  const authUser = useAuthStore((s) => s.user);
  const { data: billingDetails, isLoading } = useBillingDetails();
  const saveBillingDetails = useSaveBillingDetails();
  const checkout = useCheckout();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<BillingDetailsInput>(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [checkoutError, setCheckoutError] = useState("");

  // Once billing details finish their first load, decide whether to show
  // the form or the summary, and seed the form either from saved details
  // or the account. Adjusted during render (React's documented pattern for
  // resetting state on a prop/query transition) rather than in an effect,
  // so it happens exactly once for the loading -> loaded transition.
  const [wasLoading, setWasLoading] = useState(true);
  if (wasLoading && !isLoading) {
    setWasLoading(false);
    if (billingDetails) {
      setForm(formFromDetails(billingDetails));
      setIsEditing(false);
    } else {
      setForm({ ...EMPTY_FORM, fullName: authUser?.name ?? "", email: authUser?.email ?? "" });
      setIsEditing(true);
    }
  }

  // The actual PhonePe charge: 12 months upfront on yearly billing, not
  // the per-month figure shown on the plan card.
  const price = chargeAmount(plan, billingCycle);

  const updateField = <K extends keyof BillingDetailsInput>(key: K, value: BillingDetailsInput[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.addressLine1.trim() ||
      !form.city.trim() ||
      !form.state.trim() ||
      !form.postalCode.trim()
    ) {
      setFormError("Please fill in every required field.");
      return;
    }

    if (form.isBusiness && !GST_REGEX.test((form.gstNumber || "").toUpperCase())) {
      setFormError("Please enter a valid 15-character GST number.");
      return;
    }

    try {
      await saveBillingDetails.mutateAsync(form);
      setIsEditing(false);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Could not save billing details.");
    }
  };

  const handlePayNow = async () => {
    setCheckoutError("");
    try {
      const result = await checkout.mutateAsync({ planId: plan.id, billingCycle });

      if (result.gateway === "phonepe") {
        window.location.assign(result.redirectUrl);
        return;
      }

      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) {
        setCheckoutError("Could not load the payment window. Please try again.");
        return;
      }

      const razorpay = new window.Razorpay({
        key: result.keyId,
        order_id: result.orderId,
        amount: result.amount,
        currency: result.currency,
        name: "TinyUR",
        description: `${result.planName} · billed ${billingCycle}`,
        prefill: result.prefill,
        theme: { color: "#3b82f6" },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            await apiFetch("/api/payments/razorpay/verify", {
              method: "POST",
              body: JSON.stringify({
                merchantOrderId: result.merchantOrderId,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });
            window.location.assign("/account?tab=subscription&payment=success");
          } catch (err) {
            setCheckoutError(err instanceof Error ? err.message : "Payment verification failed.");
          }
        },
        modal: {
          ondismiss: () => setCheckoutError("Payment cancelled."),
        },
      });

      razorpay.open();
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Could not start checkout.");
    }
  };

  const fieldClass = "w-full glass-input px-3.5 py-2.5 text-sm disabled:opacity-60";
  const labelClass = "mb-1 block text-xs font-semibold text-white/70";

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
      <div className="glass-panel relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <FiX className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-bold text-white">
          {isEditing ? "Billing details" : "Confirm your purchase"}
        </h2>
        <p className="mt-1 text-sm text-white/60">
          {plan.name} · billed {billingCycle}
        </p>

        {isLoading ? (
          <p className="mt-8 text-sm text-white/50">Loading…</p>
        ) : isEditing ? (
          <form onSubmit={handleSave} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Full name</label>
                <input
                  required
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  disabled={saveBillingDetails.isPending}
                  className={fieldClass}
                />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  disabled={saveBillingDetails.isPending}
                  className={fieldClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Phone</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                disabled={saveBillingDetails.isPending}
                className={fieldClass}
              />
            </div>

            <div>
              <label className={labelClass}>Address line 1</label>
              <input
                required
                value={form.addressLine1}
                onChange={(e) => updateField("addressLine1", e.target.value)}
                disabled={saveBillingDetails.isPending}
                className={fieldClass}
              />
            </div>
            <div>
              <label className={labelClass}>Address line 2 (optional)</label>
              <input
                value={form.addressLine2}
                onChange={(e) => updateField("addressLine2", e.target.value)}
                disabled={saveBillingDetails.isPending}
                className={fieldClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="col-span-1 sm:col-span-2">
                <label className={labelClass}>City</label>
                <input
                  required
                  value={form.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  disabled={saveBillingDetails.isPending}
                  className={fieldClass}
                />
              </div>
              <div>
                <label className={labelClass}>State</label>
                <input
                  required
                  value={form.state}
                  onChange={(e) => updateField("state", e.target.value)}
                  disabled={saveBillingDetails.isPending}
                  className={fieldClass}
                />
              </div>
              <div>
                <label className={labelClass}>PIN code</label>
                <input
                  required
                  value={form.postalCode}
                  onChange={(e) => updateField("postalCode", e.target.value)}
                  disabled={saveBillingDetails.isPending}
                  className={fieldClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Country</label>
              <input
                required
                value={form.country}
                onChange={(e) => updateField("country", e.target.value)}
                disabled={saveBillingDetails.isPending}
                className={fieldClass}
              />
            </div>

            <label className="flex items-center gap-2 pt-1 text-sm text-white/80">
              <input
                type="checkbox"
                checked={form.isBusiness}
                onChange={(e) => updateField("isBusiness", e.target.checked)}
                disabled={saveBillingDetails.isPending}
                className="h-4 w-4 rounded border-white/30 bg-white/10 accent-blue-500"
              />
              Purchasing as a business
            </label>

            {form.isBusiness && (
              <div>
                <label className={labelClass}>GST number</label>
                <input
                  required
                  maxLength={15}
                  value={form.gstNumber}
                  onChange={(e) => updateField("gstNumber", e.target.value.toUpperCase())}
                  disabled={saveBillingDetails.isPending}
                  placeholder="22AAAAA0000A1Z5"
                  className={`${fieldClass} uppercase`}
                />
              </div>
            )}

            {formError && (
              <p className="rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-200">{formError}</p>
            )}

            <div className="flex items-center gap-3 pt-2">
              {billingDetails && (
                <button
                  type="button"
                  onClick={() => {
                    setForm(formFromDetails(billingDetails));
                    setFormError("");
                    setIsEditing(false);
                  }}
                  disabled={saveBillingDetails.isPending}
                  className="glass-input px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={saveBillingDetails.isPending}
                className="glass-btn px-5 py-2.5 text-sm font-semibold disabled:opacity-60"
              >
                {saveBillingDetails.isPending ? "Saving…" : "Save & continue"}
              </button>
            </div>
          </form>
        ) : billingDetails ? (
          <div className="mt-6 space-y-6">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 text-sm text-white/80">
                  <p className="font-semibold text-white">{billingDetails.fullName}</p>
                  <p className="text-white/60">{billingDetails.email}</p>
                  <p className="text-white/60">{billingDetails.phone}</p>
                  <p className="mt-2 text-white/60">
                    {billingDetails.addressLine1}
                    {billingDetails.addressLine2 ? `, ${billingDetails.addressLine2}` : ""}
                    <br />
                    {billingDetails.city}, {billingDetails.state} {billingDetails.postalCode}
                    <br />
                    {billingDetails.country}
                  </p>
                  {billingDetails.isBusiness && (
                    <p className="mt-2 text-white/60">
                      GSTIN: <span className="font-mono">{billingDetails.gstNumber}</span>
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="shrink-0 text-sm font-semibold text-blue-300 hover:text-blue-200"
                >
                  Edit
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold tracking-wide text-white/40 uppercase">
                Order summary
              </p>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-white/70">
                  {plan.name} ({billingCycle === "yearly" ? "12 months, billed now" : "1 month"})
                </span>
                <span className="font-semibold text-white">₹{price?.toLocaleString("en-IN")}</span>
              </div>
              {billingCycle === "yearly" && plan.inr && (
                <p className="mt-1 text-xs text-white/40">
                  ₹{plan.inr.yearlyMonthly.toLocaleString("en-IN")}/mo equivalent
                </p>
              )}
              <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2 text-sm font-bold">
                <span className="text-white">Total</span>
                <span className="text-white">₹{price?.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {checkoutError && (
              <p className="rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-200">
                {checkoutError}
              </p>
            )}

            <button
              type="button"
              onClick={handlePayNow}
              disabled={checkout.isPending}
              className="glass-btn w-full px-5 py-3 font-semibold disabled:opacity-60"
            >
              {checkout.isPending ? "Starting checkout…" : "Pay now"}
            </button>
          </div>
        ) : null}
      </div>
    </div>,
    document.body
  );
}
