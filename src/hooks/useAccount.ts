"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { useAuthStore, type AuthUser } from "@/store/useAuthStore";

export type RecentLink = {
  id: string;
  shortCode: string;
  originalUrl: string;
  clicks: number;
  createdAt: string;
};

export type Usage = {
  totalLinks: number;
  linksThisMonth: number;
  totalClicks: number;
  recentLinks: RecentLink[];
};

export function useUsage(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.account.usage,
    queryFn: () => apiFetch<Usage>("/api/account/usage"),
    enabled: options?.enabled,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: (vars: { name: string }) =>
      apiFetch<{ user: AuthUser }>("/api/account/profile", {
        method: "PATCH",
        body: JSON.stringify(vars),
      }),
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.setQueryData(queryKeys.auth.me, data.user);
    },
  });
}

export function useUpdatePassword() {
  return useMutation({
    mutationFn: (vars: { currentPassword: string; newPassword: string }) =>
      apiFetch<{ ok: true }>("/api/account/password", {
        method: "PATCH",
        body: JSON.stringify(vars),
      }),
  });
}
