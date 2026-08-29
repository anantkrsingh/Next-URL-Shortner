"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin, useSignup } from "@/hooks/useAuth";

type AuthMode = "login" | "signup";

export default function AuthForm({
  mode,
  initialError = "",
}: {
  mode: AuthMode;
  initialError?: string;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(initialError);

  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const mutation = mode === "signup" ? signupMutation : loginMutation;
  const loading = mutation.isPending;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (mode === "signup") {
        await signupMutation.mutateAsync({ name, email, password });
      } else {
        await loginMutation.mutateAsync({ email, password });
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const fieldClass = "w-full glass-input px-4 py-2.5 disabled:opacity-60";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "signup" && (
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-semibold text-gray-800">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={120}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className={fieldClass}
          />
        </div>
      )}
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-semibold text-gray-800">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-semibold text-gray-800">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          className={fieldClass}
        />
      </div>
      {error && (
        <p className="rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-200">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="glass-btn w-full px-6 py-2.5 font-semibold disabled:opacity-60"
      >
        {loading ? "Please wait…" : mode === "login" ? "Log in" : "Sign up"}
      </button>

      <div className="flex items-center gap-3 py-1">
        <div className="h-px flex-1 bg-white/15" />
        <span className="text-xs text-white/50">or</span>
        <div className="h-px flex-1 bg-white/15" />
      </div>

      {/* Plain <a>, not next/link: this hits an OAuth-initiating Route
          Handler, not a page. Next's client router probes Link targets with
          a background fetch before falling back to a real navigation, and
          that probe sets its own oauth-state cookie — landing after the
          real navigation's (most likely on a cold first click) overwrites
          the correct cookie and breaks the state check on Google's
          callback. A full browser navigation avoids that race entirely. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a
        href="/api/auth/google"
        className="glass-input flex w-full items-center justify-center gap-3 px-6 py-2.5 font-semibold text-white hover:bg-white/10"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Continue with Google
      </a>
    </form>
  );
}
