import { Metadata } from "next";
import PricingPlans from "@/components/PricingPlans";

export const metadata: Metadata = {
  title: "Pricing | TinyUR",
  description:
    "TinyUR pricing: a free plan plus Pro and Bulk & API plans with branded domains, analytics, and higher limits — billed in INR through Razorpay.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen px-4 pt-28 pb-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Pricing</h1>
          <p className="mx-auto max-w-2xl text-white/65">
            Start free. Upgrade when you need branded domains, deeper
            analytics, or higher link and API limits.
          </p>
        </div>

        <PricingPlans />
      </div>
    </div>
  );
}
