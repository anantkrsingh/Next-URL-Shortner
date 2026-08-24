// Plan data modeled on TinyURL's publicly listed pricing tiers
// (tinyurl.com/app/pricing, as referenced Aug 2026), localized to INR since
// checkout runs through PhonePe. Used to render the Subscription tab on the
// account page.

export type PlanId = "free" | "pro" | "bulk" | "enterprise";
export type BillingCycle = "monthly" | "yearly";

export type Plan = {
  id: PlanId;
  name: string;
  tagline: string;
  /** Whole rupees — the amount actually charged through PhonePe checkout. */
  inr: { monthly: number; yearly: number } | null;
  /** Can this plan be bought online, or is it "current"/"contact sales"? */
  payable: boolean;
  custom?: boolean;
  priceNote: string;
  cta: string;
  highlighted?: boolean;
  features: string[];
};

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
    inr: { monthly: 1999, yearly: 1499 },
    payable: true,
    priceNote: "billed annually, ₹1,999/mo billed monthly",
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
    inr: { monthly: 9999, yearly: 7999 },
    payable: true,
    priceNote: "billed annually, ₹9,999/mo billed monthly",
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
