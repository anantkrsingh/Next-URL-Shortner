"use client";

import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { useAuthStore, type AuthUser } from "@/store/useAuthStore";

async function fetchMe(): Promise<AuthUser | null> {
  const res = await fetch("/api/auth/me");
  if (!res.ok) return null;
  const data = await res.json();
  return data.user ?? null;
}

/**
 * The one place that queries /api/auth/me. TanStack Query dedupes/caches
 * this across every component that calls it; the result is also mirrored
 * into the Zustand auth store so components can read `user` synchronously
 * without subscribing to query loading state.
 */
export function useCurrentUser() {
  const setUser = useAuthStore((s) => s.setUser);
  const clear = useAuthStore((s) => s.clear);

  const query = useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: fetchMe,
    staleTime: 60_000,
  });

  useEffect(() => {
    if (!query.isSuccess) return;
    if (query.data) setUser(query.data);
    else clear();
  }, [query.isSuccess, query.data, setUser, clear]);

  return query;
}

export function useLogin() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: (vars: { email: string; password: string }) =>
      apiFetch<{ user: AuthUser }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(vars),
      }),
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.setQueryData(queryKeys.auth.me, data.user);
    },
  });
}

export function useSignup() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: (vars: { name: string; email: string; password: string }) =>
      apiFetch<{ user: AuthUser }>("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(vars),
      }),
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.setQueryData(queryKeys.auth.me, data.user);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const clear = useAuthStore((s) => s.clear);

  return useMutation({
    mutationFn: () => apiFetch<{ ok: true }>("/api/auth/logout", { method: "POST" }),
    onSuccess: () => {
      clear();
      queryClient.setQueryData(queryKeys.auth.me, null);
      queryClient.invalidateQueries({ queryKey: queryKeys.account.usage });
    },
  });
}
