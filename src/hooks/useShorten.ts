"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";

export type ShortUrlResponse = {
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
};

export function useShortenUrl() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { url: string; customAlias?: string }) =>
      apiFetch<ShortUrlResponse>("/api/shorten", {
        method: "POST",
        body: JSON.stringify(vars),
      }),
    onSuccess: () => {
      // A signed-in user's new link affects their usage stats.
      queryClient.invalidateQueries({ queryKey: queryKeys.account.usage });
    },
  });
}
