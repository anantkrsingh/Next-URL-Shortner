"use client";

import { useCallback, useEffect, useState } from "react";
import type { ShortUrlResponse } from "./useShorten";

const STORAGE_KEY = "tinyur_recent_links";
const MAX_ITEMS = 5;

export type RecentLinkEntry = ShortUrlResponse & { createdAt: string };

/**
 * Client-only "recent links" list for signed-out visitors, kept in
 * localStorage since there's no account to attribute anonymous links to.
 * Signed-in users get their real recent links from the database instead
 * (see useUsage) — this hook is only consulted when there's no user.
 */
export function useRecentLinks() {
  const [links, setLinks] = useState<RecentLinkEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Deferred a tick so the state update isn't synchronous inside the
    // effect body — this only reads a browser-only API (must happen after
    // mount, never during SSR, hence the effect at all), so the one-tick
    // delay before "loaded" flips is imperceptible.
    Promise.resolve().then(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) setLinks(JSON.parse(raw));
      } catch {
        // Storage unavailable (private mode, disabled, quota) — start empty.
      }
      setLoaded(true);
    });
  }, []);

  const addLink = useCallback((result: ShortUrlResponse) => {
    setLinks((prev) => {
      const next = [
        { ...result, createdAt: new Date().toISOString() },
        ...prev.filter((link) => link.shortCode !== result.shortCode),
      ].slice(0, MAX_ITEMS);

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Keep the in-memory list even if persisting failed.
      }

      return next;
    });
  }, []);

  return { links, loaded, addLink };
}
