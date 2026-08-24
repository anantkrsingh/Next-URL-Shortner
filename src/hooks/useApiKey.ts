"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";

export type ApiKeyInfo = {
  maskedKey: string;
  createdAt: string;
  lastUsedAt: string | null;
};

export function useApiKey() {
  return useQuery({
    queryKey: queryKeys.account.apiKey,
    queryFn: () => apiFetch<{ apiKey: ApiKeyInfo | null }>("/api/account/api-key"),
    select: (data) => data.apiKey,
  });
}

export function useGenerateApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiFetch<{ key: string; apiKey: ApiKeyInfo }>("/api/account/api-key", {
        method: "POST",
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.account.apiKey, { apiKey: data.apiKey });
    },
  });
}

export function useRevokeApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiFetch<{ ok: true }>("/api/account/api-key", { method: "DELETE" }),
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.account.apiKey, { apiKey: null });
    },
  });
}
