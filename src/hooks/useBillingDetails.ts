"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";

export type BillingDetails = {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isBusiness: boolean;
  gstNumber: string | null;
};

export type BillingDetailsInput = Omit<BillingDetails, "addressLine2" | "gstNumber"> & {
  addressLine2?: string;
  gstNumber?: string;
};

export function useBillingDetails() {
  return useQuery({
    queryKey: queryKeys.account.billingDetails,
    queryFn: () =>
      apiFetch<{ billingDetails: BillingDetails | null }>("/api/account/billing-details"),
    select: (data) => data.billingDetails,
  });
}

export function useSaveBillingDetails() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: BillingDetailsInput) =>
      apiFetch<{ billingDetails: BillingDetails }>("/api/account/billing-details", {
        method: "PUT",
        body: JSON.stringify(vars),
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.account.billingDetails, { billingDetails: data.billingDetails });
    },
  });
}
