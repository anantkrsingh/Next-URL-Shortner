"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";

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
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  // Close the account dropdown when clicking outside of it
  useEffect(() => {
    if (variant !== "desktop") return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [variant]);

  const closeMenu = () => setIsOpen(false);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    closeMenu();
    onNavigate?.();
    router.push("/");
    router.refresh();
  };

  if (!loaded) {
    return variant === "desktop" ? <div className="h-10 w-28" /> : null;
  }

  if (user) {
    const initial = user.name.trim().charAt(0).toUpperCase() || "U";

    if (variant === "mobile") {
      return (
        <div className="flex flex-col items-center gap-4">
          <span className="text-white text-3xl font-semibold">{user.name}</span>
          <Link prefetch={false}
            href="/account"
            onClick={onNavigate}
            className="text-white text-2xl font-semibold hover:text-blue-400 transition-colors"
          >
            Your Profile
          </Link>
          <button
            type="button"
            onClick={logout}
            className="text-white text-2xl font-semibold hover:text-red-300 transition-colors"
          >
            Log out
          </button>
        </div>
      );
    }

    return (
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="flex items-center gap-2 rounded-full py-1.5 pr-3 pl-1.5 text-white transition-colors hover:bg-white/10"
          aria-haspopup="menu"
          aria-expanded={isOpen}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-400/80 to-purple-500/80 text-sm font-bold text-white">
            {initial}
          </span>
          <span className="max-w-[8rem] truncate text-sm font-semibold text-white/90">
            {user.name}
          </span>
          <FiChevronDown
            className={`h-4 w-4 text-white/70 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        <div
          className={`absolute top-full right-0 pt-2 transition-all duration-300 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        >
          <div className="glass-panel relative z-10 w-56 overflow-hidden rounded-xl">
            {/* Arrow pointing upwards */}
            <div className="absolute -top-2 right-5 h-4 w-4 rotate-45 border-t border-l border-white/20 bg-black/90" />

            <div className="relative z-10 border-b border-white/10 px-4 py-3">
              <p className="truncate text-sm font-semibold text-white">{user.name}</p>
              <p className="truncate text-xs text-white/60">{user.email}</p>
            </div>

            <Link prefetch={false}
              href="/account"
              onClick={closeMenu}
              className="relative z-10 flex items-center gap-2 border-b border-white/10 px-4 py-3 text-sm text-white transition-colors hover:bg-white/10"
            >
              <FiUser className="h-4 w-4" />
              Your Profile
            </Link>

            <button
              type="button"
              onClick={logout}
              className="relative z-10 flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-red-300 transition-colors hover:bg-white/10"
            >
              <FiLogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </div>
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
