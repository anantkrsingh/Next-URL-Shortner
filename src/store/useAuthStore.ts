import { create } from "zustand";

export type AuthUser = { id: string; name: string; email: string };

type AuthState = {
  user: AuthUser | null;
  /** Has the initial /api/auth/me lookup resolved at least once? */
  hydrated: boolean;
  setUser: (user: AuthUser | null) => void;
  clear: () => void;
};

/**
 * Global client-side snapshot of "who's logged in". This is the single
 * source of truth every component reads from (Navbar, account pages, the
 * shortener) instead of each fetching /api/auth/me independently.
 *
 * TanStack Query owns the actual network fetch/cache for auth data
 * (see useCurrentUser in src/hooks/useAuth.ts) and writes its result in
 * here; auth mutations (login/signup/logout) also write directly so every
 * subscriber updates in the same tick without waiting on a refetch.
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  hydrated: false,
  setUser: (user) => set({ user, hydrated: true }),
  clear: () => set({ user: null, hydrated: true }),
}));
