// Plan data modeled on TinyURL's publicly listed pricing tiers
// (tinyurl.com/app/pricing, as referenced Aug 2026). Used to render the
// Subscription tab on the account page.

export type Plan = {
  id: "free" | "pro" | "bulk" | "enterprise";
  name: string;
  tagline: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
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
    monthlyPrice: 0,
    yearlyPrice: 0,
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
    monthlyPrice: 16,
    yearlyPrice: 9.99,
    priceNote: "billed annually — $16/mo billed monthly",
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
    monthlyPrice: 99,
    yearlyPrice: 83,
    priceNote: "billed annually — $99/mo billed monthly",
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
    monthlyPrice: null,
    yearlyPrice: null,
    custom: true,
    priceNote: "starting at $299/mo — custom pricing",
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
