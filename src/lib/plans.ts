// Plan data modeled on TinyURL's publicly listed pricing tiers
// (tinyurl.com/app/pricing, as referenced Aug 2026), localized to INR since
// checkout runs through Razorpay (PhonePe as a fallback — see
// api/payments/checkout). Used to render the Subscription tab on the
// account page.

export type PlanId = "free" | "pro" | "bulk" | "enterprise";
export type BillingCycle = "monthly" | "yearly";

export type Plan = {
  id: PlanId;
  name: string;
  tagline: string;
  /**
   * Whole rupees. `monthly` is charged each time on monthly billing.
   * `yearlyMonthly` is the effective per-month rate shown when yearly
   * billing is selected — the actual one-time PhonePe charge for the year
   * is `yearlyMonthly * 12` (see yearlyTotal()), not `yearlyMonthly` itself.
   */
  inr: { monthly: number; yearlyMonthly: number } | null;
  /** Can this plan be bought online, or is it "current"/"contact sales"? */
  payable: boolean;
  custom?: boolean;
  priceNote: string;
  cta: string;
  highlighted?: boolean;
  features: string[];
};

/** The actual one-time amount charged for a full year, in whole rupees. */
export function yearlyTotal(plan: Plan): number | null {
  return plan.inr ? plan.inr.yearlyMonthly * 12 : null;
}

/** The rupee amount charged right now for one checkout on this cycle. */
export function chargeAmount(plan: Plan, billingCycle: BillingCycle): number | null {
  if (!plan.inr) return null;
  return billingCycle === "monthly" ? plan.inr.monthly : yearlyTotal(plan);
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "For personal use and trying things out",
    inr: null,
    payable: false,
    priceNote: "free forever",
    cta: "Current plan",
    features: [
      "Unlimited short links & clicks",
      "Custom aliases",
      "QR code generation",
      "1 month of link history",
      "Standard shared domain",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For creators and growing teams",
    inr: { monthly: 199, yearlyMonthly: 119 },
    payable: true,
    priceNote: "per month",
    cta: "Upgrade to Pro",
    highlighted: true,
    features: [
      "Everything in Free",
      "Up to 500 active links",
      "10,000 API calls / month",
      "1 branded custom domain",
      "Edit link destinations after creation",
      "Full click analytics — device, geo, referrer",
      "Link tagging & folders",
      "Priority email support",
    ],
  },
  {
    id: "bulk",
    name: "Bulk & API",
    tagline: "For high-volume campaigns",
    inr: { monthly: 799, yearlyMonthly: 479 },
    payable: true,
    priceNote: "per month",
    cta: "Upgrade to Bulk",
    features: [
      "Everything in Pro",
      "Up to 300,000 links",
      "100,000 API calls / month",
      "Bulk CSV upload",
      "Configurable link expiration",
      "Multiple branded domains",
      "Shared team dashboard access",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For large organizations",
    inr: null,
    payable: false,
    custom: true,
    priceNote: "custom pricing — talk to sales",
    cta: "Contact sales",
    features: [
      "Everything in Bulk & API",
      "Custom link & API volume",
      "Role-based access control & SSO",
      "Dedicated onboarding & account manager",
      "Custom SLAs",
      "Advanced security & governance controls",
    ],
  },
];

export function getPlan(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id);
}
