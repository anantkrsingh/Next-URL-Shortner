"use client";

import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export type ClickCountResponse = {
  shortCode: string;
  clicks: number;
  originalUrl: string;
  createdAt: string;
};

export function useClickCount() {
  return useMutation({
    mutationFn: (shortCode: string) =>
      apiFetch<ClickCountResponse>(`/api/clicks/${shortCode}`),
  });
}
