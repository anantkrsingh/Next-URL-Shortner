"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import type { BillingCycle, PlanId } from "@/lib/plans";

export type Subscription = {
  plan: PlanId;
  billingCycle: BillingCycle | null;
  status: "active" | "canceled" | "expired";
  currentPeriodEnd: string | null;
};

export function useSubscription() {
  return useQuery({
    queryKey: queryKeys.account.subscription,
    queryFn: () => apiFetch<{ subscription: Subscription }>("/api/account/subscription"),
    select: (data) => data.subscription,
  });
}

export type Invoice = {
  id: string;
  plan: PlanId;
  billingCycle: BillingCycle;
  amount: number; // paise
  currency: string;
  status: "pending" | "completed" | "failed";
  createdAt: string;
};

export function useInvoices() {
  return useQuery({
    queryKey: queryKeys.account.invoices,
    queryFn: () => apiFetch<{ orders: Invoice[] }>("/api/account/invoices"),
    select: (data) => data.orders,
  });
}

export function useCheckout() {
  return useMutation({
    mutationFn: (vars: { planId: PlanId; billingCycle: BillingCycle }) =>
      apiFetch<{ redirectUrl: string }>("/api/payments/checkout", {
        method: "POST",
        body: JSON.stringify(vars),
      }),
  });
}
