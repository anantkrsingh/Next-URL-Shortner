"use client";

import { createContext, useContext } from "react";
import Link from "next/link";
import { notFound, useSelectedLayoutSegment } from "next/navigation";
import {
  FiBarChart2,
  FiCode,
  FiCreditCard,
  FiFileText,
  FiGlobe,
  FiShield,
  FiUser,
} from "react-icons/fi";
import { useCurrentUser } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/useAuthStore";
import ProfileSection from "./ProfileSection";
import SecuritySection from "./SecuritySection";
import UsageSection from "./UsageSection";
import DomainsSection from "./DomainsSection";
import ApiKeySection from "./ApiKeySection";
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
  | "api"
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
      { id: "api", label: "API", icon: FiCode },
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

// Server-fetched user from the account layout, shared with the section pages.
const AccountUserContext = createContext<AccountUser | null>(null);

export default function AccountView({
  user: serverUser,
  children,
}: {
  user: AccountUser;
  children: React.ReactNode;
}) {
  // Seeds the shared TanStack Query cache + Zustand store with what the
  // server already knew, then keeps them live for the rest of the app.
  useCurrentUser();
  const liveUser = useAuthStore((s) => s.user);
  const displayName = liveUser?.name ?? serverUser.name;

  const section = useSelectedLayoutSegment();

  return (
    <AccountUserContext.Provider value={{ ...serverUser, name: displayName }}>
      {/* Name/email card lives in the navbar; keep a heading for screen readers. */}
      <h1 className="sr-only">Your account</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <nav className="lg:sticky lg:top-24 lg:self-start">
          <div className="glass-panel rounded-2xl p-2 lg:p-3">
            <div className="flex gap-2 overflow-x-auto lg:block lg:space-y-4 lg:overflow-visible">
              {NAV_GROUPS.map((group) => (
                <div key={group.label} className="shrink-0 lg:shrink">
                  <p className="hidden px-3 pb-1 text-xs font-semibold tracking-wide text-white/60 uppercase lg:block">
                    {group.label}
                  </p>
                  <div className="flex gap-1 lg:flex-col">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const active = section === item.id;
                      return (
                        <Link
                          key={item.id}
                          href={`/account/${item.id}`}
                          className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-semibold whitespace-nowrap transition-colors ${
                            active
                              ? "bg-white/15 text-white"
                              : "text-white/60 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          {item.label}
                        </Link>
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
          {children}
        </div>
      </div>
    </AccountUserContext.Provider>
  );
}

export function AccountSection({ section }: { section: string }) {
  const user = useContext(AccountUserContext)!;
  switch (section) {
    case "profile":
      return <ProfileSection user={user} />;
    case "security":
      return <SecuritySection user={user} />;
    case "usage":
      return <UsageSection />;
    case "api":
      return <ApiKeySection />;
    case "domains":
      return <DomainsSection />;
    case "subscription":
      return <SubscriptionSection />;
    case "invoices":
      return <InvoicesSection />;
    default:
      notFound();
  }
}
