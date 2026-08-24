"use client";

import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export function useSendContactMessage() {
  return useMutation({
    mutationFn: (vars: { name: string; email: string; subject: string; message: string }) =>
      apiFetch<{ ok: true }>("/api/contact", {
        method: "POST",
        body: JSON.stringify(vars),
      }),
  });
}
