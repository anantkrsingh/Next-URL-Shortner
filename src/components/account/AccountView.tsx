"use client";

import { useState } from "react";
import {
  FiBarChart2,
  FiCreditCard,
  FiFileText,
  FiGlobe,
  FiShield,
  FiUser,
} from "react-icons/fi";
import ProfileSection from "./ProfileSection";
import SecuritySection from "./SecuritySection";
import UsageSection from "./UsageSection";
import DomainsSection from "./DomainsSection";
import SubscriptionSection from "./SubscriptionSection";
import InvoicesSection from "./InvoicesSection";

export type AccountUser = {
  id: string;
  name: string;
  email: string;
  authProvider: "password" | "google";
  memberSince: string;
};

type SectionId =
  | "profile"
  | "security"
  | "usage"
  | "domains"
  | "subscription"
  | "invoices";

const NAV_GROUPS: {
  label: string;
  items: { id: SectionId; label: string; icon: typeof FiUser }[];
}[] = [
  {
    label: "Account",
    items: [
      { id: "profile", label: "Profile", icon: FiUser },
      { id: "security", label: "Security", icon: FiShield },
      { id: "usage", label: "Account Usage", icon: FiBarChart2 },
      { id: "domains", label: "Branded Domains", icon: FiGlobe },
    ],
  },
  {
    label: "Billing",
    items: [
      { id: "subscription", label: "Subscription", icon: FiCreditCard },
      { id: "invoices", label: "Invoices", icon: FiFileText },
    ],
  },
];

export default function AccountView({ user: initialUser }: { user: AccountUser }) {
  const [user, setUser] = useState(initialUser);
  const [section, setSection] = useState<SectionId>("profile");

  const initial = user.name.trim().charAt(0).toUpperCase() || "U";

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-400/80 to-purple-500/80 text-xl font-bold text-white">
          {initial}
        </span>
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold text-white sm:text-3xl">
            {user.name}
          </h1>
          <p className="truncate text-sm text-white/60">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <nav className="lg:sticky lg:top-24 lg:self-start">
          <div className="glass-panel rounded-2xl p-2 lg:p-3">
            <div className="flex gap-2 overflow-x-auto lg:block lg:space-y-4 lg:overflow-visible">
              {NAV_GROUPS.map((group) => (
                <div key={group.label} className="shrink-0 lg:shrink">
                  <p className="hidden px-3 pb-1 text-xs font-semibold tracking-wide text-white/40 uppercase lg:block">
                    {group.label}
                  </p>
                  <div className="flex gap-1 lg:flex-col">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const active = section === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSection(item.id)}
                          className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-semibold whitespace-nowrap transition-colors ${
                            active
                              ? "bg-white/15 text-white"
                              : "text-white/60 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="min-w-0">
          {section === "profile" && (
            <ProfileSection user={user} onUpdated={(next) => setUser({ ...user, ...next })} />
          )}
          {section === "security" && <SecuritySection user={user} />}
          {section === "usage" && <UsageSection />}
          {section === "domains" && (
            <DomainsSection onUpgrade={() => setSection("subscription")} />
          )}
          {section === "subscription" && <SubscriptionSection />}
          {section === "invoices" && <InvoicesSection />}
        </div>
      </div>
    </div>
  );
}
