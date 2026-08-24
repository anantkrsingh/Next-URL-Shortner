"use client";

import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export type UnshortenResponse = {
  shortCode: string;
  originalUrl: string;
  createdAt: string;
};

// A GET lookup triggered by user action (not cached by key) — modeled as a
// mutation, same as the other on-demand "look this up" tools below.
export function useUnshortenUrl() {
  return useMutation({
    mutationFn: (shortCode: string) =>
      apiFetch<UnshortenResponse>(`/api/unshorten/${shortCode}`),
  });
}
