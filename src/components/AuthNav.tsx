"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type AuthUser = { id: string; name: string; email: string };

export default function AuthNav({
  variant = "desktop",
  onNavigate,
}: {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/auth/me")
      .then(async (res) => {
        if (!res.ok) return { user: null };
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setUser(data.user ?? null);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    onNavigate?.();
    router.refresh();
  };

  if (!loaded) {
    return variant === "desktop" ? <div className="h-10 w-28" /> : null;
  }

  if (user) {
    if (variant === "mobile") {
      return (
        <>
          <span className="text-white text-3xl font-semibold">{user.name}</span>
          <button
            type="button"
            onClick={logout}
            className="text-white text-4xl font-semibold hover:text-blue-400"
          >
            Log out
          </button>
        </>
      );
    }

    return (
      <div className="flex items-center gap-3">
        <span className="max-w-[10rem] truncate text-sm text-white/80">{user.name}</span>
        <button
          type="button"
          onClick={logout}
          className="relative px-3 py-2 font-semibold text-white hover:text-blue-200"
        >
          Log out
        </button>
      </div>
    );
  }

  if (variant === "mobile") {
    return (
      <>
        <Link prefetch={false}
          href="/login"
          onClick={onNavigate}
          className="text-white text-4xl font-semibold hover:text-blue-400"
        >
          Login
        </Link>
        <Link prefetch={false} href="/signup" onClick={onNavigate} className="glass-btn px-6 py-3 text-2xl font-semibold">
          Sign up
        </Link>
      </>
    );
  }

  return (
    <>
      <Link prefetch={false}
        href="/login"
        className="relative overflow-hidden px-3 py-2 font-semibold text-white group"
      >
        <span className="relative z-10">Login</span>
        <span className="absolute inset-0 origin-left scale-x-0 rounded-none bg-white/20 transition-transform duration-300 group-hover:scale-x-100" />
      </Link>
      <Link prefetch={false} href="/signup" className="glass-btn px-4 py-2 font-semibold">
        Sign up
      </Link>
    </>
  );
}
